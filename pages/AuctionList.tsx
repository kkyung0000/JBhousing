
import React, { useState, useEffect } from 'react';
import { mockAuctions } from '../data/mockData';
import { AuctionCard } from '../components/AuctionCard';
import { Search, Map as MapIcon, List, ChevronDown, RefreshCcw, Zap, ExternalLink, Globe, Loader2, Info, FileText, Scale } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface GroundingResult {
  title: string;
  uri: string;
  snippet?: string;
}

export const AuctionList: React.FC = () => {
  const [viewType, setViewType] = useState<'list' | 'map'>('list');
  const [filter, setFilter] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [aiResults, setAiResults] = useState<GroundingResult[]>([]);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  
  const categories = ['전체', '아파트', '상가', '토지', '빌라', '공장'];
  
  const filtered = filter === '전체' 
    ? mockAuctions 
    : mockAuctions.filter(a => a.propertyType === filter);

  const handleLiveSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setAiResults([]);
    setAiSummary(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `대한민국 대법원 법원경매정보(courtauction.go.kr)의 공고 데이터를 바탕으로 다음 검색어에 대한 실시간 경매 물건 리포트를 작성해줘: "${searchQuery}". 
        
        답변 형식은 반드시 다음 내용을 포함해야 해:
        1. [물건 요약] 핵심 사건 정보 (사건번호, 소재지, 물건종류)
        2. [입찰 정보] 감정가, 최저가, 매각기일
        3. [전문가 분석] 권리분석 특이사항 및 투자 포인트
        4. [주의사항] 유치권, 임차인 등 리스크 포인트`,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const text = response.text;
      setAiSummary(text);

      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        const results: GroundingResult[] = chunks
          .filter((chunk: any) => chunk.web)
          .map((chunk: any) => ({
            title: chunk.web.title,
            uri: chunk.web.uri
          }));
        setAiResults(results);
      }
    } catch (error) {
      console.error("AI Search Error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Search Header */}
      <div className="bg-[#002147] pt-24 pb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37] blur-[200px] opacity-10 rounded-full"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2 bg-emerald-500 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-emerald-500/20">
              <RefreshCcw size={12} className="animate-spin-slow" /> Official DB Sync
            </div>
            <div className="text-white/40 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
              <Globe size={12} /> Connected to courtauction.go.kr
            </div>
          </div>
          
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold text-white mb-8 font-serif leading-tight">
              법원경매 <span className="text-[#D4AF37]">실시간 통합 검색</span>
            </h1>
            
            <form onSubmit={handleLiveSearch} className="flex flex-col lg:flex-row gap-4">
              <div className="flex-grow relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="지역, 사건번호, 아파트명으로 즉시 조회 (예: 전주 아파트)" 
                  className="w-full pl-16 pr-6 py-6 bg-white rounded-3xl text-xl focus:outline-none focus:ring-8 focus:ring-[#D4AF37]/20 border-none shadow-2xl transition-all font-medium"
                />
              </div>
              <button 
                type="submit"
                disabled={isSearching}
                className="bg-[#D4AF37] text-[#002147] px-12 py-6 rounded-3xl font-black text-xl hover:bg-white transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3 active:scale-95"
              >
                {isSearching ? <Loader2 className="animate-spin" /> : <Zap size={24} />}
                통합 검색
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white border-b border-slate-100 sticky top-20 z-40 shadow-sm backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-4 h-18 flex items-center justify-between overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-6">
            <div className="flex gap-1 mr-6 border-r border-slate-100 pr-6 hidden md:flex">
              <button onClick={() => setViewType('list')} className={`p-2.5 rounded-xl transition ${viewType === 'list' ? 'bg-[#002147] text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:bg-slate-50'}`}><List size={20}/></button>
              <button onClick={() => setViewType('map')} className={`p-2.5 rounded-xl transition ${viewType === 'map' ? 'bg-[#002147] text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:bg-slate-50'}`}><MapIcon size={20}/></button>
            </div>
            
            <div className="flex items-center gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                    filter === cat ? 'bg-[#002147] text-white border-[#002147] scale-105' : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 ml-6">
            <button className="flex items-center gap-1 text-[11px] text-slate-400 font-bold hover:text-[#002147] transition">최신순 <ChevronDown size={14}/></button>
            <button className="p-2 text-slate-300 hover:text-slate-800 transition"><RefreshCcw size={16}/></button>
          </div>
        </div>
      </div>

      {/* AI Search Results */}
      {(isSearching || aiSummary) && (
        <div className="bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-12 h-12 bg-[#002147] rounded-2xl flex items-center justify-center text-[#D4AF37] shadow-xl">
                <Scale size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-[#002147]">AI 법원 연동 정밀 리포트</h2>
                <p className="text-xs text-slate-400 font-bold tracking-widest uppercase">Supreme Court Data Analysis v2.5</p>
              </div>
            </div>

            {isSearching ? (
              <div className="bg-white rounded-[2.5rem] p-20 flex flex-col items-center justify-center space-y-8 border border-slate-100 shadow-sm">
                <div className="relative">
                  <div className="w-24 h-24 border-8 border-slate-100 border-t-[#D4AF37] rounded-full animate-spin"></div>
                  <FileText size={32} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-200 animate-pulse" />
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-[#002147] mb-2">실시간 법원 경매 데이터를 불러오는 중...</p>
                  <p className="text-sm text-slate-400">사건 번호, 물건 내역, 권리 관계를 동기화하고 있습니다.</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-[2.5rem] p-12 border border-slate-200 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-2 h-full bg-[#D4AF37]"></div>
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
                      <div className="flex items-center gap-2 text-[10px] font-black text-[#D4AF37] uppercase tracking-widest">
                        <Zap size={14} /> AI Analysis Content
                      </div>
                      <button className="text-[10px] font-bold text-slate-300 hover:text-[#002147] transition flex items-center gap-1">
                         PDF 저장 <Download size={12} />
                      </button>
                    </div>
                    <div className="text-slate-700 leading-relaxed whitespace-pre-wrap text-[15px] font-medium">
                      {aiSummary}
                    </div>
                    <div className="mt-12 p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-3">
                       <AlertCircle size={16} className="text-amber-600 shrink-0" />
                       <p className="text-[11px] text-amber-800 leading-normal font-medium">
                         본 리포트는 AI가 생성한 참고용 데이터이며, 실제 입찰 전 반드시 대법원 공고문 및 현장 조사를 재확인하시기 바랍니다. JB 하우징은 본 정보의 오차로 인한 결과에 책임을 지지 않습니다.
                       </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2 flex items-center gap-2">
                     <Globe size={14}/> Verified Data Sources
                  </h3>
                  {aiResults.map((result, idx) => (
                    <a 
                      key={idx} 
                      href={result.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block bg-white p-6 rounded-3xl border border-slate-100 hover:border-[#D4AF37] hover:shadow-2xl transition-all group relative overflow-hidden"
                    >
                      <div className="relative z-10 flex items-start justify-between gap-4">
                        <div className="flex-grow">
                          <div className="text-[9px] font-bold text-[#D4AF37] mb-2 flex items-center gap-1 uppercase tracking-tighter">
                            Official Court Database Link
                          </div>
                          <div className="font-bold text-[#002147] text-sm line-clamp-2 leading-snug">
                            {result.title}
                          </div>
                          <div className="mt-3 text-[10px] text-slate-400 font-mono opacity-60">
                            {result.uri}
                          </div>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-xl group-hover:bg-[#D4AF37] group-hover:text-white transition">
                           <ExternalLink size={14} />
                        </div>
                      </div>
                    </a>
                  ))}
                  
                  <div className="p-8 bg-gradient-to-br from-[#002147] to-[#00152e] rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full"></div>
                    <h4 className="font-bold text-lg mb-3">전문가의 정밀 분석이 <br/>필요하신가요?</h4>
                    <p className="text-[11px] opacity-60 mb-6 leading-relaxed">AI 리포트만으로는 부족한 특수 권리분석 및 명도 전략 수립을 위해 베테랑 대리인을 연결해 드립니다.</p>
                    <button className="w-full bg-[#D4AF37] text-[#002147] py-4 rounded-2xl font-bold text-sm hover:bg-white transition-all shadow-lg">
                      1:1 대면 상담 신청
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main List Area */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex justify-between items-center mb-12">
           <h2 className="text-3xl font-bold text-[#002147]">
             {searchQuery ? (
               <>추천 물건 검색 결과 <span className="text-[#D4AF37] font-serif">{filtered.length}</span></>
             ) : (
               <>실시간 추천 매물 <span className="text-[#D4AF37] font-serif">{filtered.length}</span></>
             )}
           </h2>
           <div className="flex items-center gap-2 text-xs font-bold text-slate-400 bg-slate-50 px-4 py-2 rounded-full">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
             실시간 업데이트 중
           </div>
        </div>

        {viewType === 'list' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filtered.map(item => (
              <AuctionCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 rounded-[3rem] border border-slate-100 h-[650px] flex items-center justify-center text-slate-400 flex-col gap-6 shadow-inner relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
               <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000" className="w-full h-full object-cover" alt="Map pattern" />
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl text-[#002147] mb-4">
                <MapIcon size={32} />
              </div>
              <p className="font-black text-2xl text-[#002147] mb-2 tracking-tight">지도 검색 모드 준비 중</p>
              <p className="text-sm text-slate-500 max-w-xs text-center leading-relaxed">지역별 낙찰가 통계와 함께 지도를 기반으로 경매 물건을 한눈에 확인할 수 있는 기능이 곧 찾아옵니다.</p>
              <button onClick={() => setViewType('list')} className="mt-8 bg-[#002147] text-white px-8 py-3 rounded-2xl font-bold text-sm hover:scale-105 transition shadow-xl">
                리스트로 보기
              </button>
            </div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

const Download = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
);

const AlertCircle = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alert-circle"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
);
