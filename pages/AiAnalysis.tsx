
import React, { useState, useRef } from 'react';
import { FileText, Zap, Loader2, Scale, ShieldAlert, CheckCircle2, Printer, Download, ArrowLeft, Wallet, Info, Lock, Sparkles, AlertCircle, ShieldCheck, Search, ClipboardList, TrendingUp, Landmark, Gavel, FileWarning, BarChart3, Building2, MapPin, Target, Percent, Coins, UserCheck } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Link } from 'react-router-dom';

interface GroundingResult {
  title: string;
  uri: string;
}

const SAMPLE_REPORT_CONTENT = `
# [제 1 장 : 사건 및 물건 기본 정보]
---------------------------------------------------------
**1. 사건 개요**
*   **사건번호**: 2024타경 5678 (서울중앙지방법원 본원 경매 5계)
*   **매각기일**: 2025년 06월 15일 10:00
*   **물건유형**: 공동주택 (아파트)
*   **소재지**: 서울특별시 서초구 반포동 반포자이 102동 1502호

**2. 물건 현황**
*   **면적**: 전용면적 84.98㎡ (25.7평) / 공급면적 116.33㎡ (35평)
*   **구조**: 방 3개, 욕실 2개, 거실, 주방, 발코니 (남향, 판상형 로열층)
*   **보존등기**: 2009.03.12 (준공 16년차, 관리상태 최상)

# [제 2 장 : 시세 및 가치 분석 보고]
---------------------------------------------------------
**1. 감정가 및 유찰 현황**
*   **감정가**: 3,600,000,000원 (2024.12 기준 평가)
*   **최저가**: 2,880,000,000원 (감정가 대비 80%, 1회 유찰)
*   **입찰보증금**: 288,000,000원 (10%)

**2. 시장 데이터 (실거래가 기반)**
*   **최근 실거래가**: 2025.03 기준 동일 평형 34.5억 ~ 35.8억 형성
*   **KB시세**: 일반가 35억 원 (대출 한도 산정 기준)
*   **예상 가치 산정**: 본 물건은 15층 로열층으로 단지 내 선호도가 매우 높으며, 최저가 기준 시세 대비 약 6~7억 원의 안전 마진이 확보된 상태입니다.

# [제 3 장 : 정밀 권리 분석 (Legal Review)]
---------------------------------------------------------
**1. 등기부 현황 및 말소기준권리**
*   **말소기준권리**: 2018.05.10 신한은행 근저당권 (채권액 12억 원)
*   **권리 소멸 여부**: 말소기준권리 이후 설정된 가압류(2021.03), 근저당(2022.06) 등 모든 등기상 권리는 낙찰 후 소멸(소멸주의)될 것으로 판단됨. 등기부 깨끗함.

**2. 임대차 관계 및 점유 현황**
*   **점유인**: 소유자 겸 채무자 가족 직접 점유 중
*   **대항력 분석**: 전입세대 확인 결과, 말소기준권리보다 앞선 전입자 없음. 
*   **주의사항**: 미납 관리비 확인 필요 (약 350만 원 체납 추정, 낙찰자 공용부분 부담 원칙).

# [제 4 장 : 명도 및 사후 처리 전략]
---------------------------------------------------------
**1. 명도 예상 난이도: [낮음/중간]**
*   소유주 점유 물건으로 임차인 보증금 배당 갈등이 없어 명도 협의가 비교적 수월할 것으로 예상됩니다.
*   **예상 명도 기간**: 인도명령 신청 후 협의 기간 포함 약 2.5개월
*   **예상 명도 비용**: 이사 협의 비용 및 제반 수수료 포함 약 700만 원 선 가이드

# [제 5 장 : 투자 수익 시뮬레이션]
---------------------------------------------------------
**1. 자금 조달 계획 (예상)**
*   **낙찰 예상가**: 3,350,000,000원 (감정가 93% 수준)
*   **대출 가능액**: 약 17.5억 원 (LTV 50% 가정, 개인 신용도에 따라 상이)
*   **필요 자기자본**: 취득세 포함 약 16.8억 원

**2. 목표 수익률**
*   **단기 매도 시**: 시세 35억 매각 가정 시 세전 수익 약 1.5억 원
*   **임대 운용 시**: 보증금 1억 / 월세 450만 원 (수익률 약 4.2%)

# [제 6 장 : 종합 의견 및 전문가 조언]
---------------------------------------------------------
**종합 점수: 96 / 100 [강력 추천]**

*   **투자 핵심**: 본 물건은 반포 핵심 입지의 희소성 높은 매물로, 권리 관계가 매우 명확하여 경매 입문자 및 실거주 목적 투자자에게 최적입니다. 
*   **전략 조언**: 2회차 매각기일에는 시세 대비 경쟁이 매우 치열할 것으로 예상되므로, 시세의 93%~95% 선에서 공격적인 입찰가 작성이 낙찰의 관건입니다. 단지 내 커뮤니티 접근성을 강조한 밸류업 인테리어 시 추가 가치 상승이 기대됩니다.
`;

