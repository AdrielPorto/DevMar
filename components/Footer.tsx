import React from 'react';
import { Code2, Facebook, Twitter, Linkedin, Mail, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-blue text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-0 mb-4">
              <div className="p-2 rounded-lg transition-colors duration-300">
              <img
                src="/images/menu-icon.png"
                alt="Logo DevMar"
                className="h-10 w-10 object-contain"
              />
            </div>
              <span className="font-display font-bold text-xl text-white tracking-tight">
                DevMar
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Cooperativa de tecnologia focada em serviços de TI, desenvolvimento e inovação. 
              Transformando ideias em código.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-brand-red transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-brand-red transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-brand-red transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h3 className="text-white font-display font-bold mb-4">Navegação</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link to="/" className="hover:text-brand-red transition-colors">Início</Link></li>
              <li><Link to="/sobre" className="hover:text-brand-red transition-colors">Quem Somos</Link></li>
              <li><Link to="/servicos" className="hover:text-brand-red transition-colors">Nossos Serviços</Link></li>
              <li><Link to="/contato" className="hover:text-brand-red transition-colors">Contato</Link></li>
            </ul>
          </div>

           {/* Services Column */}
           <div>
            <h3 className="text-white font-display font-bold mb-4">Especialidades</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>Desenvolvimento Web & App</li>
              <li>Consultoria LGPD</li>
              <li>Inteligência Artificial</li>
              <li>Cloud Computing</li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-white font-display font-bold mb-4">Contato</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contato@devmar.com.br</span>
              </li>
              <li>Maricá, RJ - Brasil</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} DevMar. Todos os direitos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-brand-red">Privacidade</a>
            <a href="#" className="hover:text-brand-red">Termos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;