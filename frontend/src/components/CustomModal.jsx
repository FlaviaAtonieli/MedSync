import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomModal({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title, 
    message, 
    confirmText = "Confirmar", 
    cancelText = "Cancelar", 
    isWarning = false 
}) {
    return (
        <AnimatePresence>
            {isOpen && (
                // A classe "backdrop-blur-sm" é a responsável pelo efeito de desfoque
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: -20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full"
                    >
                        <h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>
                        <p className="mb-6 text-gray-600 whitespace-pre-wrap">{message}</p>
                        <div className="flex justify-end gap-4">
                            {cancelText && (
                                <button 
                                    onClick={onClose} 
                                    className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 text-gray-800 font-semibold transition-colors"
                                >
                                    {cancelText}
                                </button>
                            )}
                            <button 
                                onClick={onConfirm} 
                                className={`px-5 py-2 rounded-lg text-white font-semibold transition-colors shadow-md hover:shadow-lg ${
                                    isWarning 
                                        ? 'bg-red-500 hover:bg-red-600' 
                                        : 'bg-teal-600 hover:bg-teal-700'
                                }`}
                            >
                                {confirmText}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

CustomModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    isWarning: PropTypes.bool
};