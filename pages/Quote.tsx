import React, { useState } from 'react';
import { ArrowRight, FileText, Calendar, DollarSign, Building2, User, Mail, MessageSquare, ChevronDown } from 'lucide-react';
import Button from '../components/Button';
import ScrollReveal from '../components/ScrollReveal';

const Quote: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    description: '',
    deadline: '',
    budget: ''
  });

  const services = [
    'Desenvolvimento de Software',
    'Consultoria em TI',
    'Suporte e Infraestrutura',
    'Dados e Cloud',
    'Portais e Marketing Digital',
    'IA e Automação',
    'Segurança e Qualidade',
    'Treinamentos e Capacitação'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Obrigado! Recebemos sua solicitação de orçamento. Nossa equipe entrará em contato em breve para discutir os detalhes do seu projeto.');
    setFormState({
      name: '',
      email: '',
      company: '',
      service: '',
      description: '',
      deadline: '',
      budget: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value
    });
  };

  return (
    <div className="w-full bg-brand-bg min-h-[calc(100vh-80px)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header */}
        <div className="text-center mb-12">
          <ScrollReveal>
            <p className="text-brand-slate text-lg max-w-2xl mx-auto">
              Preencha o formulário abaixo para solicitar um orçamento personalizado. 
              Nossa equipe analisará sua necessidade e retornará com uma proposta detalhada.
            </p>
          </ScrollReveal>
        </div>

        {/* Formulário de Orçamento */}
        <ScrollReveal delay={0.2}>
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border-t-4 border-brand-red">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-brand-red/10 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-brand-red" />
              </div>
              <h2 className="text-2xl font-display font-bold text-brand-blue">
                Solicitar Orçamento
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nome e Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-brand-slate mb-2">
                    <User className="h-4 w-4" />
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-brand-bg border border-brand-slate/20 focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all text-brand-blue"
                    placeholder="Seu nome"
                    value={formState.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-brand-slate mb-2">
                    <Mail className="h-4 w-4" />
                    Email Corporativo
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-brand-bg border border-brand-slate/20 focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all text-brand-blue"
                    placeholder="seu@empresa.com"
                    value={formState.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Empresa e Tipo de Serviço */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="company" className="flex items-center gap-2 text-sm font-medium text-brand-slate mb-2">
                    <Building2 className="h-4 w-4" />
                    Empresa / Organização
                  </label>
                  <input
                    type="text"
                    id="company"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-brand-bg border border-brand-slate/20 focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all text-brand-blue"
                    placeholder="Nome da empresa"
                    value={formState.company}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="service" className="flex items-center gap-2 text-sm font-medium text-brand-slate mb-2">
                    <FileText className="h-4 w-4" />
                    Tipo de Serviço
                  </label>
                  <div className="relative">
                    <select
                      id="service"
                      required
                      className="w-full px-4 py-3 pr-10 rounded-lg bg-brand-bg border border-brand-slate/20 focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all text-brand-blue appearance-none cursor-pointer"
                      value={formState.service}
                      onChange={handleChange}
                    >
                      <option value="">Selecione um serviço</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-brand-slate pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Descrição do Projeto */}
              <div>
                <label htmlFor="description" className="flex items-center gap-2 text-sm font-medium text-brand-slate mb-2">
                  <MessageSquare className="h-4 w-4" />
                  Descreva seu Projeto
                </label>
                <textarea
                  id="description"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-brand-bg border border-brand-slate/20 focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all text-brand-blue resize-none"
                  placeholder="Descreva detalhadamente o que você precisa: objetivos, funcionalidades desejadas, público-alvo, integrações necessárias, etc."
                  value={formState.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* Prazo e Orçamento */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="deadline" className="flex items-center gap-2 text-sm font-medium text-brand-slate mb-2">
                    <Calendar className="h-4 w-4" />
                    Prazo Estimado
                  </label>
                  <div className="relative">
                    <select
                      id="deadline"
                      className="w-full px-4 py-3 pr-10 rounded-lg bg-brand-bg border border-brand-slate/20 focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all text-brand-blue appearance-none cursor-pointer"
                      value={formState.deadline}
                      onChange={handleChange}
                    >
                      <option value="">Selecione um prazo</option>
                      <option value="urgente">Urgente (até 1 mês)</option>
                      <option value="curto">Curto prazo (1-3 meses)</option>
                      <option value="medio">Médio prazo (3-6 meses)</option>
                      <option value="longo">Longo prazo (6+ meses)</option>
                      <option value="flexivel">Prazo flexível</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-brand-slate pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label htmlFor="budget" className="flex items-center gap-2 text-sm font-medium text-brand-slate mb-2">
                    <DollarSign className="h-4 w-4" />
                    Faixa de Orçamento
                  </label>
                  <div className="relative">
                    <select
                      id="budget"
                      className="w-full px-4 py-3 pr-10 rounded-lg bg-brand-bg border border-brand-slate/20 focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all text-brand-blue appearance-none cursor-pointer"
                      value={formState.budget}
                      onChange={handleChange}
                    >
                      <option value="">Selecione uma faixa</option>
                      <option value="ate-10k">Até R$ 10.000</option>
                      <option value="10k-50k">R$ 10.000 - R$ 50.000</option>
                      <option value="50k-100k">R$ 50.000 - R$ 100.000</option>
                      <option value="100k-500k">R$ 100.000 - R$ 500.000</option>
                      <option value="acima-500k">Acima de R$ 500.000</option>
                      <option value="a-definir">A definir</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-brand-slate pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Botão de Envio */}
              <div className="pt-4">
                <Button type="submit" variant="primary" className="w-full justify-center text-lg py-4">
                  Solicitar Orçamento <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <p className="text-sm text-brand-slate text-center mt-4">
                  Ao enviar, você concorda em receber uma proposta comercial da DevMar. 
                  Seus dados estão seguros e serão usados apenas para contato sobre este projeto.
                </p>
              </div>
            </form>
          </div>
        </ScrollReveal>

        {/* Informações Adicionais */}
        <ScrollReveal delay={0.4}>
          <div className="mt-12 bg-white p-6 rounded-xl border border-brand-slate/10">
            <h3 className="text-lg font-bold text-brand-blue mb-4">O que acontece depois?</h3>
            <ol className="space-y-3 text-brand-slate">
              <li className="flex items-start gap-3">
                <span className="bg-brand-red text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                <span>Nossa equipe analisará sua solicitação em até 24 horas úteis.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-brand-red text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                <span>Entraremos em contato para esclarecer dúvidas e entender melhor suas necessidades.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-brand-red text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                <span>Enviaremos uma proposta comercial detalhada com escopo, prazos e investimento.</span>
              </li>
            </ol>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Quote;

