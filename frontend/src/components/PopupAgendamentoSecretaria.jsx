import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function PopupAgendamentoSecretaria({ isOpen, onClose, onConfirm, horarioFixo, consultaExistente, onCancelAppointment }) {
    const [nomePaciente, setNomePaciente] = useState('');
    const [observacoes, setObservacoes] = useState('');

    useEffect(() => {
        if (isOpen) {
            if (consultaExistente && consultaExistente.status === 'AGENDADA') {
                setNomePaciente(consultaExistente.paciente || '');
                setObservacoes(consultaExistente.observacao || '');
            } else {
                setNomePaciente('');
                setObservacoes('');
            }
        }
    }, [isOpen, consultaExistente]);

    const handleConfirmar = () => {
        if (!nomePaciente.trim()) {
            alert("O nome do paciente é obrigatório.");
            return;
        }
        onConfirm({
            nomePaciente: nomePaciente,
            obsConsulta: observacoes,
            horario: horarioFixo
        });
    };

    if (!isOpen) return null;

    const isEditing = consultaExistente && consultaExistente.status === 'AGENDADA';

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-xl font-bold mb-4 text-gray-800">
                    {isEditing ? `Editar Agendamento (${horarioFixo})` : `Agendar Horário (${horarioFixo})`}
                </h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nome do Paciente *</label>
                        <input
                            type="text"
                            value={nomePaciente}
                            onChange={(e) => setNomePaciente(e.target.value)}
                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="Nome completo do paciente"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Observações (Opcional)</label>
                        <textarea
                            value={observacoes}
                            onChange={(e) => setObservacoes(e.target.value)}
                            rows="3"
                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="Informações adicionais da consulta..."
                        />
                    </div>
                </div>
                
                <div className="flex justify-between items-center mt-6">
                    {/* Botão de Cancelar Agendamento (só aparece na edição) */}
                    <div>
                        {isEditing && (
                            <button 
                                onClick={onCancelAppointment} 
                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                                title="Libera o horário, mantendo-o na agenda"
                            >
                                Cancelar Agendamento
                            </button>
                        )}
                    </div>
                    <div className="flex gap-3">
                        <button onClick={onClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">
                            Fechar
                        </button>
                        <button onClick={handleConfirmar} className="bg-[#008E9A] text-white px-4 py-2 rounded-md hover:bg-[#007a85]">
                            {isEditing ? 'Salvar Alterações' : 'Confirmar Agendamento'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

PopupAgendamentoSecretaria.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancelAppointment: PropTypes.func, 
    horarioFixo: PropTypes.string,
    consultaExistente: PropTypes.object
};