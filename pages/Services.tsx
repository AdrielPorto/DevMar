import React from 'react';
import { Code, Terminal, Server, BarChart, Globe, Cpu, Shield, GraduationCap } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal'; // Importe o componente

const Services: React.FC = () => {
  const services = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Desenvolvimento de Software",
      desc: "Criação de softwares customizados, aplicações web, apps móveis (nativos e híbridos), e-commerce, ERPs e soluções SaaS."
    },
    {
      icon: <Terminal className="h-8 w-8" />,
      title: "Consultoria em TI",
      desc: "Diagnóstico, planejamento estratégico, arquitetura de software, governança de TI e adequação à Lei Geral de Proteção de Dados (LGPD)."
    },
    {
      icon: <Server className="h-8 w-8" />,
      title: "Suporte e Infraestrutura",
      desc: "Design UI/UX, prototipagem, administração de infraestrutura, cultura DevOps e monitoramento de sistemas."
    },
    {
      icon: <BarChart className="h-8 w-8" />,
      title: "Dados e Cloud",
      desc: "Business Intelligence (BI), engenharia de dados, administração de DBs e implementação de soluções em nuvem (AWS/Azure)."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Portais e Marketing Digital",
      desc: "Criação e manutenção de portais, provedores de conteúdo e otimização para mecanismos de busca (SEO)."
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: "IA e Automação",
      desc: "Machine Learning, chatbots, RPA (Automação de Processos), agentes inteligentes e integração de IA corporativa."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Segurança e Qualidade",
      desc: "Pentests, auditoria de segurança, DevSecOps, testes automatizados e garantia de qualidade (QA)."
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Treinamentos e Capacitação",
      desc: "Cursos técnicos, workshops em desenvolvimento e IA, e consultoria em estratégia de produtos digitais."
    }
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-brand-blue text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal> {/* Revela o header */}
            <h1 className="text-4xl font-display font-bold mb-6">Nossos Serviços</h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Soluções completas baseadas nos mais altos padrões técnicos e em conformidade com nosso estatuto social.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Grid de Serviços */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ScrollReveal key={index} delay={index * 0.1}> {/* Sequência de revelação com delay crescente */}
              <div 
                className="bg-white p-6 rounded-xl shadow-sm border border-brand-slate/10 hover:shadow-lg hover:border-brand-red/40 transition-all duration-300 group h-full flex flex-col"
              >
                <div className="bg-brand-bg w-14 h-14 rounded-lg flex items-center justify-center text-brand-blue mb-6 group-hover:bg-brand-blue group-hover:text-brand-red transition-colors duration-300 flex-shrink-0">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-brand-blue mb-3 flex-shrink-0">{service.title}</h3>
                <p className="text-brand-slate text-sm leading-relaxed flex-grow">
                  {service.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
      
      {/* Footer Banner */}
      <div className="bg-brand-bg py-16 border-t border-brand-slate/10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <ScrollReveal delay={0.1}> {/* Revela o banner no final da página */}
            <h3 className="text-xl font-bold text-brand-blue mb-4">Soluções Customizadas</h3>
            <p className="text-brand-slate max-w-2xl mx-auto">
              Além das atividades principais, a DevMar está preparada para explorar atividades correlatas e alocar profissionais especialistas diretamente em sua empresa.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default Services;