
import React, { useState } from 'react';
import { mockAuctions } from '../data/mockData';
import { AuctionCard } from '../components/AuctionCard';
import { Filter, Search, Map as MapIcon, List, ChevronDown, RefreshCcw } from 'lucide-react';

export const AuctionList: React.FC = () => {
  const [viewType, setViewType] = useState<'list' | 'map'>('list');
  const [filter, setFilter] = useState('전체');
  
  const categories = ['전체', '아파트', '상가', '토지', '빌라', '공장'];
  
  const filtered = filter === '전체' 
    ? mockAuctions 
    : mockAuctions.filter(a => a.propertyType === filter);

  return (
    <div className="bg-white min-h-screen">
      {/* Search Header */}
      <div className="bg-[#002147] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-8">경매 물건 통합 검색</h1>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-grow relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="지역, 사건번호, 물건명으로 검색하세요" 
                className="w-full pl-14 pr-6 py-4 bg-white rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/20 border-none shadow-lg"
              />
            </div>
            <button className="bg-[#D4AF37] text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#b8962f] transition shadow-lg">
              검색하기
            </button>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white border-b border-slate-100 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-6">
            <div className="flex gap-2 mr-6 border-r border-slate-100 pr-6 hidden md:flex">
              <button 
                onClick={() => setViewType('list')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold transition ${viewType === 'list' ? 'bg-[#002147] text-white' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                <List size={16}/> 목록형
              </button>
              <button 
                onClick={() => setViewType('map')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold transition ${viewType === 'map' ? 'bg-[#002147] text-white' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                <MapIcon size={16}/> 지도형
              </button>
            </div>
            
            <div className="flex items-center gap-3">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition border ${
                    filter === cat ? 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]' : 'bg-white text-slate-500 border-slate-100 hover:border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 ml-6">
            <button className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 font-bold whitespace-nowrap">
              가격순 <ChevronDown size={14}/>
            </button>
            <button className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 font-bold whitespace-nowrap">
              기일순 <ChevronDown size={14}/>
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-800 transition"><RefreshCcw size={16}/></button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {viewType === 'list' ? (
          <>
            <div className="flex justify-between items-center mb-10">
               <h2 className="text-xl font-bold text-[#002147]">
                 총 <span className="text-[#D4AF37]">{filtered.length}건</span>의 물건이 있습니다.
               </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filtered.map(item => (
                <AuctionCard key={item.id} item={item} />
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-100 h-[600px] flex items-center justify-center text-slate-400 flex-col gap-4 shadow-sm">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
              <MapIcon size={32} />
            </div>
            <div className="text-center">
              <p className="font-bold text-slate-600">지도 서비스 준비 중</p>
              <p className="text-sm">현재 전주 완산구 중심의 매물 리스트를 우선적으로 확인하실 수 있습니다.</p>
            </div>
            <button onClick={() => setViewType('list')} className="mt-4 bg-[#002147] text-white px-6 py-2 rounded-lg font-bold text-sm">
              목록보기로 돌아가기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
