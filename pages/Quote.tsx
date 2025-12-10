import React, { useState, useRef } from 'react';
import { ArrowRight, FileText, Calendar, DollarSign, Building2, User, Mail, MessageSquare, ChevronDown, Loader2, CheckCircle, XCircle } from 'lucide-react';
import Button from '../components/Button';
import ScrollReveal from '../components/ScrollReveal';
import { useLanguage } from '../contexts/LanguageContext';
import { sendQuoteEmail } from '../services/emailServiceQuote';

const Quote: React.FC = () => {
  const { t } = useLanguage();
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    description: '',
    deadline: '',
    budget: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const services = [
    t.services.softwareDev,
    t.services.consulting,
    t.services.support,
    t.services.dataCloud,
    t.services.portals,
    t.services.aiAutomation,
    t.services.security,
    t.services.training
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formRef.current) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await sendQuoteEmail(formRef.current);
      
      setSubmitStatus('success');
      setFormState({
        name: '',
        email: '',
        company: '',
        service: '',
        description: '',
        deadline: '',
        budget: ''
      });
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
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
            <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-blue mb-4">
              {t.quote.title}
            </h1>
            <p className="text-brand-slate text-lg max-w-2xl mx-auto">
              {t.quote.subtitle}
            </p>
          </ScrollReveal>
        </div>

        {/* Form */}
        <ScrollReveal delay={0.2}>
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border-t-4 border-brand-red">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-brand-red/10 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-brand-red" />
              </div>
              <h2 className="text-2xl font-display font-bold text-brand-blue">
                {t.quote.formTitle}
              </h2>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Nome e Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-brand-slate mb-2">
                    <User className="h-4 w-4" />
                    {t.quote.nameLabel}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-brand-bg border border-brand-slate/20 focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all text-brand-blue"
                    placeholder={t.quote.namePlaceholder}
                    value={formState.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-brand-slate mb-2">
                    <Mail className="h-4 w-4" />
                    {t.quote.emailLabel}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-brand-bg border border-brand-slate/20 focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all text-brand-blue"
                    placeholder={t.quote.emailPlaceholder}
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
                    {t.quote.companyLabel}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-brand-bg border border-brand-slate/20 focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all text-brand-blue"
                    placeholder={t.quote.companyPlaceholder}
                    value={formState.company}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="service" className="flex items-center gap-2 text-sm font-medium text-brand-slate mb-2">
                    <FileText className="h-4 w-4" />
                    {t.quote.serviceLabel}
                  </label>
                  <div className="relative">
                    <select
                      id="service"
                      name="service"
                      required
                      className="w-full px-4 py-3 pr-10 rounded-lg bg-brand-bg border border-brand-slate/20 focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all text-brand-blue appearance-none cursor-pointer"
                      value={formState.service}
                      onChange={handleChange}
                    >
                      <option value="">{t.quote.servicePlaceholder}</option>
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
                  {t.quote.descriptionLabel}
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-brand-bg border border-brand-slate/20 focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all text-brand-blue resize-none"
                  placeholder={t.quote.descriptionPlaceholder}
                  value={formState.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* Prazo e Orçamento */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="deadline" className="flex items-center gap-2 text-sm font-medium text-brand-slate mb-2">
                    <Calendar className="h-4 w-4" />
                    {t.quote.deadlineLabel}
                  </label>
                  <div className="relative">
                    <select
                      id="deadline"
                      name="deadline"
                      className="w-full px-4 py-3 pr-10 rounded-lg bg-brand-bg border border-brand-slate/20 focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all text-brand-blue appearance-none cursor-pointer"
                      value={formState.deadline}
                      onChange={handleChange}
                    >
                      <option value="">{t.quote.deadlinePlaceholder}</option>
                      <option value="urgente">{t.quote.deadlineUrgent}</option>
                      <option value="curto">{t.quote.deadlineShort}</option>
                      <option value="medio">{t.quote.deadlineMedium}</option>
                      <option value="longo">{t.quote.deadlineLong}</option>
                      <option value="flexivel">{t.quote.deadlineFlexible}</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-brand-slate pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label htmlFor="budget" className="flex items-center gap-2 text-sm font-medium text-brand-slate mb-2">
                    <DollarSign className="h-4 w-4" />
                    {t.quote.budgetLabel}
                  </label>
                  <div className="relative">
                    <select
                      id="budget"
                      name="budget"
                      className="w-full px-4 py-3 pr-10 rounded-lg bg-brand-bg border border-brand-slate/20 focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all text-brand-blue appearance-none cursor-pointer"
                      value={formState.budget}
                      onChange={handleChange}
                    >
                      <option value="">{t.quote.budgetPlaceholder}</option>
                      <option value="ate-10k">{t.quote.budgetTo10k}</option>
                      <option value="10k-50k">{t.quote.budget10kTo50k}</option>
                      <option value="50k-100k">{t.quote.budget50kTo100k}</option>
                      <option value="100k-500k">{t.quote.budget100kTo500k}</option>
                      <option value="acima-500k">{t.quote.budgetAbove500k}</option>
                      <option value="a-definir">{t.quote.budgetTbd}</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-brand-slate pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Mensagem de Status */}
              {submitStatus === 'success' && (
                <div className="flex items-center gap-3 p-4 rounded-lg bg-green-50 border border-green-200 text-green-800">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <p>{t.quote.successMessage}</p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="flex items-center gap-3 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800">
                  <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                  <p>{t.quote.errorMessage}</p>
                </div>
              )}

              {/* Botão de Envio */}
              <div className="pt-4">
                <Button 
                  type="submit" 
                  variant="primary" 
                  className="w-full justify-center text-lg py-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      {t.quote.sendingButton}
                    </>
                  ) : (
                    <>
                      {t.quote.submitButton} <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
                <p className="text-sm text-brand-slate text-center mt-4">
                  {t.quote.disclaimer}
                </p>
              </div>
            </form>
          </div>
        </ScrollReveal>

        {/* Info */}
        <ScrollReveal delay={0.4}>
          <div className="mt-12 bg-white p-6 rounded-xl border border-brand-slate/10">
            <h3 className="text-lg font-bold text-brand-blue mb-4">{t.quote.whatHappens}</h3>
            <ol className="space-y-3 text-brand-slate">
              <li className="flex items-start gap-3">
                <span className="bg-brand-red text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                <span>{t.quote.step1}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-brand-red text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                <span>{t.quote.step2}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-brand-red text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                <span>{t.quote.step3}</span>
              </li>
            </ol>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Quote;
