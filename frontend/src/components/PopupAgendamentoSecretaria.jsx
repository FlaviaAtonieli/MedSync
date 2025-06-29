import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

export default function PopupAgendamentoSecretaria({ isOpen, onClose, onConfirm, onCancelBooking, consulta }) {
    const [nomePaciente, setNomePaciente] = useState('');
    const [observacoes, setObservacoes] = useState('');

    // Preenche o formulário com os dados existentes quando o popup abre
    useEffect(() => {
        if (consulta) {
            setNomePaciente(consulta.paciente || '');
            setObservacoes(consulta.observacao || '');
        }
    }, [consulta, isOpen]);

    const handleConfirmar = () => {
        if (!nomePaciente.trim()) {
            alert("O nome do paciente é obrigatório.");
            return;
        }
        onConfirm({
            nomePaciente: nomePaciente,
            obsConsulta: observacoes
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                // A MÁGICA ESTÁ NESTE DIV:
                // fixed inset-0: Faz ele cobrir a tela inteira.
                // bg-black bg-opacity-50: Cria o fundo preto semi-transparente.
                // backdrop-blur-sm: Aplica o efeito de desfoque no conteúdo atrás dele.
                // z-50: Garante que ele fique na frente de todo o resto.
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: -20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md"
                    >
                        <h2 className="text-xl font-bold mb-4 text-gray-800">
                            {consulta?.paciente ? 'Editar Agendamento' : 'Agendar Horário'} ({consulta?.hora.substring(0, 5)})
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nome do Paciente *</label>
                                <input
                                    type="text"
                                    value={nomePaciente}
                                    onChange={(e) => setNomePaciente(e.target.value)}
                                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                                    placeholder="Nome completo do paciente"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Observações (Opcional)</label>
                                <textarea
                                    value={observacoes}
                                    onChange={(e) => setObservacoes(e.target.value)}
                                    rows="3"
                                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                                    placeholder="Informações da consulta..."
                                />
                            </div>
                        </div>
                        <div className="flex justify-between items-center mt-6">
                            <div>
                                {consulta?.paciente && (
                                    <button onClick={() => onCancelBooking(consulta.id)} className="text-sm text-red-600 hover:underline">
                                        Cancelar Agendamento
                                    </button>
                                )}
                            </div>
                            <div className="flex gap-3">
                                <button onClick={onClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">
                                    Voltar
                                </button>
                                <button onClick={handleConfirmar} className="bg-[#008E9A] text-white px-4 py-2 rounded-md hover:bg-[#007a85]">
                                    Salvar Alterações
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

PopupAgendamentoSecretaria.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancelBooking: PropTypes.func,
    consulta: PropTypes.object,
};