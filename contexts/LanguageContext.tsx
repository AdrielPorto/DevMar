import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ptBR, enUS, Language } from '../locales';

type Translations = typeof ptBR;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Translations> = {
  'pt-BR': ptBR,
  'en-US': enUS,
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Tenta recuperar do localStorage ou usa pt-BR como padrão
    const saved = localStorage.getItem('devmar-language');
    if (saved === 'pt-BR' || saved === 'en-US') {
      return saved;
    }
    // Detecta idioma do navegador
    const browserLang = navigator.language;
    if (browserLang.startsWith('en')) {
      return 'en-US';
    }
    return 'pt-BR';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('devmar-language', lang);
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

