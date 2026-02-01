
import React, { useState, useRef, useEffect } from 'react';
import { FileText, Zap, Loader2, Scale, ShieldAlert, CheckCircle2, Printer, Download, ArrowLeft, Wallet, Info, Lock, Sparkles, AlertCircle, ShieldCheck, Search, ClipboardList, TrendingUp, Landmark, Gavel, FileWarning, BarChart3, Building2, MapPin, Target, Percent, Coins, UserCheck, ExternalLink, ChevronRight, ArrowRight, Flag, Award, MousePointer2 } from 'lucide-react';
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
*   **매각기일**: 2025년 06월 15일 10:00 (진행 중)
*   **물건유형**: 공동주택 (아파트)
*   **소재지**: 서울특별시 서초구 반포동 반포자이 102동 1502호

**2. 물건 현황**
*   **면적**: 전용면적 84.98㎡ (25.7평) / 공급면적 116.33㎡ (35평)
*   **구조**: 방 3개, 욕실 2개, 거실, 주방, 발코니 (남향, 판상형 로열층)

# [제 2 장 : 시세 및 가치 분석 보고]
---------------------------------------------------------
**1. 감정가 및 유찰 현황**
*   **감정가**: 3,600,000,000원 (2024.12 기준 평가)
*   **최저가**: 2,880,000,000원 (감정가 대비 80%, 1회 유찰)
*   **입찰보증금**: 288,000,000원 (10%)

**2. 시장 데이터 (실거래가 기반)**
*   **최근 실거래가**: 2025.03 기준 동일 평형 34.5억 ~ 35.8억 형성
*   **예상 가치 산정**: 본 물건은 15층 로열층으로 단지 내 선호도가 매우 높으며, 시세 대비 약 6~7억 원의 안전 마진이 확보된 상태입니다.

# [제 3 장 : 정밀 권리 분석 (Legal Review)]
---------------------------------------------------------
**1. 등기부 현황 및 말소기준권리**
*   **말소기준권리**: 2018.05.10 신한은행 근저당권 (채권액 12억 원)
*   **권리 소멸 여부**: 말소기준권리 이후 설정된 가압류(2021.03), 근저당(2022.06) 등 모든 등기상 권리는 낙찰 후 소멸(소멸주의)될 것으로 판단됨.

**[핵심 분석]** 본 사건은 권리 관계가 매우 깨끗하며, 인수될 보증금이나 권리가 전혀 없는 '클린 매물'입니다.

# [제 4 장 : 명도 및 사후 처리 전략]
---------------------------------------------------------
**1. 명도 예상 난이도: [낮음]**
*   소유주 겸 채무자 직접 점유 중
*   **예상 명도 기간**: 인도명령 신청 후 약 2.5개월
*   **예상 명도 비용**: 약 700만 원 선 가이드

# [제 5 장 : 투자 수익 시뮬레이션]
---------------------------------------------------------
**1. 목표 수익률**
*   **단기 매도 시**: 세전 수익 약 1.5억 원 예상
*   **임대 운용 시**: 보증금 1억 / 월세 450만 원 (수익률 약 4.2%)

# [제 6 장 : 종합 의견 및 전문가 조언]
---------------------------------------------------------
**종합 점수: 96 / 100 [강력 추천]**

