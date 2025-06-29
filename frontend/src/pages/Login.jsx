import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMedical } from "../contexts/MedicalContext.jsx";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";

export default function Login() {
    const navigate = useNavigate();
    const { carregarDadosCompletos } = useMedical(); 

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [registerName, setRegisterName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    
    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [registerError, setRegisterError] = useState("");
    const [showPasswordLogin, setShowPasswordLogin] = useState(false);
    const [showPasswordRegister, setShowPasswordRegister] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setLoginError("");

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: loginEmail, senha: loginPassword })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Erro ao tentar fazer login.");
            }

            localStorage.setItem('token', data.token);

            // ===================================================================
            // ESTA É A LINHA CRUCIAL QUE FALTAVA
            // Força o sistema a buscar todos os dados com o novo token
            // ANTES de ir para a próxima página.
            await carregarDadosCompletos(); 
            // ===================================================================
            
            navigate('/gerenciamento');

        } catch (error) {
            setLoginError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setRegisterError("");
        try {
            const response = await fetch('http://localhost:3000/login/criar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome: registerName, email: registerEmail, senha: registerPassword })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Erro ao tentar se cadastrar.");
            }
            alert("Cadastro realizado com sucesso! Por favor, faça o login.");
            setRegisterName("");
            setRegisterEmail("");
            setRegisterPassword("");
        } catch (error) {
            setRegisterError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="bg-gradient-to-br from-white to-gray-100">
            <Header />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="min-h-screen flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
                    
                    {/* Seção de Login */}
                    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="w-full md:w-1/2 p-8 md:p-10">
                        <h2 className="text-3xl font-extrabold text-[#008E9A] mb-8">Login</h2>
                        <form className="space-y-6" onSubmit={handleLogin}>
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                                <label className="block text-[#008E9A] font-medium mb-2">Email</label>
                                <input type="email" placeholder="Digite seu email" required className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                            </motion.div>
                            <motion.div className="relative" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                                <label className="block text-[#008E9A] font-medium mb-2">Senha</label>
                                <input type={showPasswordLogin ? "text" : "password"} placeholder="Digite sua senha" required className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="absolute top-10 right-4 cursor-pointer text-gray-600" onClick={() => setShowPasswordLogin(!showPasswordLogin)}>
                                    {showPasswordLogin ? <EyeOff size={20} /> : <Eye size={20} />}
                                </motion.div>
                            </motion.div>
                            {loginError && <p className="text-red-500 text-sm text-center">{loginError}</p>}
                            <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50">
                                {loading ? "Entrando..." : "Entrar"}
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Seção de Cadastro */}
                    <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="w-full md:w-1/2 p-8 md:p-10 bg-gradient-to-br bg-[#008E9A] to-teal-500">
                        <h2 className="text-3xl font-extrabold text-white mb-8">Cadastre-se</h2>
                        <form className="space-y-6" onSubmit={handleRegister}>
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                                <label className="block text-white font-medium mb-2">Nome completo</label>
                                <input type="text" placeholder="Digite seu nome" required className="w-full px-4 py-3 bg-white/90 border border-white/50 rounded-xl" value={registerName} onChange={(e) => setRegisterName(e.target.value)} />
                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                                <label className="block text-white font-medium mb-2">Email</label>
                                <input type="email" placeholder="Digite seu email" required className="w-full px-4 py-3 bg-white/90 border border-white/50 rounded-xl" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} />
                            </motion.div>
                            <motion.div className="relative" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                                <label className="block text-white font-medium mb-2">Senha</label>
                                <input type={showPasswordRegister ? "text" : "password"} placeholder="Crie uma senha" required className="w-full px-4 py-3 bg-white/90 border border-white/50 rounded-xl" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="absolute top-10 right-4 cursor-pointer text-teal-600" onClick={() => setShowPasswordRegister(!showPasswordRegister)}>
                                    {showPasswordRegister ? <EyeOff size={20} /> : <Eye size={20} />}
                                </motion.div>
                            </motion.div>
                            {registerError && <p className="text-yellow-300 text-sm text-center">{registerError}</p>}
                            <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`w-full px-6 py-3 bg-white text-teal-600 font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50`}>
                                {loading ? "Cadastrando..." : "Cadastrar"}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </motion.div>
            <Footer />
        </main>
    );
}