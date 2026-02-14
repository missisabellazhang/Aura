
import React from 'react';
import { Message } from '../types.ts';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAssistant = message.role === 'assistant';

  const renderContent = (content: string) => {
    if (!content) return null;
    
    return content.split('\n').map((line, i) => {
      if (!line.trim() && i !== 0) return <div key={i} className="h-2" />;

      const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-900">$1</strong>');
      
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        return <li key={i} className="ml-5 mb-2 list-disc marker:text-indigo-400" dangerouslySetInnerHTML={{ __html: formattedLine.substring(2) }} />;
      }
      
      const isDisclaimer = line.includes('⚖️ Sugerencia profesional') || line.includes('Esta información es orientación general');
      
      if (isDisclaimer) {
        return (
          <div key={i} className="mt-4 bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 text-xs text-indigo-900/70 italic leading-relaxed shadow-sm">
            <div className="flex gap-2">
               <i className="fa-solid fa-circle-info mt-0.5 text-indigo-400"></i>
               <span dangerouslySetInnerHTML={{ __html: formattedLine }} />
            </div>
          </div>
        );
      }
      
      return (
        <p key={i} className="mb-3 last:mb-0" 
           dangerouslySetInnerHTML={{ __html: formattedLine }} 
        />
      );
    });
  };

  return (
    <div className={`flex w-full mb-6 animate-message ${isAssistant ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex max-w-[90%] sm:max-w-[80%] items-start gap-3 ${!isAssistant ? 'flex-row-reverse' : ''}`}>
        
        <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm shadow-sm transition-transform hover:scale-105
          ${isAssistant 
            ? 'bg-gradient-to-br from-indigo-500 to-indigo-700 text-white border-2 border-white' 
            : 'bg-gradient-to-br from-slate-700 to-slate-900 text-white border-2 border-white'}`}>
          {isAssistant ? <i className="fa-solid fa-robot"></i> : <i className="fa-solid fa-user"></i>}
        </div>
        
        <div className="flex flex-col">
          <div className={`relative px-5 py-4 text-[14px] leading-relaxed shadow-sm transition-all
            ${isAssistant 
              ? 'bg-white text-slate-700 border border-slate-200 rounded-2xl rounded-tl-none' 
              : 'bg-indigo-600 text-white border border-indigo-500 rounded-2xl rounded-tr-none'}`}>
            
            <div className="prose prose-sm max-w-none">
              {renderContent(message.content)}
            </div>
            
            <div className={`absolute top-0 w-2 h-2 ${isAssistant ? '-left-1 bg-white border-l border-t border-slate-200 rotate-[-45deg]' : '-right-1 bg-indigo-600 border-r border-t border-indigo-500 rotate-[45deg]'}`}></div>
          </div>
          
          <span className={`text-[10px] mt-1.5 font-medium tracking-wide uppercase px-1
            ${isAssistant ? 'text-slate-400' : 'text-right text-indigo-400'}`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
