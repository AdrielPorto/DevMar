import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { languages, Language } from '../locales';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const NAV_ITEMS = [
    { label: t.nav.home, path: '/' },
    { label: t.nav.about, path: '/sobre' },
    { label: t.nav.services, path: '/servicos' },
    { label: t.nav.contact, path: '/contato' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const isActive = (path: string) => location.pathname === path;

  const currentLang = languages.find(l => l.code === language);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setLangMenuOpen(false);
  };

  return (
    <header className="fixed w-full bg-brand-light/95 backdrop-blur-md z-50 border-b border-brand-slate/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-0 group">
            <div className="p-2 rounded-lg transition-colors duration-300">
              <img
                src="/images/menu-icon.png"
                alt="Logo DevMar"
                className="h-10 w-10 object-contain"
              />
            </div>

            <span className="font-display font-bold text-2xl sm:text-3xl text-brand-blue tracking-tight">
              DevMar
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4 lg:space-x-8 items-center">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'text-brand-red font-semibold'
                    : 'text-brand-slate hover:text-brand-blue'
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Theme + Language - Desktop */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-brand-slate hover:text-brand-blue hover:bg-brand-bg transition-colors"
                aria-label="Alternar tema (claro/escuro)"
                title="Alternar tema"
                type="button"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>

              {/* Language Selector - Desktop */}
              <div className="relative">
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-brand-slate hover:text-brand-blue hover:bg-brand-bg transition-colors"
                  aria-label="Select language"
                >
                  <Globe className="h-4 w-4" />
                  <span className="hidden lg:inline">{currentLang?.flag}</span>
                </button>

                {langMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setLangMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-brand-slate/10 py-1 z-50">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-brand-bg transition-colors ${
                            language === lang.code ? 'text-brand-red font-medium' : 'text-brand-slate'
                          }`}
                        >
                          <span>{lang.flag}</span>
                          <span>{lang.label}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </nav>

          {/* Mobile: Language + Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Language Selector - Mobile */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-sm text-brand-slate hover:text-brand-blue transition-colors"
                aria-label="Select language"
              >
                <span>{currentLang?.flag}</span>
              </button>

              {langMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setLangMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg border border-brand-slate/10 py-1 z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-brand-bg transition-colors ${
                          language === lang.code ? 'text-brand-red font-medium' : 'text-brand-slate'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Theme Toggle - Mobile (next to language) */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-sm text-brand-slate hover:text-brand-blue transition-colors"
              aria-label="Alternar tema (claro/escuro)"
              title="Alternar tema"
              type="button"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <button
              onClick={toggleMenu}
              className="text-brand-blue hover:text-brand-red focus:outline-none"
              aria-label="Menu"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-brand-red" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.path)
                    ? 'text-brand-red bg-brand-bg'
                    : 'text-brand-slate hover:text-brand-blue hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
