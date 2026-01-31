
import React, { useState } from 'react';
import { mockReviews } from '../data/mockData';
import { Star, ChevronRight, MessageSquare, TrendingUp, Calendar, User, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ReviewList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReviews = mockReviews.filter(review => 
    review.author.includes(searchTerm) || 
    review.propertyTitle.includes(searchTerm) ||
    review.content.includes(searchTerm)
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header Section */}
      <section className="bg-[#002147] py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <TrendingUp className="w-full h-full text-[#D4AF37]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#002147] mb-6 shadow-lg shadow-amber-900/20">
            <Star size={14} fill="currentColor" /> Success Stories
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-serif">낙찰 성공 사례 리스트</h1>
          <p className="text-lg opacity-70 max-w-2xl mx-auto leading-relaxed">
            JB 하우징과 함께한 25명의 실제 고객들의 생생한 낙찰 후기와 <br className="hidden md:block"/>
            투명한 수익 실현 데이터를 확인하세요.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl p-4 flex flex-col md:flex-row gap-4 border border-slate-100 items-center">
          <div className="flex-grow relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="아파트명, 작성자, 내용으로 검색..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 text-sm font-medium"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button className="flex-grow md:flex-grow-0 px-6 py-4 bg-white border border-slate-200 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold text-slate-600 hover:bg-slate-50 transition">
              <Filter size={18} /> 필터링
            </button>
            <div className="px-6 py-4 bg-[#002147] text-white rounded-2xl flex items-center justify-center gap-2 text-sm font-bold shadow-lg shadow-blue-900/20 whitespace-nowrap">
              총 {filteredReviews.length}건의 성공담
            </div>
          </div>
        </div>
      </div>

      {/* Review List Content */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="space-y-6">
          {filteredReviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-white rounded-[2rem] p-8 md:p-10 border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col md:flex-row gap-8 items-start md:items-center"
            >
              {/* Profile/Badge Section */}
              <div className="flex flex-col items-center gap-4 shrink-0 w-full md:w-40 border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-8">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-[#002147] font-black text-2xl border-4 border-slate-50 group-hover:border-[#D4AF37]/30 transition">
                  {review.author[0]}
                </div>
                <div className="text-center">
                  <div className="font-bold text-[#002147] text-base">{review.author}</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Verified Member</div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-grow space-y-4">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <h3 className="text-xl font-black text-[#002147] group-hover:text-[#D4AF37] transition">{review.propertyTitle}</h3>
                  <div className="flex items-center gap-0.5 text-[#D4AF37]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} stroke="currentColor" />
                    ))}
                  </div>
                </div>
                
                <p className="text-slate-600 leading-relaxed text-[15px] font-medium line-clamp-2 md:line-clamp-3 italic">
                  "{review.content}"
                </p>

                <div className="flex flex-wrap items-center gap-6 pt-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-bold">
                    <Calendar size={14} /> {review.date}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-emerald-500 font-black bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                    <TrendingUp size={14} /> 실수익 {review.profitAmount}
                  </div>
                </div>
              </div>

              {/* Action Section */}
              <div className="shrink-0 w-full md:w-auto mt-4 md:mt-0">
                <Link to="/consult" className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-slate-50 text-slate-700 px-8 py-4 rounded-2xl font-bold text-sm hover:bg-[#D4AF37] hover:text-white transition-all shadow-sm">
                  비슷한 물건 찾기 <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredReviews.length === 0 && (
          <div className="py-32 text-center bg-white rounded-[3rem] border border-dashed border-slate-200">
            <MessageSquare size={64} className="mx-auto text-slate-200 mb-6" />
            <h3 className="text-xl font-bold text-slate-400">검색 결과가 없습니다.</h3>
            <button onClick={() => setSearchTerm('')} className="mt-4 text-[#D4AF37] font-bold hover:underline">필터 초기화</button>
          </div>
        )}
      </section>
    </div>
  );
};
