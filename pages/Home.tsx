
import React from 'react';
import { Search, ChevronRight, Calculator, FileText, CheckCircle2, TrendingUp, Paintbrush, Zap, Trophy, ShieldCheck, Map, ArrowRight, Building2, PhoneCall, Users, Star, Sparkles, Scale } from 'lucide-react';
import { mockAuctions, mockReviews } from '../data/mockData';
import { AuctionCard } from '../components/AuctionCard';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
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
          </div>
        </div>
      </section>

      {/* AI Analysis Promotion Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#D4AF37]/5 blur-[120px] rounded-full"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-2xl border border-slate-100 flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 bg-[#002147] text-[#D4AF37] px-4 py-2 rounded-full text-xs font-bold mb-8 shadow-xl">
                <Sparkles size={16} /> PREMIUM AI SERVICE
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#002147] mb-8 font-serif leading-tight">
                대법원 실시간 연동<br/>
                <span className="text-[#D4AF37]">AI 권리분석 리포트</span>
              </h2>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                복잡한 경매 서류를 읽지 마세요. 인공지능이 전국 법원 공고 데이터를 실시간으로 분석하여 <br className="hidden md:block"/> 
                <strong>핵심 권리 관계, 예상 낙찰가 가이드, 투자 리스크</strong>를 단 10초 만에 요약해 드립니다.
              </p>
              
              <Link to="/ai-analysis" className="inline-flex items-center gap-3 bg-[#002147] text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-slate-900 transition-all shadow-2xl shadow-blue-900/20 active:scale-95 group">
                AI 분석 시작하기 <ArrowRight className="group-hover:translate-x-2 transition" />
              </Link>
              <div className="mt-6 text-sm text-slate-400 font-medium">
                * 1회 분석 시 10,000포인트가 차감됩니다.
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
               <div className="relative bg-slate-900 rounded-[2.5rem] p-8 border border-white/10 shadow-2xl overflow-hidden">
                  <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                     <div className="flex items-center gap-2 text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">
                        <Zap size={14} /> AI 분석 미리보기
                     </div>
                     <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  </div>
                  <div className="space-y-4 opacity-80">
                    <div className="h-4 bg-white/10 rounded-full w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-white/10 rounded-full w-full animate-pulse delay-75"></div>
                    <div className="h-4 bg-white/10 rounded-full w-5/6 animate-pulse delay-150"></div>
                  </div>
                  <div className="mt-10 p-6 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/30">
                     <p className="text-[#D4AF37] text-xs font-bold leading-relaxed italic">
                       "사건번호 2024타경 1234 분석 결과: 본 매물은 대항력 있는 임차인이 없으며, 등기부상 모든 권리가 낙찰 후 소멸되는 안전한 물건입니다..."
                     </p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Filters */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/auctions" className="flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-slate-50 transition group text-center">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition shadow-sm"><Search size={24}/></div>
            <span className="text-base font-bold text-slate-700">전체 경매찾기</span>
          </Link>
          <Link to="/auctions" className="flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-slate-50 transition group text-center">
            <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center group-hover:scale-110 transition shadow-sm"><TrendingUp size={24}/></div>
            <span className="text-base font-bold text-slate-700">고수익 소액투자</span>
          </Link>
          <Link to="/auctions" className="flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-slate-50 transition group text-center">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center group-hover:scale-110 transition shadow-sm"><Building2 size={24}/></div>
            <span className="text-base font-bold text-slate-700">아파트/주택</span>
          </Link>
          <Link to="/experts" className="flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-slate-50 transition group text-center">
            <div className="w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center group-hover:scale-110 transition shadow-sm"><Users size={24}/></div>
            <span className="text-base font-bold text-slate-700">지역 전문가 찾기</span>
          </Link>
        </div>
      </div>

      {/* Featured Auctions */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-bold text-[#002147] mb-2">실시간 추천 매물</h2>
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
    </div>
  );
};
