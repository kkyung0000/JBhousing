
import React, { useState, useEffect } from 'react';
import { Zap, Loader2, ArrowLeft, Wallet, Sparkles, ArrowRight, Printer, FileText, CheckCircle, Eye, Info } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Link, useNavigate } from 'react-router-dom';
import { dbService } from '../services/db';
import { User } from '../types';
import { mockAiSampleReport } from '../data/mockData';

export const AiAnalysis: React.FC = () => {
  const navigate = useNavigate();
  const [caseNumber, setCaseNumber] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isSample, setIsSample] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(dbService.getCurrentUser());
  const SEARCH_COST = 10000;

  useEffect(() => {
    const handleUpdate = () => {
      setCurrentUser(dbService.getCurrentUser());
    };
    window.addEventListener('jb_points_updated', handleUpdate);
    return () => window.removeEventListener('jb_points_updated', handleUpdate);
  }, []);

  const handleGenerateReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      alert("로그인 후 이용 가능합니다.");
      navigate('/login');
      return;
    }
    if (!caseNumber.trim()) {
      alert("사건번호를 입력해주세요.");
      return;
    }

    if (currentUser.points < SEARCH_COST) {
      alert(`포인트가 부족합니다. (현재: ${currentUser.points.toLocaleString()}P / 필요: ${SEARCH_COST.toLocaleString()}P)`);
      return;
    }

    setIsSearching(true);
    setAiSummary(null);
    setIsSample(false);

    try {
      const success = await dbService.deductPoints(currentUser.id, SEARCH_COST);
      if (!success) throw new Error("포인트 차감 실패");

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `당신은 대한민국 대법원 경매 전문 분석가입니다. 
        사건번호 "${caseNumber}"에 대한 [정밀 권리분석 리포트]를 작성하세요.
        리포트에는 다음 항목을 전문적인 어조로 포함하세요:
        1. 사건 개요 및 물건 현황
        2. 등기부등본상 권리 관계 분석 (말소기준권리 중심)
        3. 임차인 대항력 및 배당 관계 예측
        4. 예상 낙찰가 가이드라인
        5. 종합 투자 위험도 평가 (안전/주의/위험)
        
        답변은 반드시 구조화된 한국어로 작성하며, 법률적 검토 의견임을 명시하세요.`,
      });

      setAiSummary(response.text || "분석 결과를 생성하지 못했습니다.");
    } catch (error) {
      console.error(error);
      alert("분석 중 오류가 발생했습니다.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleShowSample = () => {
    setIsSearching(true);
    setAiSummary(null);
    
    // 시뮬레이션 로딩
    setTimeout(() => {
      setAiSummary(mockAiSampleReport);
      setIsSample(true);
      setIsSearching(false);
      setCaseNumber('2024타경 10245');
    }, 1000);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <div className="bg-[#002147] pt-24 pb-36 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C5A059] blur-[200px] opacity-10 rounded-full"></div>
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-white/20">
            <Zap size={14} className="text-[#C5A059]" /> AI Legal Analysis Terminal
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 font-serif leading-tight">AI 하이퍼 권리분석</h1>
          
          <form onSubmit={handleGenerateReport} className="flex flex-col sm:flex-row gap-3 mb-6">
            <input 
              type="text" 
              value={caseNumber}
              onChange={(e) => setCaseNumber(e.target.value)}
              placeholder="사건번호 입력 (예: 2024타경 1234)" 
              className="flex-grow px-8 py-5 rounded-2xl bg-white text-[#001A3D] shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#C5A059]/20 transition-all text-lg font-bold"
            />
            <button type="submit" disabled={isSearching} className="bg-[#C5A059] text-[#001A3D] px-10 py-5 rounded-2xl font-black text-lg shadow-xl shadow-amber-900/20 disabled:opacity-50 hover:bg-white active:scale-95 transition-all">
               {isSearching ? "분석중..." : `분석 시작 (${SEARCH_COST.toLocaleString()}P)`}
            </button>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-6 text-white/60">
             <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 text-xs font-bold">
                <Wallet size={16} className="text-[#C5A059]"/> 보유 포인트: {currentUser ? currentUser.points.toLocaleString() : 0} P
             </span>
             <button 
              onClick={handleShowSample}
              className="flex items-center gap-2 text-xs font-black text-[#C5A059] hover:text-white transition group"
             >
                <Eye size={16} className="group-hover:scale-110 transition" /> 샘플 보고서 보기 (무료)
             </button>
             {!currentUser && (
               <Link to="/login" className="text-xs font-bold text-white/40 hover:text-[#C5A059] hover:underline">로그인 후 이용 가능</Link>
             )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-16 pb-32 relative z-20">
        {isSearching ? (
          <div className="bg-white rounded-[3rem] p-24 shadow-2xl flex flex-col items-center border border-slate-100 animate-in fade-in zoom-in duration-500">
            <div className="relative mb-12">
               <Loader2 size={80} className="animate-spin text-[#C5A059]" />
               <Zap size={32} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#001A3D] animate-pulse" />
            </div>
            <h3 className="text-2xl font-black text-[#001A3D] mb-4">AI 법률 분석 엔진 가동 중</h3>
            <p className="text-slate-400 font-medium text-center">대법원 공고, 등기부등본, 실거래가 데이터를 바탕으로 <br/>최적의 권리분석 리포트를 생성하고 있습니다.</p>
          </div>
        ) : aiSummary ? (
          <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-8 duration-700">
             <div className="bg-slate-50 px-10 py-8 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-[#001A3D] rounded-2xl flex items-center justify-center text-[#C5A059]">
                      <FileText size={24} />
                   </div>
                   <div>
                      <h2 className="text-xl font-black text-[#001A3D]">{caseNumber} 정밀 리포트 {isSample && <span className="ml-2 bg-[#C5A059] text-[#001A3D] text-[10px] px-2 py-0.5 rounded-full uppercase tracking-tighter">Sample</span>}</h2>
                      <p className="text-xs text-slate-400 font-bold">Analysis Engine v1.50 (Gemini 3 Pro)</p>
                   </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => window.print()} className="bg-white border-2 border-slate-200 text-slate-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50 transition active:scale-95 text-sm">
                    <Printer size={18} /> 보고서 인쇄
                  </button>
                </div>
             </div>
             
             {isSample && (
               <div className="bg-amber-50 border-b border-amber-100 px-10 py-4 flex items-center gap-3">
                 <Info className="text-amber-500" size={18} />
                 <p className="text-xs font-bold text-amber-800">현재 보시는 리포트는 AI 권리분석 성능 확인을 위한 샘플 자료입니다.</p>
               </div>
             )}

             <div className="p-12 md:p-20 prose prose-slate max-w-none">
                <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl flex items-start gap-4 mb-12">
                   <CheckCircle className="text-emerald-500 shrink-0 mt-1" size={24} />
                   <div>
                      <h4 className="text-emerald-900 font-black mb-1">인공지능 초정밀 권리검토 완료</h4>
                      <p className="text-sm text-emerald-700 leading-relaxed font-medium">본 리포트는 실시간 공고 데이터와 AI 언어 모델을 결합하여 생성되었습니다. 최종 입찰 전 반드시 전문가의 현장 대조를 권장합니다.</p>
                   </div>
                </div>
                <div className="whitespace-pre-wrap leading-relaxed text-lg text-slate-700 font-medium ai-markdown-content">
                   {aiSummary}
                </div>
                <div className="mt-20 pt-10 border-t border-slate-100 text-center">
                   <p className="text-[10px] text-slate-300 font-black uppercase tracking-[0.3em] mb-4">Generated by BID PARTNER AI Terminal</p>
                   <Link to="/consult" className="inline-flex items-center gap-2 bg-[#001A3D] text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-900 transition active:scale-95 shadow-lg">
                      전문가 현장 분석 추가 의뢰 <ArrowRight size={18} />
                   </Link>
                </div>
             </div>
          </div>
        ) : (
          <div className="bg-white rounded-[3.5rem] p-16 md:p-24 shadow-xl border border-slate-100 text-center space-y-8">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-[#C5A059] shadow-inner">
               <Zap size={48} />
            </div>
            <div className="max-w-xl mx-auto">
               <h3 className="text-3xl font-black text-[#001A3D] mb-6 font-serif">AI 리포트 분석 안내</h3>
               <p className="text-slate-500 leading-relaxed font-medium">
                  사건번호만 입력하면 AI가 실시간으로 대법원 공고를 수집하여 
                  **말소기준권리, 임차인 대항력, 예상 낙찰가율**을 즉시 산출합니다. 
                  단 1분 만에 10페이지 분량의 핵심 권리분석을 확인하세요.
               </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
               {[
                 { title: '실시간 데이터', desc: '공고 즉시 분석 가능' },
                 { title: '법률 판례 연동', desc: '유사 판례 10만 건 학습' },
                 { title: '수익률 시뮬레이션', desc: '낙찰 이후 가치 예측' },
               ].map((item, i) => (
                 <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <div className="text-[#C5A059] font-black text-sm mb-2">{item.title}</div>
                    <div className="text-xs text-slate-400 font-bold">{item.desc}</div>
                 </div>
               ))}
            </div>
            
            <button 
              onClick={handleShowSample}
              className="mt-12 inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-[#C5A059] hover:text-[#001A3D] transition shadow-lg"
            >
              분석 결과 샘플 보기 <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
      
      <style>{`
        .ai-markdown-content h1 { font-size: 2rem; font-weight: 900; color: #001A3D; margin-bottom: 1.5rem; }
        .ai-markdown-content h2 { font-size: 1.5rem; font-weight: 800; color: #001A3D; margin-top: 2rem; margin-bottom: 1rem; border-left: 4px solid #C5A059; padding-left: 1rem; }
        .ai-markdown-content h3 { font-size: 1.25rem; font-weight: 800; color: #001A3D; margin-top: 1.5rem; margin-bottom: 0.75rem; }
        .ai-markdown-content strong { color: #001A3D; font-weight: 900; }
        .ai-markdown-content hr { border: 0; border-top: 1px solid #e2e8f0; margin: 2rem 0; }
      `}</style>
    </div>
  );
};
