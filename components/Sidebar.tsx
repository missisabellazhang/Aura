
import React from 'react';
import { LegalTip } from '../types.ts';

interface SidebarProps {
  onSelectSuggestion: (text: string) => void;
  tips: LegalTip[];
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectSuggestion, tips }) => {
  return (
    <div className="p-6">
      <section className="mb-8">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <i className="fa-solid fa-lightbulb text-amber-400"></i>
          Consejos Rápidos
        </h3>
        <div className="space-y-4">
          {tips.map((tip, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200 p-4 rounded-xl hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase mb-2 inline-block">
                {tip.category}
              </span>
              <h4 className="text-sm font-semibold text-slate-800 mb-1">{tip.title}</h4>
              <p className="text-xs text-slate-600 leading-normal">{tip.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Leyes Principales</h3>
        <ul className="space-y-2">
          {[
            { name: "Constitución 2008", url: "https://www.asambleanacional.gob.ec" },
            { name: "Código del Trabajo", url: "#" },
            { name: "Código Civil", url: "#" },
            { name: "COIP", url: "#" },
          ].map((link, idx) => (
            <li key={idx}>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 hover:text-indigo-600 flex items-center justify-between group">
                {link.name}
                <i className="fa-solid fa-arrow-up-right-from-square text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"></i>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <div className="bg-indigo-900 rounded-2xl p-5 text-white overflow-hidden relative">
        <div className="relative z-10">
          <h4 className="font-bold text-sm mb-2">¿Necesitas un abogado?</h4>
          <p className="text-xs text-indigo-200 mb-4">Si tu caso requiere litigio o firma profesional, consulta el registro del Foro de Abogados.</p>
          <button className="w-full bg-white text-indigo-900 font-bold text-xs py-2 rounded-lg hover:bg-indigo-50 transition-colors">
            Ver Directorio Profesional
          </button>
        </div>
        <i className="fa-solid fa-gavel absolute -bottom-4 -right-4 text-7xl opacity-10 rotate-12"></i>
      </div>
    </div>
  );
};

export default Sidebar;
