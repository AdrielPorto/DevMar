import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Button from '../components/Button';
import ScrollReveal from '../components/ScrollReveal';
import { useLanguage } from '../contexts/LanguageContext';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t.contact.successMessage);
    setFormState({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value
    });
  };

  return (
    <div className="w-full bg-brand-bg min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Título */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <h1 className="text-4xl font-display font-bold text-brand-blue mb-4">{t.contact.title}</h1>
            <p className="text-brand-slate max-w-2xl mx-auto">
              {t.contact.subtitle}
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Contact Info */}
          <ScrollReveal delay={0.1}>
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-brand-blue mb-6">{t.contact.channels}</h3>
                <ul className="space-y-6">
                  <li className="flex items-start space-x-4">
                    <div className="bg-brand-bg p-3 rounded-full text-brand-blue">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-brand-blue">{t.contact.email}</p>
                      <p className="text-brand-slate">contato@devmar.com.br</p>
                      <p className="text-brand-slate text-sm mt-1">{t.contact.emailResponse}</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-4">
                    <div className="bg-brand-bg p-3 rounded-full text-brand-blue">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-brand-blue">{t.contact.whatsapp}</p>
                      <p className="text-brand-slate">+55 (21) 96975-4036</p>
                      <p className="text-brand-slate text-sm mt-1">{t.contact.whatsappHours}</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-4">
                    <div className="bg-brand-bg p-3 rounded-full text-brand-blue">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-brand-blue">{t.contact.headquarters}</p>
                      <p className="text-brand-slate">{t.contact.location}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal delay={0.3}>
            <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-brand-red">
              <h3 className="text-2xl font-display font-bold text-brand-blue mb-6">{t.contact.formTitle}</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-brand-slate mb-2">{t.contact.nameLabel}</label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-brand-bg border-transparent focus:border-brand-red focus:bg-white focus:ring-0 transition-all text-brand-blue"
                    placeholder={t.contact.namePlaceholder}
                    value={formState.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-brand-slate mb-2">{t.contact.emailLabel}</label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-brand-bg border-transparent focus:border-brand-red focus:bg-white focus:ring-0 transition-all text-brand-blue"
                    placeholder={t.contact.emailPlaceholder}
                    value={formState.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-brand-slate mb-2">{t.contact.messageLabel}</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-brand-bg border-transparent focus:border-brand-red focus:bg-white focus:ring-0 transition-all text-brand-blue resize-none"
                    placeholder={t.contact.messagePlaceholder}
                    value={formState.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <Button type="submit" className="w-full justify-center text-lg">
                  {t.contact.sendButton} <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </ScrollReveal>                                                    
        </div>
      </div>
    </div>
  );
};

export default Contact;
