
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, TrendingUp, AlertCircle, ShieldCheck } from 'lucide-react';
import { AuctionItem } from '../types';

interface AuctionCardProps {
  item: AuctionItem;
}

export const AuctionCard: React.FC<AuctionCardProps> = ({ item }) => {
  const formatKRW = (val: number) => (val / 100000000).toFixed(1) + '억원';
  
  const riskBadge = {
    safe: <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1"><ShieldCheck size={12}/> 안전</span>,
    caution: <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1"><AlertCircle size={12}/> 주의</span>,
    danger: <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1"><AlertCircle size={12}/> 위험</span>
  };

  return (
    <Link to={`/auctions/${item.id}`} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100">
      <div className="relative h-48 overflow-hidden">
        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-[#002147] text-white px-2 py-1 rounded text-xs font-bold">{item.status}</span>
          <span className="bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-medium">{item.propertyType}</span>
        </div>
        <div className="absolute top-3 right-3">
          {riskBadge[item.riskLevel]}
        </div>
      </div>
      
      <div className="p-5">
        <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase">{item.caseNumber}</div>
        <h3 className="font-bold text-lg text-slate-900 mb-2 truncate group-hover:text-[#D4AF37] transition">{item.title}</h3>
        
        <div className="flex items-center gap-1 text-slate-500 text-xs mb-4">
          <MapPin size={12} />
          <span className="truncate">{item.location}</span>
        </div>

        <div className="space-y-2 border-t border-slate-50 pt-4">
          <div className="flex justify-between items-end">
            <span className="text-slate-400 text-xs">감정가</span>
            <span className="text-slate-600 font-medium">{formatKRW(item.appraisalValue)}</span>
          </div>
          <div className="flex justify-between items-end">
            <span className="text-slate-400 text-xs font-bold">최저가</span>
            <span className="text-red-600 font-bold text-lg">{formatKRW(item.minimumBidPrice)}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400 font-medium">
          <div className="flex items-center gap-1"><Calendar size={12}/> {item.auctionDate}</div>
          <div className="flex items-center gap-1"><TrendingUp size={12}/> 72% 낙찰예상</div>
        </div>
      </div>
    </Link>
  );
};
