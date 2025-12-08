import React from 'react';
import { Users, Target, Heart } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="w-full bg-white">
      {/* Header */}
      <div className="bg-brand-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-display font-bold text-brand-blue mb-6">Quem Somos</h1>
          <p className="text-xl text-brand-slate max-w-3xl mx-auto">
            Uma cooperativa de tecnologia unindo excelência técnica e princípios colaborativos.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-display font-bold text-brand-blue mb-6">
              A força da DevMar
            </h2>
            <div className="space-y-6 text-brand-slate">
              <p>
                A <strong>DevMar</strong> é uma cooperativa de profissionais de tecnologia comprometida com a prestação de serviços de alto nível. Nosso modelo de negócios elimina intermediários, conectando clientes diretamente a especialistas seniores.
              </p>
              <p>
                Nosso objeto social abrange desde o desenvolvimento de software customizado e consultoria estratégica em TI até a implementação de soluções complexas de Inteligência Artificial e Segurança da Informação.
              </p>
              <p>
                Acreditamos que a tecnologia é a chave para o desenvolvimento econômico e social. Por isso, atuamos com transparência, ética e foco total nos resultados de nossos parceiros e clientes.
              </p>
            </div>
          </div>
          <div className="bg-brand-bg rounded-2xl p-8 border border-brand-slate/10">
            <img 
              src="https://picsum.photos/600/400?grayscale" 
              alt="Equipe DevMar" 
              className="rounded-lg shadow-lg mb-6 w-full object-cover h-64 grayscale hover:grayscale-0 transition-all duration-500"
            />
            <div className="flex items-center justify-between text-brand-blue font-display font-bold">
              <span>Fundada em Maricá/RJ</span>
              <span>Atuação Global</span>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="text-center p-6">
             <div className="bg-brand-blue/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
               <Users className="text-brand-blue h-8 w-8" />
             </div>
             <h3 className="text-xl font-bold text-brand-blue mb-2">Colaboração</h3>
             <p className="text-brand-slate text-sm">Trabalhamos juntos para superar desafios complexos e entregar valor real.</p>
           </div>
           <div className="text-center p-6">
             <div className="bg-brand-blue/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
               <Target className="text-brand-blue h-8 w-8" />
             </div>
             <h3 className="text-xl font-bold text-brand-blue mb-2">Inovação</h3>
             <p className="text-brand-slate text-sm">Estamos sempre na vanguarda da IA, Cloud e Desenvolvimento Moderno.</p>
           </div>
           <div className="text-center p-6">
             <div className="bg-brand-blue/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
               <Heart className="text-brand-blue h-8 w-8" />
             </div>
             <h3 className="text-xl font-bold text-brand-blue mb-2">Ética</h3>
             <p className="text-brand-slate text-sm">Transparência nos orçamentos, nos prazos e na propriedade do código.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default About;