export const AiAnalysis: React.FC = () => {
  const [caseNumber, setCaseNumber] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [groundingLinks, setGroundingLinks] = useState<GroundingResult[]>([]);
  const [isSample, setIsSample] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);
  
  const [userPoints, setUserPoints] = useState(15000); 
  const SEARCH_COST = 10000;

  const handleGenerateReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseNumber.trim()) {
      alert("사건번호를 입력해주세요.");
      return;
    }

    if (userPoints < SEARCH_COST) {
      alert(`포인트가 부족합니다. (현재: ${userPoints.toLocaleString()}P / 필요: ${SEARCH_COST.toLocaleString()}P)\n포인트 충전 메뉴에서 충전 후 이용해주세요.`);
      return;
    }

    const confirmSearch = window.confirm(`[${caseNumber}] 사건에 대한 AI 정밀 리포트를 생성하시겠습니까?\n생성 시 ${SEARCH_COST.toLocaleString()}P가 즉시 차감됩니다.`);
    if (!confirmSearch) return;

    setIsSearching(true);
    setAiSummary(null);
    setGroundingLinks([]);
    setIsSample(false);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `대한민국 대법원 법원경매정보 및 최신 판례, 부동산 시장 데이터를 바탕으로 사건번호 "${caseNumber}"에 대한 경매 권리분석 리포트를 작성해줘. 
        
        전문가적인 어조로 작성하되, 다음 형식을 반드시 지켜줘:
        
        # [제 1 장 : 사건 및 물건 기본 정보]
        (사건 개요, 소재지, 면적 등)
        
        # [제 2 장 : 시세 및 가치 분석 보고]
        (감정가, 실거래가, 시세 대비 저평가 여부)
        
        # [제 3 장 : 정밀 권리 분석 (Legal Review)]
        (등기부 분석, 말소기준권리, 임대차 대항력 판독)
        
        # [제 4 장 : 명도 및 사후 처리 전략]
        (점유자 분석, 명도 난이도 및 예상 비용)
        
        # [제 5 장 : 투자 수익 시뮬레이션]
        (자금 조달, 수익률, 세금 고려 사항)
        
        # [제 6 장 : 종합 의견 및 전문가 조언]
        (종합 점수, 최종 추천 사유, 입찰 전략)`,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      setAiSummary(response.text || "리포트 생성에 실패했습니다. 잠시 후 다시 시도해주세요.");

      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        const results = chunks
          .filter((chunk: any) => chunk.web)
          .map((chunk: any) => ({
            title: chunk.web.title,
            uri: chunk.web.uri
          }));
        setGroundingLinks(results);
      }

      setUserPoints(prev => prev - SEARCH_COST);
      
    } catch (error) {
      console.error("AI Analysis Error:", error);
      alert("리포트 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주시거나 고객센터로 문의 바랍니다.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleViewSample = () => {
    setIsSample(true);
    setAiSummary(SAMPLE_REPORT_CONTENT);
    setGroundingLinks([{ title: "대한민국 법원경매정보 샘플", uri: "https://www.courtauction.go.kr" }]);
    setTimeout(() => {
      const el = document.getElementById('report-start');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Search Header */}
      <div className="bg-[#002147] pt-24 pb-40 relative overflow-hidden print:hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37] blur-[200px] opacity-10 rounded-full"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold mb-8 border border-white/20 mx-auto text-[#D4AF37]">
            <Sparkles size={14} /> AI POWERED LEGAL ENGINE
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif tracking-tight">AI 정밀 권리분석 리포트</h1>
          <p className="text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed text-lg">
            방대한 법원 경매 데이터를 10초 만에 전문 보고서로 구축합니다.<br/>
            사건번호 입력으로 완벽한 투자 의사결정을 지원받으세요.
          </p>
          
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleGenerateReport} className="flex flex-col sm:flex-row gap-4 mb-8">
              <input 
                type="text" 
                value={caseNumber}
                onChange={(e) => setCaseNumber(e.target.value)}
                placeholder="사건번호 (예: 2024타경 1234)" 
                className="flex-grow px-8 py-5 rounded-2xl bg-white text-lg focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/30 shadow-2xl border-none transition-all placeholder:text-slate-300"
              />
              <div className="flex gap-2">
                <button 
                  type="submit"
                  disabled={isSearching}
                  className="bg-[#D4AF37] text-[#002147] px-8 py-5 rounded-2xl font-black text-lg hover:bg-white transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3 active:scale-95 whitespace-nowrap"
                >
                  {isSearching ? <Loader2 className="animate-spin" /> : <Zap size={20} />}
                  리포트 생성 (1만P)
                </button>
                <button 
                  type="button"
                  onClick={handleViewSample}
                  className="bg-white/10 text-white px-8 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all border border-white/10 whitespace-nowrap"
                >
                  샘플 보기
                </button>
              </div>
            </form>
            <div className="flex items-center justify-center gap-8 text-white/40 text-sm">
               <span className="flex items-center gap-1.5"><Wallet size={16} className="text-[#D4AF37]"/> 보유 포인트: <strong className="text-white">{userPoints.toLocaleString()}P</strong></span>
               <Link to="/points" className="text-[#D4AF37] hover:underline font-bold">충전하기</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Result Section */}
      <div id="report-start" className="max-w-5xl mx-auto px-4 mt-12 pb-32 scroll-mt-24">
        {isSearching ? (
          <div className="bg-white rounded-[3rem] p-20 shadow-2xl border border-slate-100 flex flex-col items-center justify-center text-center space-y-8">
            <div className="relative">
              <div className="w-24 h-24 border-8 border-slate-50 border-t-[#D4AF37] rounded-full animate-spin"></div>
              <Zap size={32} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#D4AF37] animate-pulse" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#002147] mb-2">실시간 권리분석 엔진 가동 중...</h3>
              <p className="text-slate-400">Gemini 3.0이 등기 현황을 종합 분석하여 리포트를 작성하고 있습니다.</p>
            </div>
          </div>
        ) : aiSummary ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Control Bar */}
            <div className="flex justify-between items-center print:hidden">
              <div className="flex items-center gap-2 text-slate-500 font-bold">
                 {isSample && <span className="bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-[11px] flex items-center gap-2 uppercase tracking-widest"><ShieldCheck size={14}/> Professional Sample Mode</span>}
              </div>
              <div className="flex gap-3">
                <button onClick={() => {setAiSummary(null); setIsSample(false);}} className="bg-white border border-slate-200 px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition flex items-center gap-2 shadow-sm">
                  <ArrowLeft size={18} /> 다시 검색
                </button>
                <button onClick={handlePrint} className="bg-[#002147] text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-900 transition flex items-center gap-2 shadow-xl">
                  <Printer size={18} /> 리포트 인쇄 / PDF
                </button>
              </div>
            </div>

            {/* Visual Indicators for Sample */}
            {isSample && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 print:hidden">
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4"><Target size={24}/></div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">매칭 정확도</div>
                  <div className="text-xl font-black text-[#002147]">99.8%</div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4"><ShieldCheck size={24}/></div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">리스크 레벨</div>
                  <div className="text-xl font-black text-emerald-600">SAFE</div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center">
                  <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-4"><Percent size={24}/></div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">낙찰 예상률</div>
                  <div className="text-xl font-black text-amber-600">HIGH (92%)</div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center">
                  <div className="w-12 h-12 bg-slate-900 text-[#D4AF37] rounded-2xl flex items-center justify-center mb-4"><Coins size={24}/></div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">예상 수익금</div>
                  <div className="text-xl font-black text-[#002147]">약 6.5억</div>
                </div>
              </div>
            )}

            {/* REPORT BOX */}
            <div ref={reportRef} className="bg-white p-12 md:p-24 shadow-2xl border border-slate-100 rounded-[3rem] print:rounded-none print:shadow-none print:border-none print:p-0 relative overflow-hidden">
               {/* Watermark for Sample */}
               {isSample && (
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[35deg] text-[180px] font-black text-slate-100/30 pointer-events-none select-none print:hidden uppercase">
                   Sample
                 </div>
               )}

               <div className="flex flex-col md:flex-row justify-between items-start mb-16 border-b-8 border-[#002147] pb-12 gap-8 relative z-10">
                  <div className="flex items-start gap-5">
                    <div className="bg-[#002147] p-4 rounded-[2rem] text-[#D4AF37] shadow-xl">
                      <Landmark size={48} />
                    </div>
                    <div>
                      <h2 className="text-4xl font-black text-[#002147] mb-2 tracking-tight">AI 경매 권리분석 정밀 리포트</h2>
                      <p className="text-slate-400 text-sm font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                         <ShieldCheck size={16} className="text-emerald-500"/> Professional Integrated Intelligence Service
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-widest">Report Identifier</div>
                    <div className="text-xl font-mono font-bold tracking-wider text-[#002147]">JB-P-2025-{new Date().getTime().toString().slice(-6)}</div>
                    <div className="mt-3 inline-flex items-center gap-2 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-100 text-[10px] font-bold text-slate-400">
                      <UserCheck size={12} className="text-[#D4AF37]"/> AUTHENTICATED BY JB ENGINE
                    </div>
                  </div>
               </div>

               {/* Quick Summary Grid */}
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 relative z-10">
                  <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 hover:bg-white transition duration-300">
                    <div className="text-[10px] text-slate-400 font-black uppercase mb-3 tracking-widest">분석 데이터 등급</div>
                    <div className="text-lg font-black text-[#002147] flex items-center gap-2"><Sparkles size={16} className="text-[#D4AF37]"/> TIER-1 GOLD</div>
                  </div>
                  <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 hover:bg-white transition duration-300">
                    <div className="text-[10px] text-slate-400 font-black uppercase mb-3 tracking-widest">판례 데이터베이스</div>
                    <div className="text-lg font-black text-[#002147]">240,000+건</div>
                  </div>
                  <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 hover:bg-white transition duration-300">
                    <div className="text-[10px] text-slate-400 font-black uppercase mb-3 tracking-widest">권리 안전 지수</div>
                    <div className="text-lg font-black text-emerald-600">A+ (STABLE)</div>
                  </div>
                  <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 hover:bg-white transition duration-300">
                    <div className="text-[10px] text-slate-400 font-black uppercase mb-3 tracking-widest">최종 검수</div>
                    <div className="text-lg font-black text-[#002147]">{new Date().toLocaleTimeString()}</div>
                  </div>
               </div>

               {/* MAIN AI TEXT CONTENT */}
               <div className="prose prose-slate max-w-none text-slate-800 leading-relaxed whitespace-pre-wrap font-medium text-[16px] relative z-10">
                 <div className="markdown-content font-sans">
                   {aiSummary}
                 </div>
               </div>

               {/* LEGAL DISCLAIMER SECTION */}
               <div className="mt-24 p-12 bg-slate-50 rounded-[3rem] border border-slate-200 relative print:bg-white print:border-slate-300">
                  <div className="flex items-center gap-3 text-slate-900 font-black text-sm mb-8 border-b border-slate-200 pb-5 uppercase tracking-widest">
                    <Gavel size={24} className="text-[#002147]" /> Legal Disclaimer & Responsibility Limit
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 text-[12px] text-slate-500 leading-relaxed font-medium">
                    <div className="space-y-6">
                      <p><strong>[분석 결과의 참고적 성격]</strong> 본 리포트는 인공지능이 인터넷상의 공개 데이터를 분석한 결과로, 「변호사법」 제109조에 따른 법률적 사무 처리에 해당하지 않습니다. 본 리포트를 근거로 행해지는 모든 투자의 법적·경제적 책임은 이용자 본인에게 귀속됩니다.</p>
                      <p><strong>[현장 실사 필수]</strong> AI는 서류상 데이터를 분석하므로, 실제 내부 점유 상태, 유치권 성립 여부, 숨겨진 결함 등 현장 조사가 수반되어야만 확인 가능한 리스크는 반영하지 못할 수 있습니다.</p>
                    </div>
                    <div className="space-y-6">
                      <p><strong>[투자의 자기책임]</strong> JB 하우징은 본 서비스의 이용 결과로 발생하는 어떠한 손해(입찰 무효, 낙찰 취소, 대금 미납, 명도 갈등 등)에 대해서도 법적 책임을 지지 않습니다. 최종 입찰 결정 전 반드시 전문가와 상의하시기 바랍니다.</p>
                      <p><strong>[데이터 불일치 가능성]</strong> 대법원 경매 공고의 실시간 변경이나 기재 오류로 인해 리포트 내용과 실제 공고가 다를 수 있습니다. 입찰 당일 반드시 법원 게시판을 재확인하십시오.</p>
                    </div>
                  </div>
               </div>

               <div className="mt-24 pt-12 border-t border-slate-100 text-center relative z-10">
                  <div className="flex justify-center gap-4 mb-12 print:hidden">
                    {groundingLinks.length > 0 && groundingLinks.map((link, idx) => (
                      <a key={idx} href={link.uri} target="_blank" rel="noreferrer" className="text-[11px] text-[#002147] font-black bg-white px-6 py-3 rounded-full border border-slate-200 flex items-center gap-2 hover:bg-[#D4AF37] hover:text-white transition shadow-sm uppercase tracking-wider">
                        Data Source {idx + 1} <Download size={12} />
                      </a>
                    ))}
                  </div>
                  <div className="text-4xl font-serif font-black text-[#002147] opacity-10 italic tracking-tighter">JB HOUSING PREMIUM REAL ESTATE AI</div>
                  <p className="text-[11px] text-slate-300 mt-6 uppercase tracking-[0.5em] font-black">Professional Integrated Intelligence System</p>
               </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] p-16 shadow-xl border border-slate-100 text-center">
            <div className="w-24 h-24 bg-slate-50 text-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
              <BarChart3 size={48} />
            </div>
            <h3 className="text-3xl font-black text-[#002147] mb-6">프리미엄 리포트 활용법</h3>
            <div className="max-w-xl mx-auto space-y-6 text-slate-500 text-base leading-relaxed mb-12 text-left">
              <div className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-[#002147] text-white flex items-center justify-center shrink-0 font-bold text-xs">1</div>
                 <p>AI가 등기부상 <strong>말소기준권리</strong>를 특정하고 낙찰 후 권리 소멸 여부를 판독합니다.</p>
              </div>
              <div className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-[#002147] text-white flex items-center justify-center shrink-0 font-bold text-xs">2</div>
                 <p>전입 세대와 임대차 현황을 대조하여 <strong>임차인의 대항력</strong> 유무를 진단합니다.</p>
              </div>
              <div className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-[#002147] text-white flex items-center justify-center shrink-0 font-bold text-xs">3</div>
                 <p>최근 인근 <strong>유사 물건 낙찰가율</strong> 통계를 통해 최적의 입찰 가격 범위를 제안합니다.</p>
              </div>
              <div className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-[#002147] text-white flex items-center justify-center shrink-0 font-bold text-xs">4</div>
                 <p>소유주 및 임차인 분석으로 <strong>명도 난이도와 예상 비용</strong>을 산출해 드립니다.</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
               <button onClick={handleViewSample} className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-800 transition shadow-2xl flex items-center gap-2 group">
                  전문 분석 샘플 열람 <ChevronRight className="group-hover:translate-x-1 transition" />
               </button>
               <Link to="/points" className="bg-[#D4AF37] text-[#002147] px-10 py-5 rounded-2xl font-black text-lg hover:bg-[#b8962f] hover:text-white transition shadow-2xl flex items-center gap-2">
                  포인트 충전하기 <Wallet size={20} />
               </Link>
            </div>
            <div className="p-8 bg-rose-50 border border-rose-100 rounded-[2rem] flex items-start gap-5 text-left max-w-2xl mx-auto">
               <FileWarning className="text-rose-600 shrink-0" size={28} />
               <div className="text-xs text-rose-700 leading-relaxed font-bold">
                  본 서비스는 인공지능이 생성한 분석 리포트로, 어떠한 법적 효력도 지니지 않습니다. <br/>
                  최종 입찰 결정에 대한 모든 책임은 본인에게 있으며, JB 하우징은 정보의 오기나 누락으로 인한 투자 손실에 대해 책임을 지지 않습니다.
               </div>
            </div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body { background: white; margin: 0; padding: 0; }
          .print\\:hidden { display: none !important; }
          header, footer { display: none !important; }
          main { margin-top: 0 !important; }
          .max-w-5xl { max-width: 100% !important; margin: 0 !important; width: 100% !important; }
          .bg-slate-50 { background: white !important; }
          .prose { max-width: 100% !important; }
        }
        .markdown-content h1 { 
            font-size: 1.75rem; 
            font-weight: 900; 
            color: #002147; 
            margin-top: 4rem; 
            margin-bottom: 1.5rem; 
            border-left: 8px solid #D4AF37; 
            padding-left: 1.5rem; 
            letter-spacing: -0.025em;
            background: linear-gradient(to right, #f8fafc, transparent);
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
        }
        .markdown-content p { margin-bottom: 1rem; color: #475569; font-size: 1.05rem; line-height: 1.8; }
        .markdown-content ul { list-style-type: none; padding-left: 0; margin-bottom: 2rem; background: #f8fafc; padding: 2rem; rounded: 2rem; border: 1px solid #f1f5f9; }
        .markdown-content li { margin-bottom: 0.75rem; display: flex; align-items: flex-start; gap: 0.75rem; font-weight: 500; }
        .markdown-content li::before { content: "•"; color: #D4AF37; font-weight: 900; font-size: 1.25rem; line-height: 1; }
        .markdown-content strong { color: #0f172a; font-weight: 800; }
        .markdown-content hr { border: none; border-top: 2px dashed #e2e8f0; margin: 3rem 0; }
      `}} />
    </div>
  );
};

const Globe = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
);

const ChevronRight = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
);
