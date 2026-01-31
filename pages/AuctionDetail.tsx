
import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockAuctions } from '../data/mockData';
import { MapPin, Calendar, CheckCircle2, AlertCircle, Info, Calculator, Download, Share2, Phone, Zap, Star, ShieldCheck, TrendingUp, DollarSign, Hammer, UserMinus } from 'lucide-react';

export const AuctionDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const auction = mockAuctions.find(a => a.id === id);

  // States for Calculator
  const [bidPrice, setBidPrice] = useState(auction?.minimumBidPrice || 0);
  const [expectedRentDeposit, setExpectedRentDeposit] = useState(50000000); // 전세금 또는 보증금
  const [monthlyRent, setMonthlyRent] = useState(1500000); // 월세
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

  // Derived Calculations
  const taxRate = bidPrice > 600000000 ? 0.033 : 0.011; // 단순화된 취득세율 (실제는 더 복잡함)
  const acquisitionTax = Math.floor(bidPrice * taxRate);
  const totalInvestment = bidPrice + acquisitionTax + repairCost + evictionCost;
  const netInvestment = totalInvestment - expectedRentDeposit; // 전세/보증금 제외 실투자금
  
  const annualProfit = monthlyRent * 12;
  const roi = netInvestment > 0 ? ((annualProfit / netInvestment) * 100).toFixed(2) : "0.00";

  const formatKRW = (val: number) => {
    if (val >= 100000000) {
      return (val / 100000000).toFixed(2) + '억원';
    }
    return (val / 10000).toLocaleString() + '만원';
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header Info */}
      <div className="bg-white border-b border-slate-100 pt-10 pb-8">
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
          {/* Main Photo */}
          <div className="rounded-3xl overflow-hidden h-[500px] shadow-2xl relative group">
            <img src={auction.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt="Main" />
            <div className="absolute bottom-6 right-6 flex gap-2">
               <button className="bg-white/90 backdrop-blur text-[#002147] px-4 py-2 rounded-xl text-xs font-bold shadow-lg flex items-center gap-2">
                 <Download size={14}/> 법원 공고문 다운로드
               </button>
            </div>
          </div>

          {/* Analysis Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
                <ShieldCheck className="text-emerald-600 mb-3" size={24} />
                <div className="text-xs font-bold text-emerald-800 uppercase mb-1">권리 안전도</div>
                <div className="text-xl font-black text-emerald-900">SAFE</div>
                <p className="text-[11px] text-emerald-700 mt-2">말소기준권리 이후 모든 권리 소멸 확인됨</p>
             </div>
             <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
                <TrendingUp className="text-blue-600 mb-3" size={24} />
                <div className="text-xs font-bold text-blue-800 uppercase mb-1">예상 경쟁률</div>
                <div className="text-xl font-black text-blue-900">NORMAL (4~6명)</div>
                <p className="text-[11px] text-blue-700 mt-2">인근 유사 물건 최근 낙찰 통계 기반</p>
             </div>
             <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100">
                <UserMinus className="text-amber-600 mb-3" size={24} />
                <div className="text-xs font-bold text-amber-800 uppercase mb-1">명도 난이도</div>
                <div className="text-xl font-black text-amber-900">{auction.isOccupiedByOwner ? 'LOW' : 'MEDIUM'}</div>
                <p className="text-[11px] text-amber-700 mt-2">{auction.isOccupiedByOwner ? '소유주 직접 점유 중으로 명도 용이' : '임차인 거주 중으로 협상 필요'}</p>
             </div>
          </div>

          {/* Detailed Specs */}
          <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-sm">
             <h3 className="text-2xl font-bold mb-8 text-[#002147]">상세 물건 정보</h3>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10">
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">감정가</div>
                  <div className="text-lg font-bold">{formatKRW(auction.appraisalValue)}</div>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-red-400 uppercase tracking-widest mb-1">최저매각가</div>
                  <div className="text-lg font-bold text-red-600">{formatKRW(auction.minimumBidPrice)}</div>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">보증금 (10%)</div>
                  <div className="text-lg font-bold">{formatKRW(auction.minimumBidPrice * 0.1)}</div>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">입찰 기일</div>
                  <div className="text-lg font-bold">{auction.auctionDate}</div>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">토지/건물 면적</div>
                  <div className="text-sm font-bold">84.9㎡ / 114.5㎡</div>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">건물 층수</div>
                  <div className="text-sm font-bold">25층 중 12층</div>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">보존 등기일</div>
                  <div className="text-sm font-bold">2010.05.20</div>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">점유 관계</div>
                  <div className="text-sm font-bold">{auction.isOccupiedByOwner ? '채무자(소유자)' : '임차인'}</div>
                </div>
             </div>
             
             <div className="mt-12 pt-10 border-t border-slate-100">
                <h4 className="font-bold text-[#002147] mb-4">전문가 한줄평</h4>
                <blockquote className="bg-slate-50 p-6 rounded-2xl border-l-4 border-[#D4AF37] text-slate-600 italic">
                  "{auction.description}"
                </blockquote>
             </div>
          </div>
        </div>

        {/* Sidebar: Calculator */}
        <div className="space-y-6">
          <div className="bg-[#002147] rounded-[2.5rem] p-8 text-white shadow-2xl sticky top-28 border border-white/5">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#D4AF37] rounded-xl flex items-center justify-center text-[#002147]">
                <Calculator size={20} />
              </div>
              <h3 className="text-xl font-bold tracking-tight">정밀 수익률 계산기</h3>
            </div>
            
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest">나의 입찰가</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={bidPrice}
                    onChange={(e) => setBidPrice(Number(e.target.value))}
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50" 
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-xs">KRW</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest">예상 수리비</label>
                    <input 
                      type="number" 
                      value={repairCost}
                      onChange={(e) => setRepairCost(Number(e.target.value))}
                      className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 font-bold text-sm" 
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest">예상 명도비</label>
                    <input 
                      type="number" 
                      value={evictionCost}
                      onChange={(e) => setEvictionCost(Number(e.target.value))}
                      className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 font-bold text-sm" 
                    />
                 </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                 <div className="flex justify-between text-xs mb-2 opacity-60">
                    <span>취등록세(예상)</span>
                    <span>{formatKRW(acquisitionTax)}</span>
                 </div>
                 <div className="flex justify-between font-bold text-sm">
                    <span>총 소요 자금</span>
                    <span className="text-[#D4AF37]">{formatKRW(totalInvestment)}</span>
                 </div>
              </div>

              <div className="pt-8 space-y-4">
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="text-[10px] font-bold text-white/40 mb-1">연간 수익률 (월세 {formatKRW(monthlyRent)} 기준)</div>
                    <div className="text-3xl font-black text-[#D4AF37]">{roi}%</div>
                    <div className="text-[10px] text-white/30 mt-1">실투자금: {formatKRW(netInvestment)}</div>
                 </div>
              </div>

              <button className="w-full bg-[#D4AF37] text-[#002147] py-5 rounded-2xl font-bold text-lg hover:bg-white transition-all shadow-xl shadow-amber-900/40 active:scale-95">
                대리입찰 신청하기
              </button>
              
              <p className="text-[10px] text-white/30 text-center leading-relaxed">
                위 계산 결과는 단순 시뮬레이션이며, <br/>
                실제 취등록세 및 대출 한도는 다를 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
