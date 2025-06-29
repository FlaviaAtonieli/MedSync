import PropTypes from 'prop-types';

const ScheduleCalendar = ({ doctor, onSchedule, onBack }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const futureDaysAtendimento = (doctor.diasAtendimento || [])
        .filter(day => new Date(day.data) >= today)
        .sort((a, b) => new Date(a.data) - new Date(b.data));

    const allUniqueTimes = Array.from(
        new Set(futureDaysAtendimento.flatMap(day => day.horarios.map(slot => slot.hora.substring(0, 5))))
    ).sort();

    if (futureDaysAtendimento.length === 0) {
        return (
            <div className="w-full max-w-6xl p-6 bg-[#086068] rounded-xl shadow-2xl text-white text-center">
                <button onClick={onBack} className="mb-6 flex items-center text-[#e0f7f9] hover:text-white transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
                    Voltar
                </button>
                <h4 className="text-2xl font-bold text-gray-100 mb-6">Horários para {doctor.name}</h4>
                <p className="text-lg">Nenhum horário cadastrado para os próximos dias.</p>
            </div>
        );
    }

    const formatDisplayDate = (dateString) => new Date(dateString).toLocaleDateString('pt-BR', { timeZone: 'UTC' });

    return (
        <div className="w-full max-w-6xl p-6 bg-[#086068] rounded-xl shadow-2xl">
            <button onClick={onBack} className="mb-6 flex items-center text-[#e0f7f9] hover:text-white transition">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
                Voltar
            </button>
            <h4 className="text-2xl font-bold text-gray-100 mb-6">Horários disponíveis para {doctor.name}</h4>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-[#03484E] border border-gray-700 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-[#007b87]">
                            {futureDaysAtendimento.map((day) => (
                                <th key={day.id_dia} className="py-4 px-6 text-center text-white font-semibold">
                                    {day.dia.split('-')[0]}<br />{formatDisplayDate(day.data)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {allUniqueTimes.map((time) => (
                            <tr key={time}>
                                {futureDaysAtendimento.map((day) => {
                                    const currentSlot = day.horarios.find(slot => slot.hora.substring(0, 5) === time);
                                    let cellContent;

                                    if (!currentSlot) {
                                        cellContent = <span className="text-gray-600 text-xs">--</span>;
                                    } else {
                                        const status = (currentSlot.status || '').toUpperCase();
                                        const slotDateTime = new Date(`${day.data.split('T')[0]}T${time}`);
                                        const isPast = slotDateTime < new Date();

                                        if (status === 'AGENDADA') {
                                            cellContent = <span className="bg-red-600 text-white py-1 px-3 rounded-lg text-xs font-semibold">Ocupado</span>;
                                        } else if (status === 'DISPONÍVEL' || status === '') {
                                            if (isPast && new Date(day.data).toDateString() === today.toDateString()) {
                                                cellContent = <span className="text-gray-500 text-sm">Expirado</span>;
                                            } else {
                                                cellContent = (
                                                    <button
                                                        onClick={() => onSchedule(doctor.name, formatDisplayDate(day.data), time)}
                                                        className="bg-[#e0f7f9] hover:bg-[#008E9A] hover:text-white text-[#008E9A] font-semibold py-2 px-4 rounded-lg transition duration-200 text-sm w-full"
                                                    >
                                                        {time}
                                                    </button>
                                                );
                                            }
                                        } else {
                                            cellContent = <span className="text-gray-600 text-xs">--</span>;
                                        }
                                    }
                                    
                                    return <td key={`${day.id_dia}-${time}`} className="py-3 px-5 border-b border-gray-700 text-center">{cellContent}</td>;
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

ScheduleCalendar.propTypes = {
    doctor: PropTypes.object.isRequired,
    onSchedule: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
};

export default ScheduleCalendar;