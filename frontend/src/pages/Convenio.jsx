import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import { useState } from 'react';

const Convenio = () => {
  const generateWhatsAppLink = (message) => {
    const phoneNumber = "5547984747598";
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };

  // Dados dos planos do convênio
  const convenioPlans = [
    {
      title: "Oftalmologista",
      savings: "R$ 120 de economia",
      originalPrice: "R$ 210",
      discountPrice: "R$ 90",
      features: ["Sem filas", "Sem longas horas de espera", "Agendamento online"],
      popular: false,
      icon: (
        <svg className="w-8 h-8 text-[#00565e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
        </svg>
      )
    },
    {
      title: "Exame de sangue",
      savings: "+70% de desconto",
      originalPrice: "R$ 24",
      discountPrice: "R$ 7",
      features: ["Sem filas", "Resultados online", "Coleta domiciliar"],
      popular: true,
    },
    {
      title: "Check Up",
      savings: "R$ 42 de economia",
      originalPrice: "R$ 92",
      discountPrice: "R$ 50",
      features: ["Avaliação completa", "Resultados em 24h", "Relatório personalizado"],
      popular: false,
      icon: (
        <svg className="w-8 h-8 text-[#00565e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
        </svg>
      )
    }
  ];

  // Dados das especialidades
  const especialidades = [
    {
      categoria: "Pediatria",
      items: [
        "Cirurgia pediátrica",
        "Endocrinologia pediátrica",
        "Gastroenterologia pediátrica",
        "Nefrologia pediátrica",
        "Pediatria geral e pré natal pediátrico",
        "Psiquiatria Infantil"
      ],
      icon: "👶",
      color: "bg-[#94E6ED]"
    },
    {
      categoria: "Fisioterapia",
      items: [
        "Fisioterapia do desenvolvimento motor",
        "Fisioterapia motora / RPG e postural",
        "Fisioterapia pélvica pediátrica",
        "Fisioterapia pélvica feminina e gestante",
        "Fisioterapia respiratória pediátrica",
        "Osteopatia pediátrica"
      ],
      icon: "💪",
      color: "bg-[#F9E4AE]"
    },
    {
      categoria: "Terapias e Outros",
      items: [
        "Fonoaudiologia",
        "Genética Médica",
        "Neuropsicopedagogia",
        "Nutrição materno infantil",
        "Psicologia para mulheres",
        "Terapia Alimentar"
      ],
      icon: "🧠",
      color: "bg-[#FFB8C6]"
    }
  ];

  // Dados de como funciona o convênio
  const convenioInfo = {
    beneficios: [
      "Descontos em consultas e exames",
      "Agendamento rápido e sem burocracia",
      "Atendimento humanizado e especializado"
    ],
    cobertura: [
      "Consultas com especialistas",
      "Exames laboratoriais e de imagem",
      "Procedimentos terapêuticos"
    ]
  };

  // Dados das Perguntas Frequentes
  const faqItems = [
    {
      question: "Como faço para aderir ao convênio MedSync?",
      answer: "Você pode aderir ao nosso convênio diretamente em nossa clínica, através do site ou por telefone. Basta escolher o plano que melhor atende suas necessidades e nosso time irá guiá-lo pelo processo de adesão."
    },
    {
      question: "Quais são as formas de pagamento aceitas?",
      answer: "Aceitamos cartões de crédito (em até 12x), débito automático, PIX e boleto bancário. Para empresas, também oferecemos condições especiais no pagamento por fatura."
    },
    {
      question: "Existe carência para utilizar os serviços?",
      answer: "Não há carência para consultas e exames básicos. Para alguns procedimentos específicos, pode haver um período de carência de até 30 dias, que será informado no momento da contratação."
    },
    {
      question: "Posso incluir dependentes no meu plano?",
      answer: "Sim, oferecemos condições especiais para inclusão de dependentes. Você pode incluir cônjuge, filhos até 21 anos (ou até 24 se estudante) e pais com desconto especial para famílias."
    },
    {
      question: "O convênio tem abrangência nacional?",
      answer: "Nosso convênio oferece cobertura em todo o território nacional através de nossa rede credenciada. Consulte nossa lista de profissionais e clínicas parceiras em sua região."
    },
    {
      question: "Como faço para agendar consultas e exames?",
      answer: "O agendamento pode ser feito através do nosso aplicativo, site, telefone ou diretamente na recepção de nossas unidades. Para exames mais complexos, recomendamos agendar com antecedência."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-28">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#00565e] mb-4">
            Convênio <span className="text-teal-500">MedSync</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Planos de saúde e descontos especiais para cuidar da sua família
          </p>
        </section>
        <section className="mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            {convenioPlans.map((plan, index) => (
              <div 
                key={index}
                className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  plan.popular ? "ring-2 ring-teal-500" : "border border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="bg-teal-500 text-white text-center py-2 font-bold">
                    MAIS POPULAR
                  </div>
                )}
                <div className="p-6">
                  <div className="flex justify-center mb-4">
                    {plan.icon}
                  </div>
                  <div className="bg-teal-500 p-4 text-white text-center rounded-lg mb-6">
                    <h3 className="text-2xl font-bold">{plan.title}</h3>
                  </div>
                  
                  <div className="text-center mb-4">
                    <span className=" text-[#00565e]font-bold text-lg">{plan.savings}</span>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-500 line-through">{plan.originalPrice}</span>
                      <span className="text-gray-500 text-sm">No particular</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-teal-800 font-bold text-xl">{plan.discountPrice}</span>
                      <span className="text-teal-800 text-sm">Com MedSync</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="w-5 h-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    className="w-full bg-teal-800 hover:bg-teal-900 text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center"
                    onClick={() => window.open(generateWhatsAppLink(`Olá, gostaria de mais informações sobre o plano ${plan.title}`), '_blank')}
                  >
                    Agendar agora
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-16">
          <h2 className="text-2xl font-bold text-teal-800 mb-8 text-center">
            Como funciona nosso <span className="text-teal-500">convênio</span>?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <h3 className="text-xl font-semibold text-teal-800 mb-4 flex items-center">
                <svg className="w-6 h-6 text-teal-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Benefícios
              </h3>
              <ul className="space-y-3">
                {convenioInfo.beneficios.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="bg-teal-500 bg-opacity-10 p-1 rounded-full mr-3">
                      <svg className="w-4 h-4 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <h3 className="text-xl font-semibold text-teal-800 mb-4 flex items-center">
                <svg className="w-6 h-6 text-teal-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Cobertura
              </h3>
              <ul className="space-y-3">
                {convenioInfo.cobertura.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="bg-teal-500 bg-opacity-10 p-1 rounded-full mr-3">
                      <svg className="w-4 h-4 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <section className="py-16 bg-white rounded-xl shadow-lg mb-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-teal-800 mb-4">
                Nossas Especialidades
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Cuidado integral em diversas áreas da saúde infantil e feminina
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {especialidades.map((grupo, index) => (
                <div 
                  key={index}
                  className={`rounded-xl p-6 border border-gray-200 hover:border-teal-300 transition-all duration-300 ${grupo.color}`}
                >
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3">{grupo.icon}</span>
                    <h3 className="text-xl font-bold text-teal-800">
                      {grupo.categoria}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {grupo.items.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <svg 
                          className="w-4 h-4 text-teal-500 mr-2 mt-1 flex-shrink-0" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-16 bg-white rounded-xl shadow-lg mb-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-teal-800 mb-4">
                Perguntas Frequentes
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Tire suas dúvidas sobre o Convênio MedSync
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              {faqItems.map((item, index) => (
                <div 
                  key={index}
                  className="mb-4 border-b border-gray-200 pb-4"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex justify-between items-center w-full text-left focus:outline-none hover:text-teal-700 transition-colors duration-200"
                  >
                    <h3 className="text-lg font-semibold text-teal-800">
                      {item.question}
                    </h3>
                    <svg
                      className={`w-5 h-5 text-teal-500 transform transition-transform duration-200 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === index ? 'max-h-40 mt-4' : 'max-h-0'
                    }`}
                  >
                    <p className="text-gray-600">
                      {item.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <p className="text-gray-600 mb-6">
                Não encontrou sua dúvida? Entre em contato conosco!
              </p>
              <button 
                className="bg-teal-800 hover:bg-teal-900 text-white font-bold py-3 px-8 rounded-lg transition duration-300 inline-flex items-center"
                onClick={() => window.open(generateWhatsAppLink("Olá, gostaria de mais informações sobre o convênio MedSync"), '_blank')}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                Fale com nosso atendimento
              </button>
            </div>
          </div>
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
};

export default Convenio;