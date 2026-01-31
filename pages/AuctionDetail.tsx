
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockAuctions } from '../data/mockData';
import { MapPin, Calendar, CheckCircle2, AlertCircle, Info, Calculator, Download, Share2, Phone, Zap, Star, ShieldCheck } from 'lucide-react';

export const AuctionDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const auction = mockAuctions.find(a => a.id === id);
  const [bidPrice, setBidPrice] = useState(auction?.minimumBidPrice || 0);
  const [expectedRent, setExpectedRent] = useState(50000000);

  if (!auction) {
    return (
      <div className="py-20 text-center bg-white min-h-screen">
        <h2 className="text-2xl font-bold">물건을 찾을 수 없습니다.</h2>
        <button onClick={() => navigate('/auctions')} className="mt-4 text-[#002147] underline">목록으로 돌아가기</button>
      </div>
    );
  }

  const roi = (((expectedRent * 12) / bidPrice) * 100).toFixed(2);
  const formatKRW = (val: number) => (val / 100000000).toFixed(2) + '억원';

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header Info */}
      <div className="bg-white border-b border-slate-100 pt-10 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="bg-[#002147] text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest">{auction.status}</span>
                <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">{auction.caseNumber}</span>
              </div>
              <h1 className="text-3xl font-bold text-[#002147] leading-tight">{auction.title}</h1>
              <div className="flex items-center gap-1 text-slate-500 text-sm">
                <MapPin size={16} /> {auction.location}
              </div>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button className="flex-grow md:flex-grow-0 p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition flex justify-center"><Share2 size={20}/></button>
              <button className="flex-grow md:flex-grow-0 bg-[#002147] text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-900 transition flex items-center justify-center gap-2 shadow-lg shadow-slate-100">
                <Phone size={18} /> 실시간 유선 상담
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-10">
          {/* Main Photo & Sub Photos */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-9 rounded-2xl overflow-hidden h-[450px] shadow-sm">
              <img src={auction.imageUrl} className="w-full h-full object-cover" alt="Main" />
            </div>
            <div className="hidden md:flex md:col-span-3 flex-col gap-4">
               <img src="https://picsum.photos/id/111/400/400" className="rounded-xl h-[140px] object-cover shadow-sm border border-slate-100" alt="Sub 1" />
               <img src="https://picsum.photos/id/112/400/400" className="rounded-xl h-[140px] object-cover shadow-sm border border-slate-100" alt="Sub 2" />
               <div className="relative rounded-xl h-[138px] overflow-hidden shadow-sm border border-slate-100">
                  <img src="https://picsum.photos/id/113/400/400" className="w-full h-full object-cover" alt="Sub 3" />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-sm">+8 더보기</div>
               </div>
            </div>
          </div>

          {/* Smart Score Panel */}
          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="text-center md:border-r border-slate-100 pr-8">
                <div className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">투자 매력도</div>
                <div className="flex items-center justify-center gap-1 text-[#D4AF37] mb-2">
                   <Star fill="currentColor" size={20}/>
                   <Star fill="currentColor" size={20}/>
                   <Star fill="currentColor" size={20}/>
                   <Star fill="currentColor" size={20}/>
                   <Star size={20} className="opacity-30"/>
                </div>
                <div className="text-3xl font-bold text-[#002147]">8.4 / 10</div>
             </div>
             <div className="col-span-2">
                <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm">
                  <Zap size={16} className="text-[#D4AF37]"/> JB 스마트 요약
                </h4>
                <div className="flex flex-wrap gap-2">
                   <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">#단기차익형</span>
                   <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold">#권리안전</span>
                   <span className="bg-slate-50 text-slate-500 px-3 py-1 rounded-full text-xs font-bold">#명도난이도 하</span>
                   <span className="bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-xs font-bold">#1회유찰됨</span>
                </div>
             </div>
          </div>

          {/* Details Table */}
          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm space-y-8">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">감정가</div>
                  <div className="text-lg font-bold text-slate-900">{formatKRW(auction.appraisalValue)}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-red-400 uppercase tracking-widest">최저가</div>
                  <div className="text-lg font-bold text-red-600">{formatKRW(auction.minimumBidPrice)}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">매각기일</div>
                  <div className="text-lg font-bold text-slate-900">{auction.auctionDate}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">유찰횟수</div>
                  <div className="text-lg font-bold text-slate-900">1회</div>
                </div>
             </div>
             
             <div className="pt-8 border-t border-slate-100">
               <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Zap size={20} className="text-[#D4AF37]"/> JB 스마트 권리분석</h3>
               <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="font-bold text-sm text-slate-700">말소기준권리</span>
                    <span className="text-slate-600 text-sm">2021-05-10 근저당 (신한은행) - 모두 소멸</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="font-bold text-sm text-slate-700">임차인 인수 위험</span>
                    <span className="text-emerald-600 flex items-center gap-1 font-bold text-sm">위험 요소 없음 <CheckCircle2 size={16}/></span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                    <span className="font-bold text-sm text-emerald-800">최종 분석 결과</span>
                    <span className="text-emerald-800 flex items-center gap-1 font-bold text-sm uppercase tracking-widest">SAFE TO BID</span>
                  </div>
               </div>
             </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl sticky top-28">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Calculator size={20} className="text-[#D4AF37]"/> 수익률 시뮬레이션</h3>
            
            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest">예상 낙찰가</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={bidPrice}
                    onChange={(e) => setBidPrice(Number(e.target.value))}
                    className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-xl focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/20" 
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">원</span>
                </div>
              </div>
              
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest">예상 월세/전세수익</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={expectedRent}
                    onChange={(e) => setExpectedRent(Number(e.target.value))}
                    className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-xl focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/20" 
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">원</span>
                </div>
              </div>
            </div>

            <div className="bg-[#002147] rounded-2xl p-6 text-white mb-8 shadow-md">
              <div className="text-[10px] opacity-50 mb-2 uppercase tracking-widest font-bold">예상 연 수익률 (세전)</div>
              <div className="text-4xl font-bold text-[#D4AF37]">{roi}%</div>
            </div>

            <button className="w-full bg-[#D4AF37] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#b8962f] transition shadow-lg shadow-amber-900/10 mb-6 active:scale-95">
              입찰대행 의뢰하기
            </button>
            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck size={14} className="text-[#D4AF37]"/> 전문가 책임 권리분석 보증 포함
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
