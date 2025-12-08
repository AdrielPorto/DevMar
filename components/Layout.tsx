import React from 'react';
import Header from './Header';
import Footer from './Footer';
import FloatingButton from './FloatingButton';
import { LayoutProps } from '../types';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-brand-bg">
      <Header />
      {/* Adjust pt-20 to account for fixed header height */}
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
      <FloatingButton />
    </div>
  );
};

export default Layout;