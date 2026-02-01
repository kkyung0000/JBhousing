
import React from 'react';
import { RefreshCcw, ShieldCheck, AlertCircle, XCircle, CheckCircle2, Scale, Landmark, Gavel, Coins } from 'lucide-react';

export const RefundPolicy: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pb-20">
      <section className="bg-[#002147] py-24 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 blur-[100px] rounded-full"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="flex items-center gap-3 text-[#D4AF37] mb-6 font-black uppercase tracking-widest text-xs">
            <RefreshCcw size={16} /> Refund & Liability
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 font-serif leading-tight">
            환불 및 과실배상 규정
          </h1>
          <p className="text-lg opacity-60 font-medium">JB 하우징은 투명한 환불 정책과 책임 있는 과실 배상으로 신뢰를 쌓습니다.</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        {/* Points & AI Report Refund */}
        <div className="mb-20">
          <h2 className="text-2xl font-black text-[#002147] mb-8 flex items-center gap-3">
            <Coins className="text-[#D4AF37]" /> 포인트 및 AI 리포트 환불
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
              <h4 className="font-black text-[#002147] mb-4 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-emerald-500" /> 환불 가능 대상
              </h4>
              <ul className="text-sm text-slate-500 space-y-4 font-medium">
                <li className="flex gap-2">
                  <span className="text-[#D4AF37] font-black">01.</span>
                  <span>결제 후 <strong>7일 이내</strong>이며 단 1포인트도 사용하지 않은 경우 (전액 환불)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#D4AF37] font-black">02.</span>
                  <span>시스템 오류로 인해 AI 분석 리포트가 정상 발행되지 않은 경우</span>
                </li>
              </ul>
            </div>
            <div className="bg-rose-50/30 p-8 rounded-[2.5rem] border border-rose-100">
              <h4 className="font-black text-rose-700 mb-4 flex items-center gap-2">
                <XCircle size={18} className="text-rose-500" /> 환불 불가 사유
              </h4>
              <ul className="text-sm text-slate-500 space-y-4 font-medium">
                <li className="flex gap-2">
                  <span className="text-rose-500 font-black">•</span>
                  <span><strong>AI 정밀 리포트를 1회 이상 열람</strong>한 경우 (디지털 콘텐츠 특성상 환불 불가)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-rose-500 font-black">•</span>
                  <span>무료 이벤트로 지급된 포인트 혹은 보너스 포인트</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bidding Agency Refund */}
        <div className="mb-20">
          <h2 className="text-2xl font-black text-[#002147] mb-8 flex items-center gap-3">
            <Scale className="text-[#D4AF37]" /> 입찰 대리 위임료 환불 (위약금)
          </h2>
          <div className="bg-white border border-slate-200 rounded-[3rem] overflow-hidden shadow-sm">
             <div className="p-10 border-b border-slate-100 bg-slate-50/50">
                <p className="text-sm text-slate-500 font-medium">입찰 대리 업무는 전문가 배정 및 서류 검토 비용이 선발생하므로 취소 시점에 따라 위약금이 차등 적용됩니다.</p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                <div className="p-8 text-center">
                   <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">입찰 3일 전</div>
                   <div className="text-xl font-black text-[#002147]">100% 환불</div>
                   <div className="text-xs text-slate-400 mt-2">행정 수수료 제외</div>
                </div>
                <div className="p-8 text-center bg-amber-50/30">
                   <div className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-2">입찰 2일 전</div>
                   <div className="text-xl font-black text-amber-700">50% 환불</div>
                   <div className="text-xs text-amber-500 mt-2">전문가 배정 위약금</div>
                </div>
                <div className="p-8 text-center bg-rose-50/30">
                   <div className="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-2">입찰 전일/당일</div>
                   <div className="text-xl font-black text-rose-700">환불 불가</div>
                   <div className="text-xs text-rose-500 mt-2">서류 제출 완료</div>
                </div>
             </div>
          </div>
        </div>

        {/* Liability Compensation */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 border-b-2 border-[#D4AF37] pb-4">
            <ShieldCheck className="text-[#D4AF37]" size={28} />
            <h2 className="text-2xl font-black text-[#002147]">과실 배상 및 보증 안내</h2>
          </div>
          <div className="bg-[#002147] rounded-[3rem] p-12 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/20 blur-3xl rounded-full"></div>
            <div className="relative z-10">
               <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-[#D4AF37]">
                     <Gavel size={32} />
                  </div>
                  <div>
                     <h4 className="text-2xl font-black">2억 원 공제보험 보증</h4>
                     <p className="text-xs opacity-50 font-medium uppercase tracking-widest">Professional Liability Insurance</p>
                  </div>
               </div>
               <p className="opacity-70 leading-relaxed font-medium mb-10">
                 "회사"는 매수신청대리 사무 수행 중 고의 또는 중대한 과실로 인하여 의뢰인에게 직접적인 재산상 손해를 입힌 경우, 관계 법령에 따라 가입된 <strong>2억 원 한도의 공제(보증보험)</strong>를 통해 손해액을 배상합니다.
               </p>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold opacity-80">
                  <div className="flex items-start gap-2">
                     <AlertCircle size={16} className="text-[#D4AF37] shrink-0" />
                     <span>등기부상 나타나지 않는 특수 권리분석 누락으로 인한 인수 보증금 발생 시</span>
                  </div>
                  <div className="flex items-start gap-2">
                     <AlertCircle size={16} className="text-[#D4AF37] shrink-0" />
                     <span>대리인의 입찰 서류 작성 실수로 인한 입찰 무효 시 위임료 환불 및 배상</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
