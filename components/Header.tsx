
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-indigo-900 text-white px-6 py-4 flex items-center justify-between shadow-lg z-10">
      <div className="flex items-center gap-3">
        <div className="bg-white p-1.5 rounded-lg">
          <i className="fa-solid fa-scale-balanced text-indigo-900 text-xl"></i>
        </div>
        <div>
          <h1 className="font-bold text-xl tracking-tight leading-none">AURA</h1>
          <p className="text-[10px] opacity-70 uppercase font-medium tracking-widest mt-0.5">Asistente Jurídico Ecuador</p>
        </div>
      </div>
      
      <nav className="hidden sm:flex items-center gap-6 text-sm font-medium">
        <a href="#" className="hover:text-indigo-200 transition-colors">Normativas</a>
        <a href="#" className="hover:text-indigo-200 transition-colors">Plantillas</a>
        <a href="#" className="bg-indigo-700 hover:bg-indigo-600 px-4 py-2 rounded-lg transition-colors border border-indigo-500/30">
          <i className="fa-solid fa-shield-halved mr-2"></i>
          Seguridad Legal
        </a>
      </nav>

      <div className="sm:hidden">
        <button className="text-xl">
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
