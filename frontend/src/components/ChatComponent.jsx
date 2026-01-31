import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

const ProjectChat = ({ project }) => {
    const [messages, setMessages] = useState([
        { role: 'ai', content: `أنا المساعد الذكي لمشروع "${project?.project_name}". كيف يمكنني مساعدتك في التفاصيل التقنية الآن؟` }
    ]);
    const [input, setInput] = useState('');
    const scrollRef = useRef(null);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        
        const newMessages = [...messages, { role: 'user', content: input }];
        setMessages(newMessages);
        setInput('');

        setTimeout(() => {
            setMessages(prev => [...prev, { 
                role: 'ai', 
                content: "فكرة ممتازة! بناءً على تحليل GitHub، أقترح البدء بإعداد ملفات الـ Schema أولاً." 
            }]);
        }, 1000);
    };

    return (
        <div className="flex flex-col h-[450px] bg-white rounded-2xl border shadow-lg overflow-hidden flex-shrink-0">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white flex items-center gap-2">
                <Bot size={20} />
                <div className="flex flex-col">
                    <span className="font-bold text-sm">AI Project Guide</span>
                    <span className="text-[10px] opacity-80">Online | Learning from your style</span>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                            m.role === 'user' 
                            ? 'bg-blue-600 text-white rounded-br-none' 
                            : 'bg-white border shadow-sm text-gray-800 rounded-bl-none'
                        }`}>
                            {m.content}
                        </div>
                    </div>
                ))}
                <div ref={scrollRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 border-t bg-white flex gap-2">
                <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="اسأل الـ AI عن الكود..."
                    className="flex-1 bg-gray-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button type="submit" className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-transform active:scale-95">
                    <Send size={18} />
                </button>
            </form>
        </div>
    );
};

export default ProjectChat;