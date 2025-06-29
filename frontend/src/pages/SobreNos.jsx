import Header from "../components/header";
import Footer from "../components/footer";
import Clinica from "../assets/image/Clinica.jpg" 
import CriancasCor from '../assets/image/CriancaCor.jpg';
import { FaCalendarAlt, FaUserClock, FaShieldAlt, FaUserMd, FaHeartbeat, FaClinicMedical, FaWhatsapp } from "react-icons/fa";

function SobreNos() {
    const phoneNumber = "5547984747598";
    const whatsappLink = `https://wa.me/${phoneNumber}`;
    const whatsappMessage = encodeURIComponent("Olá, gostaria de mais informações sobre a MedSync!");

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <section
            className="relative text-white py-42 px-6 overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: `url(${CriancasCor})` }}
            >
            <div className="absolute inset-0 bg-gradient-to-br from-[#008E9A]/80 to-[#00B4C5]/80"></div>

            <div className="max-w-6xl mx-auto text-center relative z-10">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
                Conectando <span className="text-[#DFF3F4]">saúde</span> e <span className="text-[#DFF3F4]">tecnologia</span>
                </h1>
                <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 leading-relaxed">
                A MedSync reinventa a experiência em saúde com agendamentos simples e atendimento humanizado
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                    href={`${whatsappLink}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-white text-white hover:bg-white hover:text-[#008E9A] font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-2"
                >
                    <FaWhatsapp /> Fale Conosco
                </a>
                </div>
            </div>
            </section>

            <section className="py-10 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Quem somos?
                        </h2>
                        <div className="max-w-2xl mx-auto">
                            <p className="text-lg text-gray-600 leading-relaxed">
                                A <strong className="text-[#008E9A]">MedSync</strong> é uma plataforma inovadora que conecta pacientes e profissionais de saúde de forma simples, segura e eficiente. Nossa missão é democratizar o acesso à saúde de qualidade através da tecnologia.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-[#F8FDFD] p-8 rounded-2xl text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-[#DFF3F4]">
                            <div className="bg-[#00B4C5] p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 text-white">
                                <FaCalendarAlt size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-[#007A87] mb-3">Agendamento Rápido</h3>
                            <p className="text-gray-600">Marque consultas em poucos cliques, 24 horas por dia, sem complicações.</p>
                        </div>
                        
                        <div className="bg-[#F8FDFD] p-8 rounded-2xl text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-[#DFF3F4]">
                            <div className="bg-[#00B4C5] p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 text-white">
                                <FaUserClock size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-[#007A87] mb-3">Gestão Inteligente</h3>
                            <p className="text-gray-600">Médicos controlam sua agenda com ferramentas poderosas e intuitivas.</p>
                        </div>
                        
                        <div className="bg-[#F8FDFD] p-8 rounded-2xl text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-[#DFF3F4]">
                            <div className="bg-[#00B4C5] p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 text-white">
                                <FaShieldAlt size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-[#007A87] mb-3">Segurança Total</h3>
                            <p className="text-gray-600">Seus dados protegidos com os mais avançados protocolos de criptografia.</p>
                        </div>
                        
                        <div className="bg-[#F8FDFD] p-8 rounded-2xl text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-[#DFF3F4]">
                            <div className="bg-[#00B4C5] p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 text-white">
                                <FaUserMd size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-[#007A87] mb-3">Experiência Completa</h3>
                            <p className="text-gray-600">Interface intuitiva projetada para médicos e pacientes.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-34 px-6 bg-gradient-to-br from-[#F8FDFD] to-[#E6F7F8]">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col lg:flex-row items-stretch gap-8"> 
                        <div className="lg:w-1/2">
                            <div className="h-full overflow-hidden rounded-2xl shadow-xl">
                                <div className="relative h-full group">
                                    <img 
                                        src={Clinica} 
                                        alt="Estrutura da Clínica MedSync" 
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        style={{ minHeight: '400px' }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-2">Nossa Estrutura</h3>
                                            <p className="text-white/90">Ambiente moderno e acolhedor para seu conforto</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2 flex flex-col">
                            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg h-full flex flex-col justify-center">
                                <span className="inline-block bg-[#008E9A] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                                    NOSSA MISSÃO
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                    Saúde acessível para todos
                                </h2>
                                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                    Acreditamos que o cuidado com a saúde deve ser simples, humano e acessível. Por isso, desenvolvemos uma plataforma que elimina barreiras e conecta quem precisa de atendimento com os melhores profissionais.
                                </p>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="text-[#00B4C5] mt-1">
                                            <FaHeartbeat size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#007A87] text-lg">Atendimento Humanizado</h4>
                                            <p className="text-gray-600">Priorizamos o relacionamento médico-paciente em cada interação.</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-4">
                                        <div className="text-[#00B4C5] mt-1">
                                            <FaClinicMedical size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#007A87] text-lg">Tecnologia que Cura</h4>
                                            <p className="text-gray-600">Ferramentas inovadoras para melhorar sua experiência em saúde.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/5547984747598"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition duration-300"
          aria-label="Conversar no WhatsApp"
          
        >
          <svg
            className="w-8 h-8"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </div>

            <Footer />
        </div>
    );
}

export default SobreNos;