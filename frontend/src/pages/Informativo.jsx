import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import artigo01 from "../assets/image/artigo01.jpg";
import artigo02 from "../assets/image/artigo02.jpg";
import artigo03 from "../assets/image/artigo03.jpg";
import artigo04 from "../assets/image/artigo04.webp";
import artigo05 from "../assets/image/artigo05.jpg";
import artigo06 from "../assets/image/artigo06.jpg";
import artigo07 from "../assets/image/artigo07.jpg";

function Informativo() {
    return(
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            
            <main className="container mx-auto px-4 py-28 mb-16">
                  <section className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[#00565e] mb-4">
                Informativo <span className="text-teal-500">Médico</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conheça os trabalhos, pesquisas e artigos desenvolvidos por nossos especialistas para promover saúde e bem-estar.
            </p>
            </section>
               
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold text-[#00565e] mb-8 border-b-2 border-blue-100 pb-2">Artigos em Destaque</h2>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
                                <img src={artigo01} alt="Crianças em tratamento" className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6">
                                <span className="text-sm text-[#00565e]">setembro 2, 2023</span>
                                <h3 className="text-xl font-bold text-[#00565e] my-2">Comorbidades nas Disfunções do Trato Urinário Infantil</h3>
                                <p className="text-black">
                                    Explore as comorbidades relacionadas às disfunções do trato urinário em crianças e a importância de uma abordagem abrangente.
                                </p>
                            </div>
                        </article>

                        <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
                                <img src={artigo02} alt="Crianças em tratamento" className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6">
                                <span className="text-sm text-[#00565e]">setembro 2, 2023</span>
                                <h3 className="text-xl font-bold text-[#00565e] my-2">Identificando Distúrbios Funcionais do Trato Urinário na Infância</h3>
                                <p className="text-black">
                                    Sinais de alerta que ajudam os pais a identificarem quando é necessário buscar orientação médica.
                                </p>
                            </div>
                        </article>
                    
                        <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
                               <img src={artigo03} alt="Crianças em tratamento" className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6">
                                <span className="text-sm text-[#00565e]">julho 12, 2023</span>
                                <h3 className="text-xl font-bold text-[#00565e] my-2">Fisioterapia Pélvica Infantil</h3>
                                <p className="text-black">
                                    Como a fisioterapia pélvica pediátrica pode diagnosticar e tratar distúrbios relacionados à região pélvica em crianças.
                                </p>
                            </div>
                        </article>
                    </div>
                </section>
                
                <section>
                    <h2 className="text-2xl font-semibold text-[#00565e] mb-8 border-b-2 border-blue-100 pb-2">Mais Artigos e Pesquisas</h2>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                            <div className="h-40 w-full bg-gray-200 flex items-center justify-center">
                                <img src={artigo04} alt="Crianças em tratamento" className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6">
                                <span className="text-sm text-[#00565e]">maio 17, 2023</span>
                                <h3 className="text-xl font-bold text-[#00565e] my-2">Urticária</h3>
                                <p className="text-black">
                                    Avermelhamento, inchaço e coceira... mais de 20% da população vai apresentar pelo menos uma vez essa alteração.
                                </p>
                            </div>
                        </article>

                        <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                            <div className="h-40 w-full bg-gray-200 flex items-center justify-center">
                                <img src={artigo05} alt="Crianças em tratamento" className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6">
                                <span className="text-sm text-[#00565e]">maio 17, 2023</span>
                                <h3 className="text-xl font-bold text-[#00565e] my-2">Torcicolo em Bebês</h3>
                                <p className="text-black">
                                    Você já ouviu falar de torcicolo em bebês? Saiba que isso pode acontecer e causar alguns incômodos aos pequenos.
                                </p>
                            </div>
                        </article>

                        <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                            <div className="h-40 w-full bg-gray-200 flex items-center justify-center">
                                <img src={artigo06} alt="Crianças em tratamento" className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6">
                                <span className="text-sm text-[#00565e]">maio 17, 2023</span>
                                <h3 className="text-xl font-bold text-[#00565e] my-2">Acompanhamento de Peso e Altura</h3>
                                <p className="text-black">
                                    &quot;Doutora, você acha que o peso e a altura dele estão bons?&quot; Responder a esta pergunta tão frequente em nossa rotina pediátrica.
                                </p>
                            </div>
                        </article>
                        
                        <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                            <div className="h-40 w-full bg-gray-200 flex items-center justify-center">
                                <img src={artigo07} alt="Crianças em tratamento" className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6">
                                <span className="text-sm text-[#00565e]">abril 10, 2023</span>
                                <h3 className="text-xl font-bold text-[#00565e] my-2">Tecnologia e Saúde Infantil</h3>
                                <p className="text-black">
                                    Como a MedSync está revolucionando o acompanhamento pediátrico através da tecnologia e atendimento humanizado.
                                </p>
                            </div>
                        </article>
                    </div>
                </section>
                
                <section className="mt-16 bg-[#00565e] rounded-xl p-8 text-center text-white">
                    <h2 className="text-2xl font-bold mb-4">Você se interessa por pesquisa científica?</h2>
                    <p className="mb-6 max-w-2xl mx-auto">
                       A MedSync valoriza o conhecimento compartilhado.
                    </p>

                    <p>Profissionais da saúde podem publicar seus artigos, estudos de caso e resultados de pesquisas diretamente na plataforma.</p> 
                       <p> Contribua para o crescimento da comunidade médica, ajude pacientes e fortaleça sua atuação como pesquisador.</p>
                <p>Publique, inspire e faça a diferença.</p>
                </section>
            </main>
            
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

export default Informativo;