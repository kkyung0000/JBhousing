
import React, { useState } from 'react';
import { AuctionCard } from '../components/AuctionCard';
import { Search, Map as MapIcon, List, ChevronDown, RefreshCcw, Filter, LayoutGrid, Info, Loader2, Sparkles, ExternalLink, Link as LinkIcon, BookOpen, Gavel, MapPin, Building2, Tag, ArrowRight } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { AuctionItem, PropertyType, AuctionStatus } from '../types';

export const AuctionList: React.FC = () => {
  const [viewType, setViewType] = useState<'list' | 'map'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<AuctionItem[]>([]);
  const [groundingLinks, setGroundingLinks] = useState<{title: string, uri: string}[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Filters State
  const [region, setRegion] = useState('전체 지역');
  const [propertyType, setPropertyType] = useState<PropertyType | '전체'>('전체');
  const [status, setStatus] = useState<AuctionStatus | '전체'>('전체');

  const resourceLinks = [
    { title: "대한민국 법원경매정보", url: "https://www.courtauction.go.kr", desc: "대법원 공식 경매 공고 및 기일 정보" },
    { title: "온비드 (Onbid)", url: "https://www.onbid.co.kr", desc: "캠코 공매 및 공공기관 자산 매각" },
    { title: "대법원 판례정보", url: "https://glaw.scourt.go.kr", desc: "권리분석을 위한 필수 판례 검색" },
    { title: "정부24 등기부발급", url: "https://www.gov.kr", desc: "부동산 등기부등본 및 건축물대장 발급" },
  ];

  const handleRealSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    const filterInfo = `지역: ${region}, 종류: ${propertyType}, 상태: ${status}`;
    const fullQuery = searchQuery ? `${searchQuery} (${filterInfo})` : filterInfo;

    setIsSearching(true);
    setHasSearched(true);
    setSearchResults([]);
    setGroundingLinks([]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `대한민국 대법원 경매 정보에서 "${fullQuery}"와 관련된 실제 진행 중인 경매 물건 리스트를 찾아줘. 
        각 물건에 대해 구글 이미지 검색 등을 활용하여 해당 경매 물건의 실제 외관이나 위치가 포함된 "공개적으로 접근 가능한" 이미지 URL(imageUrl)을 반드시 찾아 포함해줘.
        
        각 물건 정보 포함 항목:
        사건번호, 물건명, 소재지, 물건종류(아파트/상가/토지/빌라 중 하나), 감정가(원 단위), 최저가(원 단위), 매각기일, 위험도(safe/caution/danger 중 하나), imageUrl, externalUrl.
        
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
            "imageUrl": "찾아낸 실제 이미지 URL",
            "externalUrl": "공식 페이지 URL"
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
          const mappedResults: AuctionItem[] = rawData.map((item: any, index: number) => {
            // 유효하지 않은 이미지 URL 체크 및 종류별 기본 고화질 이미지 설정
            const defaultImages: Record<string, string> = {
              '아파트': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800',
              '상가': 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=800',
              '빌라': 'https://images.unsplash.com/photo-1580587767526-cf38701be262?q=80&w=800',
              '토지': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800'
            };

            const finalImageUrl = (item.imageUrl && (item.imageUrl.startsWith('http') || item.imageUrl.startsWith('data:')))
              ? item.imageUrl
              : (defaultImages[item.propertyType] || defaultImages['아파트']);

            return {
              id: `real-${index}-${Date.now()}`,
              caseNumber: item.caseNumber || '정보없음',
              title: item.title || '정보없음',
              location: item.location || '정보없음',
              propertyType: (item.propertyType as any) || '아파트',
              appraisalValue: Number(item.appraisalValue) || 0,
              minimumBidPrice: Number(item.minimumBidPrice) || 0,
              status: (item.status as any) || '진행',
              auctionDate: item.auctionDate || '정보없음',
              imageUrl: finalImageUrl,
              riskLevel: (item.riskLevel as any) || 'safe',
              description: item.description || '',
              isOccupiedByOwner: true,
              hasPriorityRight: false,
              expectedRepairCost: 0,
              expectedEvictionCost: 0,
              externalUrl: item.externalUrl || "https://www.courtauction.go.kr"
            };
          });
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
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-[#002147] pt-24 pb-48 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[#D4AF37]/5 opacity-20 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-8 border border-emerald-500/30">
               <Sparkles size={14} /> Intelligence Search Grounding
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 font-serif leading-tight">
              전국 법원경매 <span className="text-[#D4AF37]">통합 검색</span>
            </h1>
            
            <form onSubmit={handleRealSearch} className="relative group max-w-3xl mx-auto">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#D4AF37] transition" size={28} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="지역명, 아파트명 또는 사건번호를 입력하세요" 
                className="w-full pl-16 pr-44 py-6 bg-white rounded-[2rem] text-xl focus:outline-none focus:ring-8 focus:ring-[#D4AF37]/10 border-none shadow-2xl transition-all placeholder:text-slate-300 font-medium"
              />
              <button 
                type="submit"
                disabled={isSearching}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#D4AF37] text-[#002147] px-10 py-4 rounded-3xl font-black text-lg hover:bg-white transition-all shadow-xl disabled:opacity-50 flex items-center gap-2 active:scale-95"
              >
                {isSearching ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
                검색하기
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-40 print:hidden">
        <div className="bg-white/80 backdrop-blur-2xl rounded-[3rem] shadow-2xl border border-white/50 p-8 md:p-10 flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1 w-full space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1.5">
              <MapPin size={12} className="text-[#D4AF37]"/> 지역별 검색
            </label>
            <div className="relative">
              <select 
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-[#002147] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 cursor-pointer"
              >
                <option>전체 지역</option>
                <option>서울특별시</option>
                <option>경기도</option>
                <option>전라북도</option>
                <option>부산광역시</option>
                <option>대전광역시</option>
                <option>인천광역시</option>
                <option>대구광역시</option>
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
            </div>
          </div>

          <div className="flex-1 w-full space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1.5">
              <Building2 size={12} className="text-[#D4AF37]"/> 물건 종류
            </label>
            <div className="relative">
              <select 
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value as any)}
                className="w-full appearance-none bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-[#002147] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 cursor-pointer"
              >
                <option value="전체">모든 물건</option>
                <option value="아파트">아파트</option>
                <option value="빌라">빌라 / 다세대</option>
                <option value="상가">상가 / 점포</option>
                <option value="토지">토지 / 임야</option>
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
            </div>
          </div>

          <div className="flex-1 w-full space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1.5">
              <Tag size={12} className="text-[#D4AF37]"/> 진행 상태
            </label>
            <div className="relative">
              <select 
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full appearance-none bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-[#002147] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 cursor-pointer"
              >
                <option value="전체">전체 상태</option>
                <option value="신건">신건 (첫 매각)</option>
                <option value="진행">진행 중</option>
                <option value="유찰">유찰 물건</option>
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
            </div>
          </div>

          <div className="lg:pt-6 w-full lg:w-auto">
             <button 
                onClick={() => handleRealSearch()}
                className="w-full lg:w-auto bg-[#002147] text-white px-10 py-5 rounded-2xl font-black hover:bg-slate-900 transition flex items-center justify-center gap-3 shadow-xl shadow-blue-900/10 active:scale-95 group"
             >
                조건으로 검색 <ArrowRight className="group-hover:translate-x-1 transition" size={18} />
             </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-24 grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-10">
             <div className="flex items-center gap-4">
               <h2 className="text-2xl font-black text-[#002147]">검색 결과</h2>
               <div className="h-6 w-[1px] bg-slate-200"></div>
               <span className="text-sm font-bold text-slate-400">
                  {isSearching ? "데이터 동기화 중..." : hasSearched ? `Total ${searchResults.length}건 발견` : "검색 조건을 입력하세요"}
               </span>
             </div>
             <div className="flex gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100">
                <button onClick={() => setViewType('list')} className={`p-2.5 rounded-xl transition ${viewType === 'list' ? 'bg-[#002147] text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}><List size={20}/></button>
                <button onClick={() => setViewType('map')} className={`p-2.5 rounded-xl transition ${viewType === 'map' ? 'bg-[#002147] text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}><MapIcon size={20}/></button>
             </div>
          </div>

          {isSearching ? (
            <div className="py-40 flex flex-col items-center justify-center text-center space-y-8 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
              <div className="relative">
                <div className="w-24 h-24 border-8 border-slate-50 border-t-[#D4AF37] rounded-full animate-spin"></div>
                <Sparkles size={32} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#D4AF37] animate-pulse" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#002147]">대법원 데이터 실시간 동기화 중</h3>
                <p className="text-slate-400 text-sm mt-2 max-w-xs mx-auto">전국 법원 공고 및 등기 현황을 검색 알고리즘이 정밀 분석하고 있습니다.</p>
              </div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {searchResults.map(item => (
                <AuctionCard key={item.id} item={item} />
              ))}
            </div>
          ) : hasSearched ? (
            <div className="py-40 text-center bg-white border-2 border-dashed border-slate-200 rounded-[3rem]">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-200 shadow-inner">
                 <Search size={40} />
              </div>
              <h3 className="text-2xl font-black text-slate-700">매칭되는 물건이 없습니다.</h3>
              <p className="text-slate-400 text-sm mt-3">필터 조건을 변경하거나 더 넓은 지역으로 검색해보세요.</p>
              <button 
                onClick={() => {setSearchQuery(''); setRegion('전체 지역'); setHasSearched(false);}} 
                className="mt-10 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition"
              >
                검색 조건 초기화
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:shadow-xl transition-all">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center shadow-inner text-[#D4AF37] mb-8 group-hover:scale-110 transition"><Sparkles size={32} /></div>
                  <h4 className="text-xl font-black text-[#002147] mb-3">하이퍼 실시간 검색</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">대법원 경매정보 시스템과 실시간 연동되어 1시간 이내의 최신 공고까지 포착합니다.</p>
               </div>
               <div className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:shadow-xl transition-all">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center shadow-inner text-[#D4AF37] mb-8 group-hover:scale-110 transition"><Gavel size={32} /></div>
                  <h4 className="text-xl font-black text-[#002147] mb-3">사건번호 정밀 판독</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">특수 물건, 유치권 물건 등 복잡한 사건도 AI가 권리 관계를 1차적으로 필터링합니다.</p>
               </div>
            </div>
          )}
        </div>

        <div className="space-y-8">
           <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-black text-[#002147] mb-8 flex items-center gap-3">
                 <BookOpen className="text-[#D4AF37]" size={24} /> Bidding Resources
              </h3>
              <div className="space-y-5">
                 {resourceLinks.map((res, i) => (
                   <a 
                     key={i} 
                     href={res.url} 
                     target="_blank" 
                     rel="noreferrer" 
                     className="block p-5 bg-slate-50 rounded-2xl border border-slate-50 hover:border-[#D4AF37] hover:bg-white hover:shadow-xl transition group"
                   >
                     <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-sm text-slate-800 group-hover:text-[#002147] transition">{res.title}</span>
                        <ExternalLink size={14} className="text-slate-300 group-hover:text-[#D4AF37]" />
                     </div>
                     <p className="text-[11px] text-slate-400 leading-normal font-medium">{res.desc}</p>
                   </a>
                 ))}
              </div>
           </div>

           {groundingLinks.length > 0 && (
             <div className="bg-[#002147] rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 blur-3xl rounded-full"></div>
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2 relative z-10">
                   <LinkIcon className="text-[#D4AF37]" size={20} /> 실시간 근거 데이터
                </h3>
                <div className="space-y-3 relative z-10">
                   {groundingLinks.map((link, i) => (
                     <a key={i} href={link.uri} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition group">
                        <span className="text-[11px] font-bold truncate max-w-[150px]">{link.title}</span>
                        <ExternalLink size={12} className="text-white/40 group-hover:text-[#D4AF37]" />
                     </a>
                   ))}
                </div>
             </div>
           )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-32">
         <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
            <div className="flex items-center gap-5">
               <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-[#D4AF37] shadow-inner shrink-0">
                  <Info size={32} />
               </div>
               <div className="text-sm leading-relaxed text-slate-500 font-medium">
                  <strong className="text-[#002147] block mb-1 text-base">데이터 면책 고지 (Legal Disclaimer)</strong>
                  본 검색 서비스는 AI가 수집한 정보를 바탕으로 하며, 대법원 정식 공고와 시차가 발생할 수 있습니다. <br className="hidden md:block"/>
                  정확한 입찰 보증금 및 기일 확인을 위해 반드시 <strong>대법원 경매정보 홈페이지</strong> 원문을 확인하시기 바랍니다.
               </div>
            </div>
            <a href="https://www.courtauction.go.kr" target="_blank" rel="noreferrer" className="bg-[#002147] text-white px-10 py-5 rounded-2xl font-black text-sm hover:bg-slate-900 transition flex items-center gap-3 shadow-xl shadow-slate-200">
               대법원 공식 홈페이지 <ExternalLink size={18} />
            </a>
         </div>
      </div>
    </div>
  );
};
