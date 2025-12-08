import React from 'react';
import { ArrowRight, Code2, Users, Rocket, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button'; // Presumindo que o componente Button existe

const Home: React.FC = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-bg pt-16 pb-32 lg:pt-24 lg:pb-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-brand-blue/10 text-brand-blue text-sm font-semibold mb-6">
              Cooperativa de Tecnologia
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-brand-blue mb-6 leading-tight">
              Tecnologia e inovação com <span className="text-brand-red">propósito</span> cooperativista.
            </h1>
            <p className="text-lg md:text-xl text-brand-slate mb-10 max-w-2xl leading-relaxed">
              Desenvolvimento de software, consultoria e soluções digitais avançadas. A DevMar conecta profissionais de elite para transformar o seu negócio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contato">
                <Button className="w-full sm:w-auto">
                  Iniciar Projeto <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/servicos">
                <Button variant="outline" className="w-full sm:w-auto">
                  Ver Serviços
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/4 opacity-5 hidden lg:block">
          <svg width="600" height="600" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#1B2A41" d="M42.7,-73.2C55.9,-66.1,67.6,-56.9,76.4,-45.6C85.2,-34.3,91.1,-20.9,90.2,-7.8C89.3,5.3,81.6,18.1,72.4,29.1C63.2,40.1,52.5,49.3,41.2,56.8C29.9,64.3,18,70.1,5.3,71.9C-7.4,73.7,-20.9,71.5,-33.4,65.3C-45.9,59.1,-57.4,48.9,-65.8,36.8C-74.2,24.7,-79.5,10.7,-78.7,-3.1C-77.9,-16.9,-71,-30.5,-61.6,-41.8C-52.2,-53.1,-40.3,-62.1,-27.9,-69.5C-15.5,-76.9,-2.6,-82.7,9.3,-79.5C21.2,-76.3,33.1,-79.4,42.7,-73.2Z" transform="translate(100 100)" />
          </svg>
        </div>
      </section>

      {/* Pillars Section (AGORA COM FLIP CARD) */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* CARD 1: Desenvolvimento Customizado (Flip Card) */}
            <div className="flip-card-container h-[250px]">
              <div className="benefit-card">
                {/* Frente do Cartão: Título e Ícone */}
                <div className="card-front flex flex-col items-center justify-center p-6 rounded-2xl bg-brand-bg border border-brand-slate/10 group">
                  <div className="bg-brand-blue p-3 rounded-lg mb-6">
                    <Code2 className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-brand-blue mb-3 text-center">
                    Desenvolvimento Customizado
                  </h3>
                </div>
                
                {/* Verso do Cartão: Descrição */}
                <div className="card-back flex flex-col items-center justify-center p-6 rounded-2xl">
                  <p className="text-white text-center">
                    Softwares sob medida, Apps nativos e plataformas SaaS criados para as suas necessidades específicas.
                  </p>
                </div>
              </div>
            </div>

            {/* CARD 2: Consultoria Especializada (Flip Card) */}
            <div className="flip-card-container h-[250px]">
              <div className="benefit-card">
                {/* Frente do Cartão: Título e Ícone */}
                <div className="card-front flex flex-col items-center justify-center p-6 rounded-2xl bg-brand-bg border border-brand-slate/10 group">
                  <div className="bg-brand-blue p-3 rounded-lg mb-6">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-brand-blue mb-3 text-center">
                    Consultoria Especializada
                  </h3>
                </div>
                
                {/* Verso do Cartão: Descrição */}
                <div className="card-back flex flex-col items-center justify-center p-6 rounded-2xl">
                  <p className="text-white text-center">
                    Diagnósticos de TI, Governança, Adequação à LGPD e planejamento estratégico tecnológico.
                  </p>
                </div>
              </div>
            </div>

            {/* CARD 3: IA e Segurança (Flip Card) */}
            <div className="flip-card-container h-[250px]">
              <div className="benefit-card">
                {/* Frente do Cartão: Título e Ícone */}
                <div className="card-front flex flex-col items-center justify-center p-6 rounded-2xl bg-brand-bg border border-brand-slate/10 group">
                  <div className="bg-brand-blue p-3 rounded-lg mb-6">
                    <ShieldCheck className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-brand-blue mb-3 text-center">
                    IA e Segurança
                  </h3>
                </div>
                
                {/* Verso do Cartão: Descrição */}
                <div className="card-back flex flex-col items-center justify-center p-6 rounded-2xl">
                  <p className="text-white text-center">
                    Soluções avançadas em Inteligência Artificial, Automação e Segurança da Informação (DevSecOps).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-blue py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Rocket className="h-12 w-12 text-brand-red mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
            Acelere sua transformação digital
          </h2>
          <p className="text-gray-300 text-lg mb-10">
            A DevMar oferece a robustez técnica que sua empresa precisa com a flexibilidade que o mercado exige.
          </p>
          <Link to="/contato">
            <Button variant="primary" className="text-lg px-8 py-4">
              Solicitar Orçamento
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;