import { useState } from 'react';
import PropTypes from 'prop-types';

const diasDaSemana = ["DOMINGO", "SEGUNDA-FEIRA", "TERÇA-FEIRA", "QUARTA-FEIRA", "QUINTA-FEIRA", "SEXTA-FEIRA", "SÁBADO"];

export default function NewDayPopup({ isOpen, onClose, onConfirm }) {
    const [data, setData] = useState('');
    const [diaSemana, setDiaSemana] = useState('');
    const handleDateChange = (e) => {
        const dataSelecionada = e.target.value;
        setData(dataSelecionada);

        if (dataSelecionada) {
            const dateObj = new Date(dataSelecionada + 'T00:00:00');
            setDiaSemana(diasDaSemana[dateObj.getDay()]);
        } else {
            setDiaSemana('');
        }
    };
    const handleSubmit = () => {
        if (!data || !diaSemana) {
            alert("Por favor, selecione uma data.");
            return;
        }
        onConfirm({
            data: data,
            dia: diaSemana
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 shadow-2xl w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Adicionar Novo Dia de Atendimento</h2>
                
                <div className="space-y-4">
                    <div>
                        <label htmlFor="data" className="block text-sm font-medium text-gray-700 mb-1">
                            Data
                        </label>
                        <input
                            type="date"
                            id="data"
                            value={data}
                            onChange={handleDateChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="dia_semana" className="block text-sm font-medium text-gray-700 mb-1">
                            Dia da Semana
                        </label>
                        <input
                            type="text"
                            id="dia_semana"
                            value={diaSemana}
                            readOnly
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-4 mt-8">
                    <button onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
                        Cancelar
                    </button>
                    <button onClick={handleSubmit} className="px-6 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700">
                        Adicionar
                    </button>
                </div>
            </div>
        </div>
    );
}
NewDayPopup.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired
};