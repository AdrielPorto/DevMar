import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NavItem } from '../types';

const NAV_ITEMS: NavItem[] = [
  { label: 'Início', path: '/' },
  { label: 'Sobre', path: '/sobre' },
  { label: 'Serviços', path: '/servicos' },
  { label: 'Contato', path: '/contato' },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed w-full bg-brand-light/95 backdrop-blur-md z-50 border-b border-brand-slate/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo (IMAGEM NOVA E TAMANHO AUMENTADO) */}
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
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
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
