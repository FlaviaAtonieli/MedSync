import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const MedicalContext = createContext();

export const useMedical = () => {
    return useContext(MedicalContext);
};

const API_URL = 'http://localhost:3000';

export const MedicalProvider = ({ children }) => {
    const [medicos, setMedicos] = useState([]);
    const [loading, setLoading] = useState(true);

    const getToken = () => localStorage.getItem('token');

    const carregarDadosCompletos = useCallback(async () => {
        setLoading(true);
        try {
            const token = getToken();
            if (!token) {
                setLoading(false);
                return;
            }

            const medicosResponse = await fetch(`${API_URL}/medicos`, { headers: { 'Authorization': `Bearer ${token}` } });
            if (!medicosResponse.ok) throw new Error("Falha ao buscar médicos.");
            const medicosData = await medicosResponse.json();

            const medicosComTudo = await Promise.all(
                medicosData.map(async (medico) => {
                    const diasResponse = await fetch(`${API_URL}/dias/${medico.id_medico}`, { headers: { 'Authorization': `Bearer ${token}` } });
                    if (!diasResponse.ok) throw new Error(`Falha ao buscar dias para o médico ${medico.id_medico}`);
                    const diasData = await diasResponse.json();

                    const diasAtendimentoFormatado = await Promise.all(
                        diasData.map(async (dia) => {
                            const consultasResponse = await fetch(`${API_URL}/consultas/medico/${medico.id_medico}/dia/${dia.id_dia}`, { headers: { 'Authorization': `Bearer ${token}` } });
                            if (!consultasResponse.ok) throw new Error(`Falha ao buscar consultas para o dia ${dia.id_dia}`);
                            const consultasData = await consultasResponse.json();
                            
                            const horarios = consultasData.map(c => ({ 
                                id: c.id_consulta, 
                                hora: c.hora_consulta, 
                                paciente: c.paciente, 
                                status: c.status, 
                                observacao: c.observacao 
                            }));

                            return {
                                id_dia: dia.id_dia,
                                dia: dia.dia_semana,
                                data: dia.data_atendimento,
                                horarios: horarios
                            };
                        })
                    );

                    return { ...medico, id: medico.id_medico, diasAtendimento: diasAtendimentoFormatado };
                })
            );
            
            setMedicos(medicosComTudo);
        } catch (error) { 
            console.error("Erro ao carregar dados:", error);
        } finally { 
            setLoading(false); 
        }
    }, []);

    useEffect(() => {
        carregarDadosCompletos();
    }, [carregarDadosCompletos]);

    const apiRequest = async (endpoint, method, body = null) => {
        try {
            const config = {
                method,
                headers: { 'Authorization': `Bearer ${getToken()}` }
            };
            if (body) {
                config.headers['Content-Type'] = 'application/json';
                config.body = JSON.stringify(body);
            }
            const response = await fetch(`${API_URL}${endpoint}`, config);
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message || `Erro em ${method} ${endpoint}`);
            }
            await carregarDadosCompletos(); 
            return true;
        } catch (error) {
            console.error(`Erro na requisição API (${method} ${endpoint}):`, error);
            throw error;
        }
    };

    const value = {
        medicos,
        loading,
        carregarDadosCompletos,
        addMedico: (data) => apiRequest('/medicos', 'POST', data),
        updateMedico: (id, data) => apiRequest(`/medicos/${id}`, 'PUT', data),
        deleteMedico: (id) => apiRequest(`/medicos/${id}`, 'DELETE'),
        addDiaAtendimento: (data) => apiRequest('/dias', 'POST', data),
        deleteDia: (id) => apiRequest(`/dias/${id}`, 'DELETE'),
        agendarConsulta: (data) => apiRequest('/consultas', 'POST', data),
        deleteConsulta: (id) => apiRequest(`/consultas/${id}`, 'DELETE'),
        updateConsulta: (id, data) => apiRequest(`/consultas/${id}`, 'PUT', data),
    };

    return <MedicalContext.Provider value={value}>{children}</MedicalContext.Provider>;
};

MedicalProvider.propTypes = { children: PropTypes.node.isRequired };