
import React, { useState } from 'react';
import { AuctionCard } from '../components/AuctionCard';
import { Search, Map as MapIcon, List, ChevronDown, RefreshCcw, Filter, LayoutGrid, Info, Loader2, Sparkles, ExternalLink, Link as LinkIcon, BookOpen, Gavel } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { AuctionItem } from '../types';

export const AuctionList: React.FC = () => {
  const [viewType, setViewType] = useState<'list' | 'map'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<AuctionItem[]>([]);
  const [groundingLinks, setGroundingLinks] = useState<{title: string, uri: string}[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const resourceLinks = [
    { title: "대한민국 법원경매정보", url: "https://www.courtauction.go.kr", desc: "대법원 공식 경매 공고 및 기일 정보" },
    { title: "온비드 (Onbid)", url: "https://www.onbid.co.kr", desc: "캠코 공매 및 공공기관 자산 매각" },
    { title: "대법원 판례정보", url: "https://glaw.scourt.go.kr", desc: "권리분석을 위한 필수 판례 검색" },
    { title: "정부24 등기부발급", url: "https://www.gov.kr", desc: "부동산 등기부등본 및 건축물대장 발급" },
  ];

  const handleRealSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setHasSearched(true);
    setSearchResults([]);
    setGroundingLinks([]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `대한민국 대법원 경매 정보에서 "${searchQuery}"와 관련된 실제 진행 중인 경매 물건 리스트를 찾아줘. 
        각 물건에 대해 다음 정보를 포함해서 리스트 형식으로 알려줘:
        사건번호, 물건명, 소재지, 물건종류(아파트/상가/토지/빌라 중 하나), 감정가(원 단위), 최저가(원 단위), 매각기일, 위험도(safe/caution/danger 중 하나), 해당 물건 정보를 더 자세히 볼 수 있는 예상 소스 링크(외부URL).
        
        결과는 반드시 다음 JSON 형식을 따르는 텍스트 블록으로 포함해줘:
        \`\`\`json
        [
          {
            "caseNumber": "2024타경 1234",
            "title": "물건이름",
            "location": "주소",
            "propertyType": "아파트",
            "appraisalValue": 500000000,
            "minimumBidPrice": 400000000,
            "status": "진행",
            "auctionDate": "2025-05-20",
            "riskLevel": "safe",
            "description": "설명",
            "externalUrl": "https://www.courtauction.go.kr/..."
          }
        ]
        \`\`\``,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const text = response.text;
      
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/\[([\s\S]*?)\]/);
      if (jsonMatch) {
        try {
          const rawData = JSON.parse(jsonMatch[0].replace(/```json|```/g, ''));
          const mappedResults: AuctionItem[] = rawData.map((item: any, index: number) => ({
            id: `real-${index}-${Date.now()}`,
            caseNumber: item.caseNumber || '사건번호 정보없음',
            title: item.title || '물건명 정보없음',
            location: item.location || '소재지 정보없음',
            propertyType: (item.propertyType as any) || '아파트',
            appraisalValue: Number(item.appraisalValue) || 0,
            minimumBidPrice: Number(item.minimumBidPrice) || 0,
            status: (item.status as any) || '진행',
            auctionDate: item.auctionDate || '기일 정보없음',
            imageUrl: `https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop`,
            riskLevel: (item.riskLevel as any) || 'safe',
            description: item.description || '',
            isOccupiedByOwner: true,
            hasPriorityRight: false,
            expectedRepairCost: 0,
            expectedEvictionCost: 0,
            externalUrl: item.externalUrl || "https://www.courtauction.go.kr"
          }));
          setSearchResults(mappedResults);
        } catch (err) {
          console.error("JSON Parsing Error", err);
        }
      }

      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        const links = chunks
          .filter((chunk: any) => chunk.web)
          .map((chunk: any) => ({
            title: chunk.web.title,
            uri: chunk.web.uri
          }));
        setGroundingLinks(links);
      }

    } catch (error) {
      console.error("Search Error:", error);
      alert("데이터를 가져오는 중 오류가 발생했습니다.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Search Header */}
      <div className="bg-[#002147] pt-24 pb-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[#D4AF37]/5 opacity-20 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 border border-emerald-500/30">
               <Sparkles size={12} /> Real-time Court Data Access
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif leading-tight">
              법원경매 <span className="text-[#D4AF37]">실시간 물건 검색</span>
            </h1>
            <p className="text-white/60 text-lg mb-10 leading-relaxed">
              Google Search Grounding 기술을 통해 대법원 경매 정보를 실시간으로 검색합니다.<br/>
              지역, 사건번호, 또는 아파트 이름을 입력하고 검색 버튼을 누르세요.
            </p>
            
            <form onSubmit={handleRealSearch} className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#D4AF37] transition" size={24} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="예: 전주 아파트, 2024타경 1234, 서울 상가" 
                className="w-full pl-16 pr-40 py-5 bg-white rounded-2xl text-lg focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/20 border-none shadow-2xl transition-all"
              />
              <button 
                type="submit"
                disabled={isSearching}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#D4AF37] text-[#002147] px-8 py-3 rounded-xl font-bold hover:bg-[#b8962f] transition flex items-center gap-2 disabled:opacity-50"
              >
                {isSearching ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
                검색
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Result Toolbar */}
      <div className="bg-white border-b border-slate-100 sticky top-20 z-40 shadow-sm backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-4 h-18 flex items-center justify-between py-4">
          <div className="flex items-center gap-6">
            <div className="flex gap-1 border-r border-slate-100 pr-6 hidden md:flex">
              <button onClick={() => setViewType('list')} className={`p-2.5 rounded-xl transition ${viewType === 'list' ? 'bg-[#002147] text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}><List size={20}/></button>
              <button onClick={() => setViewType('map')} className={`p-2.5 rounded-xl transition ${viewType === 'map' ? 'bg-[#002147] text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}><MapIcon size={20}/></button>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
               {isSearching ? "데이터를 불러오는 중..." : hasSearched ? `검색 결과 ${searchResults.length}건` : "검색어를 입력하고 실제 데이터를 확인하세요."}
            </div>
          </div>

          {groundingLinks.length > 0 && (
            <div className="hidden lg:flex items-center gap-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Data Sources:</span>
              {groundingLinks.slice(0, 2).map((link, i) => (
                <a key={i} href={link.uri} target="_blank" rel="noreferrer" className="text-[10px] bg-slate-50 px-3 py-1 rounded-full border border-slate-200 text-[#002147] hover:bg-[#D4AF37] hover:text-white transition flex items-center gap-1">
                   {link.title.length > 15 ? link.title.slice(0, 15) + '...' : link.title} <ExternalLink size={10} />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-3">
          {isSearching ? (
            <div className="py-40 flex flex-col items-center justify-center text-center space-y-6">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-slate-100 border-t-[#D4AF37] rounded-full animate-spin"></div>
                <Sparkles size={24} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#D4AF37] animate-pulse" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#002147]">실시간 대법원 데이터 검색 중</h3>
                <p className="text-slate-400 text-sm mt-1">네트워크 상태에 따라 5~10초 정도 소요될 수 있습니다.</p>
              </div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {searchResults.map(item => (
                <AuctionCard key={item.id} item={item} />
              ))}
            </div>
          ) : hasSearched ? (
            <div className="py-40 text-center border-2 border-dashed border-slate-100 rounded-[3rem]">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                 <Search size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-600">검색 결과가 없습니다.</h3>
              <p className="text-slate-400 text-sm mt-2">다른 검색어를 입력하거나 지역명을 상세하게 적어보세요.</p>
              <button onClick={() => {setSearchQuery(''); setHasSearched(false);}} className="mt-8 text-[#D4AF37] font-bold hover:underline">초기화</button>
            </div>
          ) : (
            <div className="py-20 grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-[#D4AF37] mb-6"><Sparkles /></div>
                  <h4 className="font-bold text-[#002147] mb-2">실시간 데이터</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Gemini AI가 구글 검색을 통해 현재 진행 중인 실제 법원 경매 데이터를 즉시 수집합니다.</p>
               </div>
               <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-[#D4AF37] mb-6"><Search /></div>
                  <h4 className="font-bold text-[#002147] mb-2">통합 검색</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">전국 아파트, 상가, 토지 등 모든 종류의 경매 물건을 키워드 하나로 검색할 수 있습니다.</p>
               </div>
            </div>
          )}
        </div>

        {/* Sidebar: Bidding Resources */}
        <div className="space-y-8">
           <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
              <h3 className="text-lg font-bold text-[#002147] mb-6 flex items-center gap-2">
                 <BookOpen className="text-[#D4AF37]" size={20} /> 입찰 필수 리소스
              </h3>
              <div className="space-y-4">
                 {resourceLinks.map((res, i) => (
                   <a 
                     key={i} 
                     href={res.url} 
                     target="_blank" 
                     rel="noreferrer" 
                     className="block p-4 bg-white rounded-2xl border border-slate-100 hover:border-[#D4AF37] hover:shadow-md transition group"
                   >
                     <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm text-slate-800 group-hover:text-[#D4AF37] transition">{res.title}</span>
                        <ExternalLink size={12} className="text-slate-300 group-hover:text-[#D4AF37]" />
                     </div>
                     <p className="text-[10px] text-slate-400 leading-tight">{res.desc}</p>
                   </a>
                 ))}
              </div>
           </div>

           <div className="bg-[#D4AF37]/5 rounded-3xl p-8 border border-[#D4AF37]/20">
              <h3 className="text-lg font-bold text-[#002147] mb-4 flex items-center gap-2">
                 <Gavel className="text-[#D4AF37]" size={20} /> 경매 절차 안내
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                 경매 입찰은 법령에 따른 엄격한 절차로 진행됩니다. 초보자라면 반드시 절차를 숙지하세요.
              </p>
              <button className="w-full py-3 bg-[#002147] text-white rounded-xl text-xs font-bold hover:bg-slate-900 transition flex items-center justify-center gap-2">
                 가이드북 다운로드 <LinkIcon size={14} />
              </button>
           </div>
        </div>
      </div>

      {/* Data Notice */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
         <div className="bg-[#002147] rounded-3xl p-8 text-white/80 flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
            <div className="flex items-center gap-4">
               <Info className="text-[#D4AF37] shrink-0" size={32} />
               <div className="text-sm leading-relaxed">
                  <strong>알림:</strong> 위 검색 결과는 AI가 수집한 정보로, 법정 공고와 실시간으로 일치하지 않을 수 있습니다. <br className="hidden md:block"/>
                  정확한 입찰 참여를 위해서는 반드시 <strong>대법원 경매정보 홈페이지</strong>에서 재확인하시기 바랍니다.
               </div>
            </div>
            <a href="https://www.courtauction.go.kr" target="_blank" rel="noreferrer" className="whitespace-nowrap bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl text-sm font-bold transition flex items-center gap-2">
               대법원 공식 홈페이지 <ExternalLink size={14} />
            </a>
         </div>
      </div>
    </div>
  );
};
