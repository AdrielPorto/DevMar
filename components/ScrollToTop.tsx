import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Função para rolar para o topo
    const scrollToTop = () => {
      // Múltiplas formas de garantir que funcione em todos os navegadores
      window.scrollTo(0, 0);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto'
      });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Força o scroll após um pequeno delay para garantir
      setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 0);
    };

    // Rola para o topo quando a rota muda
    scrollToTop();
  }, [pathname]);

  // Rola para o topo quando o componente é montado (recarregamento da página)
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Executa imediatamente
    scrollToTop();

    // Executa quando a página termina de carregar
    if (document.readyState === 'complete') {
      scrollToTop();
    } else {
      const handleLoad = () => {
        scrollToTop();
        // Executa novamente após um pequeno delay
        setTimeout(scrollToTop, 10);
      };
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return null;
};

export default ScrollToTop;

