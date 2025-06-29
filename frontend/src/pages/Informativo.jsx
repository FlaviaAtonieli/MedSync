// frontend/src/pages/Informativo.jsx
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import { useMedical } from '../contexts/MedicalContext.jsx'; 

function Informativo() {
    const { artigos, loading } = useMedical(); 

    const formatarData = (dataSQL) => {
        if (!dataSQL) return '';
        const data = new Date(dataSQL);
        return data.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-28 mb-16">
                <section className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#00565e] mb-4">Informativo <span className="text-teal-500">Médico</span></h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">Conheça os trabalhos, pesquisas e artigos desenvolvidos por nossos especialistas.</p>
                </section>
                
                <section>
                    <h2 className="text-2xl font-semibold text-[#00565e] mb-8 border-b-2 border-teal-100 pb-2">Nossas Publicações</h2>
                    {loading ? (
                        <p>Carregando artigos...</p>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {artigos.map(artigo => (
                                <article key={artigo.id_artigo} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
                                    <img 
                                        src={artigo.imagem_url || 'https://placehold.co/600x400/e2e8f0/64748b?text=MedSync'} 
                                        alt={`Imagem para o artigo ${artigo.titulo}`}
                                        className="h-48 w-full object-cover" 
                                    />
                                    <div className="p-6 flex flex-col flex-grow">
                                        <span className="text-sm text-teal-600 font-semibold">{formatarData(artigo.data_publicacao)}</span>
                                        <h3 className="text-xl font-bold text-gray-800 my-2 flex-grow">{artigo.titulo}</h3>
                                        <p className="text-gray-600">{artigo.resumo}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default Informativo;