**[최종 제언]** 시세 대비 감정가가 현실적으로 책정되어 있으며, 1회 유찰로 인해 가격 메리트가 극대화되었습니다. 2회차 매각기일에 낙찰받는 것을 강력 추천하며, 입찰가는 시세의 93% 선이 적절할 것으로 판단됩니다.
`;

export const AiAnalysis: React.FC = () => {
  const [caseNumber, setCaseNumber] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [groundingLinks, setGroundingLinks] = useState<GroundingResult[]>([]);
  const [isSample, setIsSample] = useState(false);
  const [userPoints, setUserPoints] = useState<number>(15000);
  const SEARCH_COST = 10000;

  useEffect(() => {
    const saved = localStorage.getItem('jb_user_points');
    if (saved) {
      setUserPoints(parseInt(saved, 10));
    }

    const handleUpdate = () => {
      const updated = localStorage.getItem('jb_user_points');
      if (updated) setUserPoints(parseInt(updated, 10));
    };
    window.addEventListener('jb_points_updated', handleUpdate);
    return () => window.removeEventListener('jb_points_updated', handleUpdate);
  }, []);

  const handleGenerateReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseNumber.trim()) {
      alert("사건번호를 입력해주세요.");
      return;
    }

    if (userPoints < SEARCH_COST) {
      alert(`포인트가 부족합니다. (현재: ${userPoints.toLocaleString()}P / 필요: ${SEARCH_COST.toLocaleString()}P)`);
      return;
    }

    setIsSearching(true);
    setAiSummary(null);
    setGroundingLinks([]);
    setIsSample(false);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `대한민국 대법원 법원경매정보를 바탕으로 "${caseNumber}" 사건의 정밀 분석 리포트를 작성해줘. 
        
        시각적으로 두드러져야 하므로 다음 규칙을 반드시 지켜줘:
        1. 각 장의 제목은 # [제 n 장 : 제목] 형식을 유지하고, 제목 전후에 여백을 충분히 둘 것.
        2. 아주 중요한 문장은 **[핵심 분석]**, **[주의 사항]**, **[최종 제언]** 으로 시작하고 해당 줄을 강조할 것.
        3. 수치 데이터(금액, 면적, 수익률)는 반드시 **굵게** 표시할 것.
        4. 종합 점수를 마지막에 100점 만점으로 표기하고 [강력 추천/추천/주의] 등급을 병기할 것.
        5. 가독성을 위해 문단 사이를 명확히 구분할 것.`,
        config: { tools: [{ googleSearch: {} }] },
      });

      const newTotal = userPoints - SEARCH_COST;
      localStorage.setItem('jb_user_points', newTotal.toString());
      window.dispatchEvent(new Event('jb_points_updated'));

      setAiSummary(response.text || "분석 결과를 생성하지 못했습니다.");
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        setGroundingLinks(chunks.filter((c: any) => c.web).map((c: any) => ({ title: c.web.title, uri: c.web.uri })));
      }
    } catch (error) {
      console.error(error);
      alert("분석 중 오류가 발생했습니다.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleViewSample = () => {
    setIsSample(true);
    setAiSummary(SAMPLE_REPORT_CONTENT);
    setGroundingLinks([{ title: "대한민국 법원경매정보 샘플", uri: "https://www.courtauction.go.kr" }]);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      {/* Top Banner */}
      <div className="bg-[#002147] pt-24 pb-36 relative overflow-hidden print:hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#D4AF37] blur-[220px] opacity-10 rounded-full"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-8 border border-white/20">
               <Sparkles size={14} className="text-[#D4AF37]" /> Advanced Legal Analysis Engine
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 font-serif tracking-tight leading-tight">
              AI 하이퍼 <span className="text-[#D4AF37]">권리분석</span> 리포트
            </h1>
            <p className="text-white/60 mb-12 text-lg font-medium leading-relaxed">
              사건번호 하나로 대법원 공고, 등기부, 실거래가를 통합 분석합니다.<br/>
              데이터가 말하는 가장 과학적인 입찰 전략을 경험하세요.
            </p>

            <form onSubmit={handleGenerateReport} className="flex flex-col sm:flex-row gap-3 mb-8">
              <input 
                type="text" 
                value={caseNumber}
                onChange={(e) => setCaseNumber(e.target.value)}
                placeholder="사건번호 입력 (예: 2024타경 1234)" 
                className="flex-grow px-8 py-5 rounded-2xl bg-white text-lg focus:outline-none focus:ring-8 focus:ring-[#D4AF37]/20 shadow-2xl transition-all border-none placeholder:text-slate-300"
              />
              <button 
                type="submit"
                disabled={isSearching}
                className="bg-[#D4AF37] text-[#002147] px-10 py-5 rounded-2xl font-black text-lg hover:bg-white transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3 active:scale-95"
              >
                {isSearching ? <Loader2 className="animate-spin" /> : <Zap size={20} />}
                {isSearching ? "분석중..." : "분석 시작 (10,000P)"}
              </button>
            </form>
            <div className="flex items-center justify-center gap-6 text-white/40 text-sm font-bold">
               <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                  <Wallet size={16} className="text-[#D4AF37]"/> 보유 포인트: {userPoints.toLocaleString()}P
               </span>
               <button onClick={handleViewSample} className="text-white hover:text-[#D4AF37] transition underline underline-offset-4 decoration-[#D4AF37]/50">샘플 리포트 열람</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* (나머지 리포트 렌더링 코드는 기존과 동일) */}
      <div className="max-w-5xl mx-auto px-4 -mt-16 pb-32 relative z-20">
        {isSearching ? (
          <div className="bg-white rounded-[3rem] p-24 shadow-2xl border border-slate-100 flex flex-col items-center justify-center text-center space-y-10">
            <div className="relative">
              <div className="w-28 h-28 border-8 border-slate-50 border-t-[#D4AF37] rounded-full animate-spin"></div>
              <Sparkles size={40} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#D4AF37] animate-pulse" />
            </div>
            <div className="space-y-3">
              <h3 className="text-3xl font-black text-[#002147]">AI 법률 분석 엔진 기동 중</h3>
              <p className="text-slate-400 font-medium leading-relaxed">대법원 공고 판독 및 등기부 기재 사항을 정밀 판독하고 있습니다.<br/>잠시만 기다려 주세요.</p>
            </div>
          </div>
        ) : aiSummary ? (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <div className="flex justify-between items-center print:hidden">
              <button onClick={() => setAiSummary(null)} className="flex items-center gap-2 text-slate-400 hover:text-[#002147] font-bold transition group">
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition" /> 다시 분석하기
              </button>
              <div className="flex gap-3">
                <button onClick={() => window.print()} className="bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50 transition shadow-sm">
                  <Printer size={18} /> PDF 저장 / 인쇄
                </button>
                <Link to="/consult" className="bg-[#002147] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-900 transition shadow-xl">
                  전문가 유선 상담 <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-[4rem] shadow-2xl border border-slate-100 overflow-hidden relative print:shadow-none print:border-slate-300">
               <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-[#002147] via-[#D4AF37] to-[#002147]"></div>
               <div className="p-12 md:p-24">
                  <div className="markdown-content-enhanced font-medium text-slate-800 leading-[1.8] text-[18px]">
                    {aiSummary.split('\n').map((line, idx) => {
                      if (line.startsWith('#')) return <h1 key={idx}>{line.replace('#', '').trim()}</h1>;
                      if (line.includes('**')) {
                        const parts = line.split('**');
                        return <p key={idx}>{parts.map((part, i) => i % 2 === 1 ? <strong key={i}>{part}</strong> : part)}</p>;
                      }
                      if (line.trim() === '---' || line.includes('-------')) return <hr key={idx} />;
                      return <p key={idx}>{line}</p>;
                    })}
                  </div>
               </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-[3.5rem] p-20 shadow-xl border border-slate-100 text-center animate-in fade-in duration-700">
            <div className="w-24 h-24 bg-slate-50 text-[#D4AF37] rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-inner">
              <ClipboardList size={54} />
            </div>
            <h3 className="text-3xl font-black text-[#002147] mb-6">AI 리포트가 드리는 특별한 인사이트</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
               <div className="p-8 bg-slate-50 rounded-[2.5rem] text-left border border-slate-100 hover:border-[#D4AF37]/30 transition group">
                  <h4 className="font-bold text-slate-900 mb-3 text-lg">권리 소멸 분석</h4>
                  <p className="text-sm text-slate-500">모든 권리를 전수 조사하여 낙찰 후 안전하게 말소되는지 판정합니다.</p>
               </div>
               <div className="p-8 bg-slate-50 rounded-[2.5rem] text-left border border-slate-100 hover:border-[#D4AF37]/30 transition group">
                  <h4 className="font-bold text-slate-900 mb-3 text-lg">대항력 분석</h4>
                  <p className="text-sm text-slate-500">전입일자와 확정일자를 대조하여 인수 보증금 유무를 확인합니다.</p>
               </div>
               <div className="p-8 bg-slate-50 rounded-[2.5rem] text-left border border-slate-100 hover:border-[#D4AF37]/30 transition group">
                  <h4 className="font-bold text-slate-900 mb-3 text-lg">낙찰가 제안</h4>
                  <p className="text-sm text-slate-500">실거래 데이터와 낙찰가율을 분석하여 최적의 가격을 제안합니다.</p>
               </div>
            </div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .markdown-content-enhanced h1 { font-size: 2.2rem; font-weight: 900; color: #002147; margin: 4rem 0 2rem; border-left: 12px solid #D4AF37; padding-left: 2rem; }
        .markdown-content-enhanced p { margin-bottom: 1.5rem; }
        .markdown-content-enhanced strong { color: #002147; font-weight: 900; background: rgba(212, 175, 55, 0.1); padding: 0 4px; border-radius: 4px; }
      `}} />
    </div>
  );
};
