
import React, { useState, useRef, useEffect } from 'react';
import { Message } from './types';
import { getGeminiStreamingResponse } from './services/gemini';
import { SUGGESTED_QUESTIONS, LEGAL_TIPS } from './constants';
import Header from './components/Header';
import ChatMessage from './components/ChatMessage';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: '¡Hola! Soy **AURA**, tu asistente jurídico virtual para el Ecuador. ¿En qué puedo orientarte hoy sobre leyes, trámites o regulaciones nacionales?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const assistantId = (Date.now() + 1).toString();
    const assistantMessage: Message = {
      id: assistantId,
      role: 'assistant',
      content: '',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, assistantMessage]);

    try {
      let fullContent = '';
      const stream = getGeminiStreamingResponse(text);
      
      for await (const chunk of stream) {
        fullContent += chunk;
        setMessages(prev => prev.map(msg => 
          msg.id === assistantId ? { ...msg, content: fullContent } : msg
        ));
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => prev.map(msg => 
        msg.id === assistantId ? { ...msg, content: 'Lo siento, ha ocurrido un error al procesar tu consulta. Por favor, intenta de nuevo más tarde.' } : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Hidden on mobile, visible on medium screens */}
        <div className="hidden md:block w-80 border-r border-slate-200 bg-white overflow-y-auto">
          <Sidebar onSelectSuggestion={handleSend} tips={LEGAL_TIPS} />
        </div>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col relative bg-slate-50">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              {isLoading && (
                <div className="flex items-center space-x-2 text-slate-400 italic text-sm">
                  <div className="animate-bounce">●</div>
                  <div className="animate-bounce delay-75">●</div>
                  <div className="animate-bounce delay-150">●</div>
                  <span>AURA está consultando las leyes ecuatorianas...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-200">
            <div className="max-w-3xl mx-auto">
              {messages.length < 3 && !isLoading && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {SUGGESTED_QUESTIONS.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(q)}
                      className="text-xs bg-slate-100 hover:bg-indigo-100 text-slate-600 hover:text-indigo-700 px-3 py-1.5 rounded-full border border-slate-200 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
              
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-end gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200 focus-within:border-indigo-400 transition-all shadow-sm"
              >
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Describe tu situación legal o duda..."
                  className="flex-1 bg-transparent border-none focus:ring-0 resize-none py-2 px-3 text-slate-700 max-h-32"
                  rows={1}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className={`p-3 rounded-xl transition-all ${
                    !input.trim() || isLoading 
                      ? 'bg-slate-200 text-slate-400' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'
                  }`}
                >
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </form>
              <p className="text-[10px] text-center text-slate-400 mt-2 uppercase tracking-wider font-semibold">
                Orientación Jurídica General para Ecuador
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
