
import React, { useState } from 'react';
import { mockBiddingRequests } from '../data/mockData';
import { BiddingRequest } from '../types';
import { GoogleGenAI } from "@google/genai";
import { Handshake, ClipboardCheck, User, MapPin, CheckSquare, Zap, Loader2, Sparkles, MessageCircle, Info, ChevronRight, X, Smartphone, ArrowLeft, ShieldCheck, Gavel, Signature } from 'lucide-react';

export const BiddingServiceAgent: React.FC = () => {
  const [requests, setRequests] = useState<BiddingRequest[]>(mockBiddingRequests);
  const [selectedRequest, setSelectedRequest] = useState<BiddingRequest | null>(null);
  const [memo, setMemo] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [checklist, setChecklist] = useState({
    idCard: false,
    seal: false,
    poa: false,
    deposit: false
  });

  const handleOpenDetail = (req: BiddingRequest) => {
    setSelectedRequest(req);
    setMemo('');
    setChecklist({ idCard: false, seal: false, poa: false, deposit: false });
  };

  const generateAiReport = async () => {
    if (!selectedRequest) return;
    
    const allChecked = Object.values(checklist).every(v => v);
    if (!allChecked) {
      alert('필수 서류 체크리스트를 모두 완료해야 보고서 발행이 가능합니다.');
      return;
    }

    setIsGenerating(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `고객 ${selectedRequest.customerName}의 ${selectedRequest.caseNumber} 사건에 대해 전문 대리인이 다음과 같이 정밀 검토를 수행했습니다: "${memo}". 
        이를 바탕으로 고객에게 전달할 정중하고 신뢰감 있는 권리 분석 보고서를 작성해줘. 
        강조할 부분은 **굵게** 표시하고, 낙찰을 위한 마지막 응원 한마디를 포함해줘.
        또한 리포트 마지막에 "본 리포트는 담당 대리인의 현장 실사를 바탕으로 작성되었으며 법적 효력의 참고용입니다"라는 취지의 문구를 부드럽게 포함해줘.`,
      });

      const aiText = response.text || "분석 완료되었습니다.";
      
      setRequests(prev => prev.map(r => 
        r.id === selectedRequest.id 
        ? { ...r, status: 'VERIFIED', aiReportContent: aiText, agentNotes: memo } 
        : r
      ));
      
      alert('디지털 서명이 포함된 AI 리포트가 발행되었습니다.');
      setSelectedRequest(null);
    } catch (err) {
      console.error(err);
      alert('리포트 생성 중 오류가 발생했습니다.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-[#0f172a] min-h-screen pb-20">
      <header className="sticky top-0 z-50 bg-[#00152e]/80 backdrop-blur-md border-b border-white/10 px-6 py-6 flex justify-between items-center text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#C5A059] rounded-xl flex items-center justify-center text-[#002147] shadow-lg shadow-amber-900/20">
             <Smartphone size={22} />
          </div>
          <div>
             <h1 className="text-xl font-black font-serif tracking-tight">전문가 관제 센터</h1>
             <p className="text-[10px] font-black text-[#C5A059] uppercase tracking-widest">입찰파트너 에이전트 허브</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
           <span className="text-[11px] font-bold text-slate-400">실시간 연결됨</span>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-6 py-10 space-y-6">
        <div className="grid grid-cols-2 gap-4">
           <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-white">
              <div className="text-[10px] font-black text-[#C5A059] uppercase tracking-widest mb-2">검토 대기</div>
              <div className="text-3xl font-black">{requests.filter(r => r.status === 'REVIEWING').length}</div>
           </div>
           <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-white">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">처리 완료</div>
              <div className="text-3xl font-black">{requests.filter(r => r.status === 'VERIFIED' || r.status === 'COMPLETED').length}</div>
           </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest px-1">의뢰 목록</h2>
          {requests.map((req) => (
            <button 
              key={req.id} 
              onClick={() => handleOpenDetail(req)}
              className={`w-full text-left p-6 rounded-[2rem] border transition-all duration-300 relative overflow-hidden group ${
                req.status === 'REVIEWING' 
                ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                : 'bg-[#1e293b]/30 border-transparent opacity-50'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                 <div>
                    <div className="text-[10px] font-bold text-[#C5A059] mb-1">{req.caseNumber}</div>
                    <div className="text-lg font-black text-white">{req.customerName} <span className="text-xs font-medium text-slate-400">의뢰인</span></div>
                 </div>
                 <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                   req.status === 'VERIFIED' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                 }`}>
                   {req.status === 'VERIFIED' ? '검증 완료' : '검토 중'}
                 </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                 <MapPin size={14} className="text-[#D4AF37]" /> {req.propertyTitle}
              </div>
              <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 group-hover:text-[#D4AF37] transition" size={24} />
            </button>
          ))}
        </div>
      </div>

      {selectedRequest && (
        <div className="fixed inset-0 z-[100] bg-[#00152e] text-white flex flex-col overflow-y-auto animate-in slide-in-from-bottom-20 duration-500">
           <div className="sticky top-0 z-10 bg-[#00152e]/90 backdrop-blur-md px-6 py-8 border-b border-white/10 flex items-center justify-between">
              <button onClick={() => setSelectedRequest(null)} className="flex items-center gap-2 text-slate-400 font-bold"><ArrowLeft size={20}/> 뒤로 가기</button>
              <h3 className="text-lg font-black font-serif">의뢰 정밀 검토</h3>
              <div className="w-10 h-10"></div>
           </div>

           <div className="p-8 space-y-10">
              <div className="flex items-center gap-6">
                 <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center text-[#D4AF37] border border-white/10">
                    <User size={40} />
                 </div>
                 <div>
                    <h4 className="text-2xl font-black mb-1">{selectedRequest.customerName}</h4>
                    <p className="text-slate-400 text-sm font-medium">{selectedRequest.caseNumber}</p>
                 </div>
              </div>

              <div className="space-y-6">
                 <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <CheckSquare size={14} /> 필수 서류 및 입찰금 검증
                 </h5>
                 <div className="grid grid-cols-1 gap-4">
                    {[
                      { id: 'idCard', label: '신분증 원본 대조 완료' },
                      { id: 'seal', label: '인감증명서 진위 확인' },
                      { id: 'poa', label: '매수신청 위임장 확인' },
                      { id: 'deposit', label: '보증금 계좌 입금 확인' }
                    ].map((item) => (
                      <button 
                        key={item.id}
                        onClick={() => setChecklist(prev => ({ ...prev, [item.id]: !prev[item.id as keyof typeof checklist] }))}
                        className={`p-6 rounded-2xl flex items-center justify-between transition-all border-2 ${
                          checklist[item.id as keyof typeof checklist] 
                          ? 'bg-emerald-500 border-emerald-500 text-white' 
                          : 'bg-white/5 border-white/5 text-slate-400'
                        }`}
                      >
                         <span className="font-bold">{item.label}</span>
                         {checklist[item.id as keyof typeof checklist] && <ClipboardCheck size={20} />}
                      </button>
                    ))}
                 </div>
              </div>

              <div className="space-y-6">
                 <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <MessageCircle size={14} /> 대리인 정밀 소견 (리포트 반영)
                 </h5>
                 <textarea 
                   value={memo}
                   onChange={(e) => setMemo(e.target.value)}
                   placeholder="물건의 권리 관계, 명도 특이사항 등을 상세히 입력하세요."
                   className="w-full bg-white/5 border border-white/10 rounded-[2rem] p-6 text-lg focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/20 placeholder:text-slate-600 transition-all min-h-[150px]"
                 />
                 
                 <div className="bg-amber-50/5 border border-amber-500/20 p-6 rounded-2xl">
                    <div className="flex items-center gap-2 text-amber-500 text-xs font-bold mb-3 uppercase tracking-widest">
                       <Gavel size={14} /> 법적 면책 고지
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed">
                       전문가는 「공인중개사법」에 의거하여 성실히 권리분석을 수행해야 합니다. 허위 분석 또는 서류 미확인으로 인한 사고 발생 시 등록된 공제보험을 통해 배상 책임이 발생할 수 있습니다.
                    </p>
                 </div>

                 <button 
                    disabled={isGenerating || !memo}
                    onClick={generateAiReport}
                    className="w-full bg-[#D4AF37] text-[#002147] py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-3 shadow-2xl shadow-amber-900/40 active:scale-95 disabled:opacity-50 transition-all"
                 >
                    {isGenerating ? <Loader2 className="animate-spin" /> : <Signature size={24} />}
                    {isGenerating ? '리포트 생성 중...' : '디지털 서명 및 리포트 발송'}
                 </button>
              </div>

              <div className="bg-white/5 rounded-3xl p-8 border border-white/5 flex items-start gap-4">
                 <ShieldCheck className="text-emerald-500 shrink-0" size={24} />
                 <p className="text-[11px] text-slate-400 leading-relaxed">리포트 발송 시 고객에게 즉시 알림이 전송되며, 전문가의 성명과 등록번호가 공인된 인장으로 포함됩니다.</p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
