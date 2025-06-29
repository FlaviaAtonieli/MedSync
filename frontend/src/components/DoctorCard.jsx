import PropTypes from 'prop-types';

const DoctorCard = ({ doctor, onSchedule }) => {
    const isClickDisabled = onSchedule.toString() === '() => {}';

    return (
        <div className={`w-64 bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform ${!isClickDisabled ? 'hover:scale-105' : ''}`}>
            <div className="bg-teal-600 p-6 flex items-center justify-center h-40">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-16 w-16 text-white/80"
                >
                    <path d="M11 2v2" />
                    <path d="M5 2v2" />
                    <path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1" />
                    <path d="M8 15a6 6 0 0 0 12 0v-3" />
                    <circle cx="20" cy="10" r="2" />
                </svg>
            </div>
            <div className="p-5 text-center">
                <h3 className="text-xl font-bold text-gray-800 truncate" title={doctor.name}>{doctor.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{doctor.specialty}</p>
                <p className="text-xs text-gray-400 mt-1">CRM: {doctor.crm}</p>
            </div>
            <div className="px-5 pb-5">
                {!isClickDisabled && (
                    <button
                        onClick={() => onSchedule(doctor)}
                        className="w-full bg-[#008E9A] hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                        Ver Horários
                    </button>
                )}
            </div>
        </div>
    );
};

DoctorCard.propTypes = {
    doctor: PropTypes.shape({
        id: PropTypes.any.isRequired,
        name: PropTypes.string.isRequired,
        crm: PropTypes.string.isRequired,
        specialty: PropTypes.string.isRequired,
    }).isRequired,
    onSchedule: PropTypes.func.isRequired,
};

export default DoctorCard;