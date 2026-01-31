
import React from 'react';
import { Search, ChevronRight, Calculator, FileText, CheckCircle2, TrendingUp, Paintbrush, Zap, Trophy, ShieldCheck, Map, ArrowRight, Building2, PhoneCall, Users, Star } from 'lucide-react';
import { mockAuctions, mockReviews } from '../data/mockData';
import { AuctionCard } from '../components/AuctionCard';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  // 후기를 날짜 역순(최신순)으로 정렬 후 상위 9개 추출
  const featuredReviews = [...mockReviews]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 9);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[700px] flex items-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-[#00152e]">
           <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover opacity-40 mix-blend-overlay" alt="Hero background" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 w-full text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold mb-8 border border-white/20 mx-auto">
              <Zap size={14} className="text-[#D4AF37]" /> 실시간 스마트 권리분석 엔진 탑재
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8 font-serif">
              당신의 부동산 투자,<br />
              <span className="text-[#D4AF37]">JB 하우징</span>이 완성합니다
            </h1>
            <p className="text-xl md:text-2xl opacity-80 mb-12 leading-relaxed font-light max-w-2xl mx-auto">
              전국 법원 경매 물건의 완벽한 권리분석과<br/>
              최적의 입찰 전략으로 성공적인 낙찰을 약속드립니다.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/consult" className="w-full sm:w-72 bg-[#D4AF37] text-white px-8 py-5 rounded-2xl font-bold text-xl hover:bg-[#b8962f] transition-all hover:translate-y-[-4px] flex items-center justify-center gap-3 shadow-2xl shadow-amber-900/40">
                입찰대행 신청 <Zap size={22} />
              </Link>
              <Link to="/experts" className="w-full sm:w-72 bg-white text-[#002147] px-8 py-5 rounded-2xl font-bold text-xl hover:bg-slate-100 transition-all hover:translate-y-[-4px] flex items-center justify-center gap-3 shadow-2xl shadow-black/20">
                전문가 서비스 신청 <Users size={22} />
              </Link>
            </div>

            <div className="mt-12 flex justify-center gap-8 text-sm opacity-60">
              <Link to="/auctions" className="hover:text-[#D4AF37] transition flex items-center gap-1 border-b border-white/20 pb-1">
                실시간 경매 물건 검색 <Search size={14} />
              </Link>
              <Link to="/services" className="hover:text-[#D4AF37] transition flex items-center gap-1 border-b border-white/20 pb-1">
                서비스 이용 안내 <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Quick Filters */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/auctions?theme=beginner" className="flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-slate-50 transition group">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition shadow-sm"><Trophy size={24}/></div>
            <span className="text-base font-bold text-slate-700">초보 추천물건</span>
          </Link>
          <Link to="/auctions?theme=high-yield" className="flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-slate-50 transition group">
            <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center group-hover:scale-110 transition shadow-sm"><TrendingUp size={24}/></div>
            <span className="text-base font-bold text-slate-700">고수익 소액투자</span>
          </Link>
          <Link to="/auctions?theme=apt" className="flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-slate-50 transition group">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center group-hover:scale-110 transition shadow-sm"><Building2 size={24}/></div>
            <span className="text-base font-bold text-slate-700">아파트/주택</span>
          </Link>
          <Link to="/experts" className="flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-slate-50 transition group">
            <div className="w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center group-hover:scale-110 transition shadow-sm"><Users size={24}/></div>
            <span className="text-base font-bold text-slate-700">지역 전문가 찾기</span>
          </Link>
        </div>
      </div>

      {/* Featured Auctions */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-[#002147] mb-2 flex items-center gap-3">
                <Zap size={28} className="text-[#D4AF37]"/> 금주 추천 매물
              </h2>
              <p className="text-slate-500">JB 하우징 전문가팀이 꼼꼼하게 검수한 핵심 매물입니다.</p>
            </div>
            <Link to="/auctions" className="text-[#002147] font-bold hover:underline flex items-center gap-1 text-sm">
              전체 물건 보기 <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockAuctions.slice(0, 4).map(item => (
              <AuctionCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 bg-[#00152e] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold font-serif mb-2">Success Stories</h2>
              <p className="opacity-50 text-sm">최근 성공 투자를 이룬 고객님들의 생생한 후기</p>
            </div>
            <Link to="/reviews" className="bg-[#D4AF37] text-[#002147] px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-white transition flex items-center gap-2">
              모든 후기 보기 ({mockReviews.length}) <ChevronRight size={14}/>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredReviews.map(review => (
              <div key={review.id} className="bg-white/5 p-8 rounded-[2rem] border border-white/10 hover:border-[#D4AF37]/50 transition group flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center font-bold text-white text-xl">
                      {review.author[0]}
                    </div>
                    <div>
                      <div className="font-bold group-hover:text-[#D4AF37] transition">{review.author}</div>
                      <div className="text-[10px] opacity-50 flex items-center gap-1">
                        <Star size={10} fill="#D4AF37" className="text-[#D4AF37]" /> {review.propertyTitle}
                      </div>
                    </div>
                  </div>
                  <p className="text-base italic mb-8 opacity-70 leading-relaxed line-clamp-4">"{review.content}"</p>
                </div>
                <div className="flex justify-between items-center pt-6 border-t border-white/10 mt-auto">
                  <div className="text-[10px] opacity-30 uppercase tracking-widest">{review.date}</div>
                  <div className="text-[#D4AF37] font-black text-xs bg-[#D4AF37]/10 px-3 py-1 rounded-full">실수익 {review.profitAmount}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link to="/reviews" className="inline-flex items-center gap-3 text-white border border-white/20 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-[#002147] transition shadow-xl">
              {mockReviews.length}개의 성공 사례 전체 보기 <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Bidding Process */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#002147] mb-4">입찰대행 서비스 절차</h2>
            <p className="text-slate-500">투명하고 안전하게, JB 하우징이 끝까지 함께합니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { step: '01', title: '상담 및 신청', desc: '물건 선정 및 유선 상담' },
              { step: '02', title: '정밀 권리분석', desc: '서류 및 현장 조사' },
              { step: '03', title: '입찰 전략 수립', desc: '최적 낙찰가 산정' },
              { step: '04', title: '입찰 대행', desc: '법원 동행 및 입찰 진행' },
              { step: '05', title: '낙찰 및 사후관리', desc: '명도 및 등기 이전' },
            ].map((item, idx) => (
              <div key={idx} className="relative bg-white p-6 rounded-2xl border border-slate-200 text-center flex flex-col items-center">
                <div className="text-[10px] font-bold text-[#D4AF37] mb-2 uppercase tracking-widest">Step {item.step}</div>
                <h4 className="font-bold text-slate-800 mb-2">{item.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                {idx < 4 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-300">
                    <ArrowRight size={20} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
         <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-[#002147] mb-6">당신의 투자가 가치가 되도록</h2>
            <p className="text-slate-600 mb-10 text-lg max-w-2xl mx-auto">김종필 대표와 JB 하우징의 전문가들이 당신의 자산을 안전하게 증식시켜 드립니다.</p>
            <Link to="/consult" className="inline-flex items-center gap-3 bg-[#002147] text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-[#002d61] transition shadow-xl shadow-slate-200">
              <PhoneCall className="w-6 h-6" /> 지금 바로 무료 상담받기
            </Link>
         </div>
      </section>
    </div>
  );
};
