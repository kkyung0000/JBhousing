
import React, { useState } from 'react';
import { mockFAQs } from '../data/mockData';
import { HelpCircle, ChevronDown, ChevronUp, Search } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const categories = ['전체', '입찰/보증금', '안전/보험', '공동입찰', '이용문의'];
  const filteredFAQs = selectedCategory === '전체' 
    ? mockFAQs 
    : mockFAQs.filter(f => f.category === selectedCategory);

  return (
    <div className="bg-white min-h-screen pb-20">
      <section className="bg-[#002147] py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 font-serif">자주 묻는 질문</h1>
          <p className="opacity-60">궁금하신 사항을 카테고리별로 확인하실 수 있습니다.</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 -mt-10">
        <div className="bg-white rounded-3xl shadow-xl p-4 mb-8 flex items-center gap-4 border border-slate-100">
           <Search size={20} className="text-slate-400 ml-4" />
           <input type="text" placeholder="검색어를 입력하세요" className="flex-grow py-4 focus:outline-none text-lg" />
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-8">
           {categories.map(cat => (
             <button
               key={cat}
               onClick={() => setSelectedCategory(cat)}
               className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition border ${
                 selectedCategory === cat 
                 ? 'bg-[#D4AF37] text-white border-[#D4AF37]' 
                 : 'bg-white text-slate-500 border-slate-100 hover:border-slate-200 shadow-sm'
               }`}
             >
               {cat}
             </button>
           ))}
        </div>

        <div className="space-y-4">
          {filteredFAQs.map(faq => (
            <div key={faq.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
              <button 
                className="w-full p-6 text-left flex justify-between items-center group"
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
              >
                <div className="flex items-center gap-4">
                  <span className="text-[#D4AF37] text-xs font-black uppercase tracking-widest">{faq.category}</span>
                  <span className="font-bold text-slate-800 group-hover:text-[#002147] transition">{faq.question}</span>
                </div>
                {openId === faq.id ? <ChevronUp className="text-slate-300" /> : <ChevronDown className="text-slate-300" />}
              </button>
              {openId === faq.id && (
                <div className="px-6 pb-8 pt-2">
                  <div className="bg-slate-50 p-6 rounded-xl text-slate-600 leading-relaxed text-[15px] border-l-4 border-[#D4AF37]">
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-20 bg-white p-12 rounded-[2rem] border border-slate-100 text-center shadow-sm">
           <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <HelpCircle size={32} className="text-[#D4AF37]" />
           </div>
           <h3 className="text-xl font-bold text-[#002147] mb-2">원하시는 답을 찾지 못하셨나요?</h3>
           <p className="text-slate-500 mb-8">전문 상담사가 1:1로 친절하게 안내해 드립니다.</p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:01027873456" className="bg-[#002147] text-white px-8 py-4 rounded-xl font-bold">전화 상담하기</a>
              <button className="border border-slate-100 text-slate-600 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition">1:1 문의 남기기</button>
           </div>
        </div>
      </div>
    </div>
  );
};
