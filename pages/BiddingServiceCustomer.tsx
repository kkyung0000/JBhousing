
import React, { useState } from 'react';
import { mockBiddingRequests } from '../data/mockData';
import { BiddingRequest } from '../types';
import { Handshake, FileUp, ClipboardList, CheckCircle2, Loader2, Sparkles, ArrowRight, ShieldCheck, Download, Info, Mail, Zap, Trash2, EyeOff, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BiddingServiceCustomer: React.FC = () => {
  const [requests, setRequests] = useState<BiddingRequest[]>(mockBiddingRequests);
  const activeRequest = requests[0];

  const statusMap = {
    'PENDING': { label: '접수완료', step: 1, color: 'text-slate-400' },
    'REVIEWING': { label: '서류검토중', step: 2, color: 'text-amber-500' },
    'VERIFIED': { label: '검토완료', step: 3, color: 'text-emerald-500' },
    'COMPLETED': { label: '입찰완료', step: 4, color: 'text-[#D4AF37]' },
  };

  const currentStatus = statusMap[activeRequest.status];

  const handleDeleteDocument = (type: string) => {
    if (window.confirm('서류를 서버에서 즉시 영구 파기하시겠습니까? 파기 후에는 입찰 대리가 불가능할 수 있습니다.')) {
      alert(`${type} 서류가 안전하게 파기되었습니다.`);
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <section className="bg-[#002147] pt-24 pb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37] blur-[180px] opacity-10 rounded-full"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-6 border border-white/20">
                <Handshake size={14} className="text-[#D4AF37]" /> Bidding Partner Service
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-4 font-serif">내 입찰 대리 현황</h1>
              <p className="opacity-60 font-medium">실시간으로 진행 상태를 확인하고 전문가의 분석 보고서를 받아보세요.</p>
            </div>
            <div className="flex gap-4">
              <Link to="/consult" className="bg-[#D4AF37] text-[#002147] px-8 py-4 rounded-2xl font-black hover:bg-white transition flex items-center gap-2 shadow-xl">
                신규 대리 신청 <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 -mt-16 pb-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-2 space-y-10">
            {/* 진행 프로세스 카드 */}
            <div className="bg-white rounded-[3rem] p-10 md:p-12 shadow-2xl border border-slate-100 relative overflow-hidden">
               <div className="flex justify-between items-center mb-12">
                  <h2 className="text-2xl font-black text-[#002147] flex items-center gap-3">
                    <ClipboardList className="text-[#D4AF37]" /> 실시간 진행 프로세스
                  </h2>
                  <div className={`px-4 py-2 rounded-full text-xs font-black bg-slate-50 border border-slate-100 ${currentStatus.color}`}>
                    {currentStatus.label}
                  </div>
               </div>

               <div className="relative flex justify-between items-center max-w-2xl mx-auto mb-16">
                  <div className="absolute h-1 bg-slate-100 w-full top-1/2 -translate-y-1/2 z-0"></div>
                  <div className="absolute h-1 bg-[#D4AF37] transition-all duration-1000 top-1/2 -translate-y-1/2 z-0" style={{ width: `${(currentStatus.step - 1) * 33.3}%` }}></div>
                  
                  {[1, 2, 3, 4].map((s) => (
                    <div key={s} className="relative z-10 flex flex-col items-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${
                        s <= currentStatus.step 
                        ? 'bg-[#002147] border-[#D4AF37] text-white' 
                        : 'bg-white border-slate-100 text-slate-300'
                      }`}>
                        {s < currentStatus.step ? <CheckCircle2 size={24} /> : <span className="font-black">{s}</span>}
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${s <= currentStatus.step ? 'text-[#002147]' : 'text-slate-300'}`}>
                        {Object.values(statusMap).find(m => m.step === s)?.label}
                      </span>
                    </div>
                  ))}
               </div>

               <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">대상 물건</div>
                        <div className="text-lg font-black text-[#002147] mb-4">{activeRequest.propertyTitle}</div>
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
                           <Info size={14} /> 사건번호: <span className="text-slate-600">{activeRequest.caseNumber}</span>
                        </div>
                     </div>
                     <div className="text-right">
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">신청일자</div>
                        <div className="font-bold text-slate-600">{activeRequest.submittedAt}</div>
                     </div>
                  </div>
               </div>
            </div>

            {/* AI 리포트 섹션 */}
            {activeRequest.aiReportContent ? (
              <div className="bg-white rounded-[3rem] p-10 md:p-12 shadow-2xl border border-slate-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition duration-700">
                  <Sparkles size={120} className="text-[#D4AF37]" />
                </div>
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-[#D4AF37] shadow-xl">
                      <Zap size={24} fill="currentColor" />
                   </div>
                   <div>
                      <h2 className="text-2xl font-black text-[#002147]">전문가 AI 분석 보고서</h2>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Verification Complete</p>
                   </div>
                </div>
                <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 text-slate-700 leading-relaxed font-medium text-lg italic relative">
                  <span className="absolute -top-4 -left-2 text-6xl text-slate-200 font-serif">"</span>
                  {activeRequest.aiReportContent}
                  <div className="mt-10 pt-6 border-t border-slate-200 flex justify-between items-center opacity-60">
                     <div className="text-xs font-bold">대리인: 김종필 (전주지방법원 등록 12-23-45)</div>
                     <div className="font-serif italic text-lg text-[#002147]">JB Housing Signed</div>
                  </div>
                </div>
                <div className="mt-8 flex justify-between items-center">
                   <div className="text-[10px] text-slate-400 font-medium">본 리포트는 대리인의 현장 분석을 기초로 AI가 생성한 참고 자료입니다.</div>
                   <button className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-[#002147] transition">
                      <Download size={18} /> PDF 다운로드
                   </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-[3rem] p-16 shadow-2xl border border-slate-100 text-center border-dashed">
                 <Loader2 size={48} className="mx-auto text-slate-200 animate-spin mb-6" />
                 <h3 className="text-xl font-black text-slate-400 uppercase tracking-widest">분석 보고서 생성 중</h3>
                 <p className="text-sm text-slate-300 mt-2">대리인이 서류 검토를 완료하면 AI 리포트가 이곳에 발행됩니다.</p>
              </div>
            )}
          </div>

          <div className="space-y-8">
            {/* 스마트 서류함 */}
            <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-slate-100">
               <h3 className="text-xl font-black text-[#002147] mb-8 flex items-center gap-3">
                 <FileUp className="text-[#D4AF37]" /> 스마트 서류함
               </h3>
               
               {/* 개인정보 보안 가이드 */}
               <div className="bg-amber-50 p-4 rounded-2xl mb-6 flex items-start gap-3 border border-amber-100">
                  <EyeOff size={16} className="text-amber-600 mt-1 shrink-0" />
                  <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
                    주민등록번호 뒷자리는 반드시 마스킹 처리 후 업로드하세요. <br/>
                    서류는 입찰 완료 후 24시간 내 자동 파기됩니다.
                  </p>
               </div>

               <div className="space-y-4">
                  {activeRequest.documents.map((doc, i) => (
                    <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-[#D4AF37]/30 transition">
                       <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                              doc.status === 'uploaded' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                            }`}>
                              {doc.status === 'uploaded' ? <CheckCircle2 size={18} /> : <Info size={18} />}
                            </div>
                            <div className="text-sm font-bold text-slate-700">
                               {doc.type === 'id_card' ? '신분증 사본' : doc.type === 'seal_certificate' ? '인감증명서' : '매수신청 위임장'}
                            </div>
                          </div>
                          <button className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border transition ${
                            doc.status === 'uploaded' ? 'border-slate-200 text-slate-400' : 'bg-[#D4AF37] border-transparent text-white'
                          }`}>
                            {doc.status === 'uploaded' ? '수정' : '업로드'}
                          </button>
                       </div>
                       {doc.status === 'uploaded' && (
                          <button 
                            onClick={() => handleDeleteDocument(doc.type)}
                            className="w-full flex items-center justify-center gap-2 py-2 text-[10px] font-bold text-rose-400 hover:text-rose-600 transition border-t border-slate-100 mt-2"
                          >
                             <Trash2 size={12} /> 서류 즉시 영구 파기
                          </button>
                       )}
                    </div>
                  ))}
               </div>
               
               <div className="mt-8 p-6 bg-[#002147] rounded-2xl text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <Lock className="text-[#D4AF37]" size={20} />
                    <span className="text-xs font-bold uppercase tracking-widest">AES-256 Encryption</span>
                  </div>
                  <p className="text-[11px] opacity-60 leading-relaxed">JB 하우징은 군사용 수준의 보안 프로토콜을 사용하여 귀하의 법적 서류를 암호화하여 보관합니다.</p>
               </div>
            </div>

            <div className="bg-[#D4AF37] rounded-[3rem] p-10 text-[#002147] shadow-2xl shadow-amber-900/20">
               <h4 className="text-xl font-black mb-4">전문가 핫라인</h4>
               <p className="text-sm opacity-80 mb-8 font-medium leading-relaxed">입찰 관련 궁금한 사항은 담당 전문가에게 즉시 문의하세요.</p>
               <div className="space-y-3">
                  <a href="tel:01027873456" className="w-full bg-[#002147] text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-slate-900 transition active:scale-95">
                    <Mail size={18} /> 전문가 상담 연결
                  </a>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
