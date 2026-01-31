
import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { mockAuctions } from '../data/mockData';
// Added ArrowRight to imports
import { MapPin, Calendar, CheckCircle2, AlertCircle, Info, Calculator, Download, Share2, Phone, Zap, Star, ShieldCheck, TrendingUp, DollarSign, Hammer, UserMinus, ExternalLink, Globe, Layout, Maximize2, Layers, Building, Landmark, History, FileSearch, ClipboardCheck, ArrowRightLeft, ArrowRight } from 'lucide-react';
import { AuctionItem } from '../types';

export const AuctionDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const auctionFromState = location.state?.auctionData as AuctionItem | undefined;
  const auctionFromMock = mockAuctions.find(a => a.id === id);
  const auction = auctionFromState || auctionFromMock;

  const [bidPrice, setBidPrice] = useState(auction?.minimumBidPrice || 0);
  const [expectedRentDeposit, setExpectedRentDeposit] = useState(50000000); 
  const [monthlyRent, setMonthlyRent] = useState(1500000); 
  const [repairCost, setRepairCost] = useState(auction?.expectedRepairCost || 10000000);
  const [evictionCost, setEvictionCost] = useState(auction?.expectedEvictionCost || 5000000);

  if (!auction) {
    return (
      <div className="py-20 text-center bg-white min-h-screen">
        <h2 className="text-2xl font-bold">물건을 찾을 수 없습니다.</h2>
        <button onClick={() => navigate('/auctions')} className="mt-4 text-[#002147] underline">목록으로 돌아가기</button>
      </div>
    );
  }

  const taxRate = bidPrice > 600000000 ? 0.033 : 0.011; 
  const acquisitionTax = Math.floor(bidPrice * taxRate);
  const totalInvestment = bidPrice + acquisitionTax + repairCost + evictionCost;
  const netInvestment = totalInvestment - expectedRentDeposit; 
  
  const annualProfit = monthlyRent * 12;
  const roi = netInvestment > 0 ? ((annualProfit / netInvestment) * 100).toFixed(2) : "0.00";

  const formatKRW = (val: number) => {
    if (val >= 100000000) {
      return (val / 100000000).toFixed(2) + '억원';
    }
    return (val / 10000).toLocaleString() + '만원';
  };

  const handleDownloadNotice = () => {
    const baseUrl = "https://www.courtauction.go.kr/";
    window.open(auction.externalUrl || baseUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header Info */}
      <div className="bg-white border-b border-slate-100 pt-10 pb-8 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="bg-[#002147] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">{auction.status}</span>
                <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">{auction.caseNumber}</span>
              </div>
              <h1 className="text-3xl font-bold text-[#002147] leading-tight">{auction.title}</h1>
              <div className="flex items-center gap-1 text-slate-500 text-sm">
                <MapPin size={16} /> {auction.location}
              </div>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button className="flex-grow md:flex-grow-0 p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition flex justify-center"><Share2 size={20}/></button>
              {auction.externalUrl && (
                <a 
                  href={auction.externalUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex-grow md:flex-grow-0 bg-slate-100 text-[#002147] px-6 py-4 rounded-xl font-bold hover:bg-slate-200 transition flex items-center justify-center gap-2 border border-slate-200"
                >
                  <Globe size={18} /> 공식 공고 확인
                </a>
              )}
              <a href="tel:063-715-1213" className="flex-grow md:flex-grow-0 bg-[#002147] text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-900 transition flex items-center justify-center gap-2 shadow-lg shadow-slate-100">
                <Phone size={18} /> 실시간 유선 상담
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-10">
          {/* Main Photo Section */}
          <div className="space-y-4">
            <div className="rounded-3xl overflow-hidden h-[500px] shadow-2xl relative group">
              <img src={auction.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt="Main" />
              <div className="absolute bottom-6 right-6 flex gap-2">
                 <button 
                  onClick={handleDownloadNotice}
                  className="bg-white/90 backdrop-blur text-[#002147] px-4 py-2 rounded-xl text-xs font-bold shadow-lg flex items-center gap-2 hover:bg-white transition active:scale-95"
                 >
                   <Download size={14}/> 법원 공고문 다운로드
                 </button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer hover:opacity-80 transition">
                  <img src={auction.imageUrl} className="w-full h-full object-cover grayscale-[0.5]" alt={`Sub ${i}`} />
                </div>
              ))}
            </div>
          </div>

          {/* 세부 물건 명세표 (NEW & EXTENDED) */}
          <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm overflow-hidden relative">
             <div className="absolute top-0 left-0 w-2 h-full bg-[#D4AF37]"></div>
             <h3 className="text-2xl font-black mb-10 text-[#002147] flex items-center gap-3">
               <ClipboardCheck className="text-[#D4AF37]" size={28} /> 법원 정밀 물건 제원표
             </h3>
             
             <div className="space-y-12">
               {/* Section: 기본 사건 정보 */}
               <div>
                 <div className="flex items-center gap-2 mb-6 text-sm font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">
                   <Landmark size={16} /> 사건 및 관할 정보
                 </div>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                   <div className="p-5 bg-slate-50 rounded-2xl">
                     <div className="text-[10px] text-slate-400 font-bold mb-1">관할법원</div>
                     <div className="font-bold text-[#002147]">전주지방법원 본원</div>
                   </div>
                   <div className="p-5 bg-slate-50 rounded-2xl">
                     <div className="text-[10px] text-slate-400 font-bold mb-1">담당계</div>
                     <div className="font-bold text-[#002147]">경매 5계 (063-715-XXXX)</div>
                   </div>
                   <div className="p-5 bg-slate-50 rounded-2xl">
                     <div className="text-[10px] text-slate-400 font-bold mb-1">사건종류</div>
                     <div className="font-bold text-[#002147]">강제/임의경매</div>
                   </div>
                   <div className="p-5 bg-slate-50 rounded-2xl">
                     <div className="text-[10px] text-slate-400 font-bold mb-1">입찰방법</div>
                     <div className="font-bold text-[#002147]">기일입찰</div>
                   </div>
                 </div>
               </div>

               {/* Section: 면적 상세 정보 */}
               <div>
                 <div className="flex items-center gap-2 mb-6 text-sm font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">
                   <Maximize2 size={16} /> 면적 및 층수 상세
                 </div>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                   <div className="p-5 border border-slate-100 rounded-2xl">
                     <div className="text-[10px] text-slate-400 font-bold mb-1">전용면적(실평수)</div>
                     <div className="font-bold text-[#002147]">84.98㎡ (25.7평)</div>
                   </div>
                   <div className="p-5 border border-slate-100 rounded-2xl">
                     <div className="text-[10px] text-slate-400 font-bold mb-1">공급면적</div>
                     <div className="font-bold text-[#002147]">112.4㎡ (34평형)</div>
                   </div>
                   <div className="p-5 border border-slate-100 rounded-2xl">
                     <div className="text-[10px] text-slate-400 font-bold mb-1">대지권 면적</div>
                     <div className="font-bold text-[#002147]">42.15㎡ (12.7평)</div>
                   </div>
                   <div className="p-5 border border-slate-100 rounded-2xl">
                     <div className="text-[10px] text-slate-400 font-bold mb-1">해당층 / 전체층</div>
                     <div className="font-bold text-[#002147]">12층 / 25층</div>
                   </div>
                 </div>
               </div>

               {/* Section: 가격 및 유찰 히스토리 */}
               <div>
                 <div className="flex items-center gap-2 mb-6 text-sm font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">
                   <History size={16} /> 가격 및 기일 히스토리
                 </div>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                   <div className="p-5 bg-slate-900 text-white rounded-2xl shadow-lg">
                     <div className="text-[10px] text-white/40 font-bold mb-1">현재 최저가</div>
                     <div className="text-xl font-black text-[#D4AF37]">{formatKRW(auction.minimumBidPrice)}</div>
                   </div>
                   <div className="p-5 bg-white border border-slate-100 rounded-2xl">
                     <div className="text-[10px] text-slate-400 font-bold mb-1">감정평가액</div>
                     <div className="font-bold text-[#002147]">{formatKRW(auction.appraisalValue)}</div>
                   </div>
                   <div className="p-5 bg-white border border-slate-100 rounded-2xl">
                     <div className="text-[10px] text-slate-400 font-bold mb-1">유찰 횟수</div>
                     <div className="font-bold text-red-600">1회 유찰 (20% 저감)</div>
                   </div>
                   <div className="p-5 bg-blue-50 border border-blue-100 rounded-2xl">
                     <div className="text-[10px] text-blue-400 font-bold mb-1">입찰보증금(10%)</div>
                     <div className="font-bold text-blue-700">{formatKRW(auction.minimumBidPrice * 0.1)}</div>
                   </div>
                 </div>
               </div>

               {/* Section: 권리분석 핵심 요약 */}
               <div>
                 <div className="flex items-center gap-2 mb-6 text-sm font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">
                   <FileSearch size={16} /> 권리분석 및 일정 핵심
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-4 p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                       <ShieldCheck className="text-emerald-600 shrink-0" size={32} />
                       <div>
                          <div className="text-[11px] font-bold text-emerald-800 uppercase">말소기준권리</div>
                          <div className="text-base font-bold text-emerald-900">2018-05-21 근저당 (신한은행)</div>
                          <div className="text-[10px] text-emerald-600 mt-1">이후 모든 권리 소멸 예정 (안전)</div>
                       </div>
                    </div>
                    <div className="flex items-center gap-4 p-6 bg-amber-50 rounded-2xl border border-amber-100">
                       <Calendar className="text-amber-600 shrink-0" size={32} />
                       <div>
                          <div className="text-[11px] font-bold text-amber-800 uppercase">배당요구종기일</div>
                          <div className="text-base font-bold text-amber-900">2024-03-12 (종료)</div>
                          <div className="text-[10px] text-amber-600 mt-1">임차인 배당 신청 여부 확인 완료</div>
                       </div>
                    </div>
                 </div>
               </div>
             </div>
             
             {/* Bottom Analysis Box */}
             <div className="mt-16 pt-10 border-t border-slate-100">
                <div className="flex items-center gap-2 mb-6">
                   <div className="w-1.5 h-6 bg-[#D4AF37] rounded-full"></div>
                   <h4 className="font-black text-[#002147] text-lg uppercase tracking-tight">전문가 물건 분석 소견</h4>
                </div>
                <div className="bg-slate-50 p-8 rounded-[2rem] text-slate-600 text-[15px] leading-relaxed relative">
                  <span className="absolute -top-4 -left-4 text-6xl text-slate-200 font-serif">"</span>
                  {auction.description || "상세 분석 내용이 준비 중입니다. 전문가 상담을 통해 확인하세요."}
                  <div className="mt-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#002147] rounded-full flex items-center justify-center text-white font-bold text-xs">JP</div>
                    <div>
                      <div className="text-xs font-bold text-[#002147]">김종필 대표 분석가</div>
                      <div className="text-[10px] text-slate-400 italic">2025.02.14 갱신됨</div>
                    </div>
                  </div>
                </div>
             </div>
          </div>

          {/* Analysis Quick Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-emerald-50 p-8 rounded-[2rem] border border-emerald-100 group hover:shadow-xl transition-all">
                <ShieldCheck className="text-emerald-600 mb-4 group-hover:scale-110 transition" size={28} />
                <div className="text-xs font-bold text-emerald-800 uppercase mb-1 tracking-widest">권리 안전도</div>
                <div className="text-2xl font-black text-emerald-900">{auction.riskLevel.toUpperCase()}</div>
                <p className="text-[11px] text-emerald-700 mt-3 leading-relaxed">AI 엔진이 등기부 기재 사항을 정밀 판독한 결과입니다.</p>
             </div>
             <div className="bg-blue-50 p-8 rounded-[2rem] border border-blue-100 group hover:shadow-xl transition-all">
                <TrendingUp className="text-blue-600 mb-4 group-hover:scale-110 transition" size={28} />
                <div className="text-xs font-bold text-blue-800 uppercase mb-1 tracking-widest">예상 경쟁률</div>
                <div className="text-2xl font-black text-blue-900">NORMAL (4~6명)</div>
                <p className="text-[11px] text-blue-700 mt-3 leading-relaxed">인근 유사 물건의 최근 3개월 낙찰 통계를 기반으로 합니다.</p>
             </div>
             <div className="bg-amber-50 p-8 rounded-[2rem] border border-amber-100 group hover:shadow-xl transition-all">
                <UserMinus className="text-amber-600 mb-4 group-hover:scale-110 transition" size={28} />
                <div className="text-xs font-bold text-amber-800 uppercase mb-1 tracking-widest">명도 난이도</div>
                <div className="text-2xl font-black text-amber-900">{auction.isOccupiedByOwner ? 'LOW' : 'MEDIUM'}</div>
                <p className="text-[11px] text-amber-700 mt-3 leading-relaxed">{auction.isOccupiedByOwner ? '소유주 직접 점유 중으로 명도가 매우 용이합니다.' : '임차인 거주 중으로 원만한 협의가 권장됩니다.'}</p>
             </div>
          </div>
        </div>

        {/* Sidebar: Calculator & Action */}
        <div className="space-y-6">
          <div className="bg-[#002147] rounded-[2.5rem] p-8 text-white shadow-2xl sticky top-28 border border-white/5">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#D4AF37] rounded-xl flex items-center justify-center text-[#002147]">
                <Calculator size={20} />
              </div>
              <h3 className="text-xl font-bold tracking-tight">수익률 시뮬레이터</h3>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest flex items-center gap-1">
                   <Hammer size={12} /> 나의 목표 입찰가
                </label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={bidPrice}
                    onChange={(e) => setBidPrice(Number(e.target.value))}
                    className="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-4 font-black text-xl text-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 transition" 
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 text-xs font-bold">KRW</span>
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-5 border border-white/5 space-y-4">
                 <div className="flex justify-between items-center text-xs">
                    <span className="text-white/40">취등록세 (예상)</span>
                    <span className="font-bold">{formatKRW(acquisitionTax)}</span>
                 </div>
                 <div className="flex justify-between items-center text-xs">
                    <span className="text-white/40">수리 및 명도 비용</span>
                    <span className="font-bold">{formatKRW(repairCost + evictionCost)}</span>
                 </div>
                 <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                    <span className="text-sm font-bold">총 소요 자금</span>
                    <span className="text-lg font-black text-[#D4AF37]">{formatKRW(totalInvestment)}</span>
                 </div>
              </div>

              <div className="pt-4">
                 <div className="p-6 bg-[#D4AF37]/10 rounded-[2rem] border border-[#D4AF37]/30 relative overflow-hidden text-center">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#D4AF37]/10 blur-2xl rounded-full"></div>
                    <div className="text-[10px] font-bold text-[#D4AF37] uppercase mb-2 tracking-widest">예상 세전 수익률 (ROI)</div>
                    <div className="text-4xl font-black text-[#D4AF37]">{roi}%</div>
                    <div className="text-[10px] text-white/40 mt-3 font-medium flex items-center justify-center gap-1">
                       <ArrowRightLeft size={10} /> 실투자금: {formatKRW(netInvestment)} 기준
                    </div>
                 </div>
              </div>

              <div className="space-y-3 pt-4">
                <button className="w-full bg-[#D4AF37] text-[#002147] py-5 rounded-2xl font-black text-lg hover:bg-white transition-all shadow-xl shadow-amber-900/40 active:scale-95 flex items-center justify-center gap-2">
                  대리입찰 신청하기 <ArrowRight size={20} />
                </button>
                <button className="w-full bg-white/5 border border-white/10 text-white/70 py-4 rounded-2xl font-bold text-sm hover:bg-white/10 transition flex items-center justify-center gap-2">
                  <Star size={16} /> 관심 물건 등록
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
