
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, TrendingUp, AlertCircle, ShieldCheck, ChevronRight } from 'lucide-react';
import { AuctionItem } from '../types';

interface AuctionCardProps {
  item: AuctionItem;
}

export const AuctionCard: React.FC<AuctionCardProps> = ({ item }) => {
  const [imgError, setImgError] = useState(false);
  
  const formatKRW = (val: number) => (val / 100000000).toFixed(1) + '억원';
  
  const getFallbackImage = (type: string) => {
    switch (type) {
      case '아파트':
        return 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800';
      case '상가':
        return 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=800';
      case '빌라':
        return 'https://images.unsplash.com/photo-1580587767526-cf38701be262?q=80&w=800';
      case '토지':
        return 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800';
      default:
        return 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800';
    }
  };

  const riskBadge = {
    safe: <span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full text-[10px] font-black flex items-center gap-1 border border-emerald-100 shadow-sm"><ShieldCheck size={12}/> 안전</span>,
    caution: <span className="bg-amber-50 text-amber-600 px-2.5 py-1 rounded-full text-[10px] font-black flex items-center gap-1 border border-amber-100 shadow-sm"><AlertCircle size={12}/> 주의</span>,
    danger: <span className="bg-rose-50 text-rose-600 px-2.5 py-1 rounded-full text-[10px] font-black flex items-center gap-1 border border-rose-100 shadow-sm"><AlertCircle size={12}/> 위험</span>
  };

  return (
    <Link 
      to={`/auctions/${item.id}`} 
      state={{ auctionData: item }} 
      className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 h-full flex flex-col relative"
      aria-label={`${item.title} 경매 물건 상세보기`}
    >
      <div className="relative h-56 overflow-hidden shrink-0 bg-slate-100">
        <img 
          src={imgError ? getFallbackImage(item.propertyType) : item.imageUrl} 
          alt={item.title} 
          onError={() => setImgError(true)}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001A3D]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
           <span className="text-white text-xs font-black flex items-center gap-1">상세 정보 보기 <ChevronRight size={14} /></span>
        </div>
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-[#001A3D] text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg">{item.status}</span>
          <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest text-[#001A3D] shadow-lg">{item.propertyType}</span>
        </div>
        <div className="absolute top-4 right-4">
          {riskBadge[item.riskLevel]}
        </div>
      </div>
      
      <div className="p-7 flex flex-col flex-grow">
        <div className="text-[10px] text-slate-400 font-black mb-1.5 uppercase tracking-widest">{item.caseNumber}</div>
        <h3 className="font-black text-lg text-[#001A3D] mb-2 truncate group-hover:text-[#C5A059] transition font-serif">{item.title}</h3>
        
        <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-6">
          <MapPin size={14} className="text-[#C5A059]" />
          <span className="truncate font-medium">{item.location}</span>
        </div>

        <div className="space-y-3 border-t border-slate-50 pt-5 mt-auto">
          <div className="flex justify-between items-end">
            <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">감정평가액</span>
            <span className="text-slate-600 font-bold text-sm">{formatKRW(item.appraisalValue)}</span>
          </div>
          <div className="flex justify-between items-end">
            <span className="text-[#001A3D] text-[11px] font-black uppercase tracking-wider">최저 입찰가</span>
            <span className="text-rose-600 font-black text-xl font-serif">{formatKRW(item.minimumBidPrice)}</span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-50">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-bold">
             <Calendar size={14} className="text-[#C5A059]" /> {item.auctionDate}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#C5A059] font-black bg-[#C5A059]/5 px-3 py-1 rounded-full">
             <TrendingUp size={14}/> 72% 낙찰예상
          </div>
        </div>
      </div>
    </Link>
  );
};
