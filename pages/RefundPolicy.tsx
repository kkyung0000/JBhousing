
import React from 'react';
import { ShieldCheck, RefreshCcw, Scale, AlertCircle, CheckCircle2, FileWarning, Landmark, Gavel, XCircle } from 'lucide-react';

export const RefundPolicy: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header Section */}
      <section className="bg-[#002147] py-20 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 blur-[100px] rounded-full"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37] px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase text-[#002147] mb-6">
            Legal & Compliance
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-serif">환불 및 과실 배상 규정</h1>
          <p className="text-lg opacity-70 max-w-2xl mx-auto leading-relaxed font-light">
            JB 하우징은 관련 법령을 준수하며, 서비스 남용 방지와 <br className="hidden md:block"/>
            책임 있는 대리 업무 수행을 위해 엄격한 환불 정책을 시행합니다.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-16">
          
          {/* Section 1: Tightened Refund Policy */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 border-b-2 border-[#D4AF37] pb-4">
              <RefreshCcw className="text-[#D4AF37]" size={28} />
              <h2 className="text-2xl font-bold text-[#002147]">01. 포인트 및 대리입찰 환불 규정</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 relative">
                <h4 className="font-bold text-[#002147] mb-4 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-600" /> 조건부 환불 (엄격 적용)
                </h4>
                <ul className="text-sm text-slate-600 space-y-4">
                  <li className="flex gap-2">
                    <span className="text-[#D4AF37] font-bold">1.</span> 
                    <span>충전 후 <strong>7일 이내</strong>이며 사용 내역(리포트 열람, 상담 등)이 전무한 경우 (위약금 10% 공제 후 환불)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#D4AF37] font-bold">2.</span> 
                    <span>대리입찰 신청 후 <strong>전문가 배정 이전</strong> 취소 시 (행정 수수료 3만원 공제 후 환불)</span>
                  </li>
                </ul>
              </div>
              <div className="bg-rose-50/50 p-8 rounded-3xl border border-rose-100 relative">
                <h4 className="font-bold text-rose-700 mb-4 flex items-center gap-2">
                  <XCircle size={18} className="text-rose-600" /> 환불 불가 사유 (No-Refund)
                </h4>
                <ul className="text-sm text-slate-600 space-y-4">
                  <li className="flex gap-2">
                    <span className="text-rose-600 font-bold">•</span> 
                    <span><strong>디지털 콘텐츠(권리분석 리포트)</strong>를 1회 이상 열람하거나 다운로드한 경우</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-rose-600 font-bold">•</span> 
                    <span><strong>입찰 기일 2일 전(D-2) 00:00</strong> 이후에는 준비 공정 착수로 인해 환불 불가</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-rose-600 font-bold">•</span> 
                    <span>낙찰 후 단순 변심으로 인한 입찰 포기 및 대금 미납 시</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="p-6 bg-slate-900 text-white rounded-2xl flex items-start gap-4 shadow-xl">
              <AlertCircle className="text-[#D4AF37] shrink-0" size={24} />
              <div className="text-xs leading-relaxed opacity-80">
                <strong>[행정 위약금 안내]</strong> 결제 수수료 및 관리 비용 발생으로 인해 단순 변심에 의한 포인트 환불 시 <strong>결제 금액의 10%가 위약금으로 자동 공제</strong>됩니다. 이는 서비스 노쇼 및 악의적 결제 취소 방지를 위한 최소한의 장치입니다.
              </div>
            </div>
          </div>

          {/* Section 2: Compensation Policy */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 border-b-2 border-[#D4AF37] pb-4">
              <Scale className="text-[#D4AF37]" size={28} />
              <h2 className="text-2xl font-bold text-[#002147]">02. 매수신청대리 과실 책임 및 배상</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white border-2 border-slate-100 p-8 rounded-[2rem] shadow-sm relative overflow-hidden">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                    <ShieldCheck size={32} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#002147]">공인중개사법 기반 배상 제도</h4>
                    <p className="text-xs text-slate-400 mt-1 uppercase tracking-tighter">Certified Professional Indemnity Insurance</p>
                  </div>
                </div>
                
                <p className="text-sm text-slate-600 leading-relaxed mb-8">
                  JB 하우징의 모든 대리인은 <strong>「매수신청대리인 등록 규칙」 제11조</strong>에 따라 손해배상책임을 보장하기 위해 <strong>2억 원 이상의 공제(보증보험)</strong>에 가입되어 있습니다. 대리인의 고의 또는 중대한 과실로 인하여 의뢰인에게 직접적인 재산상 손해를 입힌 경우, 관계 법령에 따라 배상합니다.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <Landmark size={20} className="text-[#002147] shrink-0" />
                    <div>
                      <div className="text-sm font-bold text-[#002147] mb-1">배상 인정 범위</div>
                      <div className="text-xs text-slate-500 leading-relaxed">등기부상 명백한 권리(대항력 등)의 분석 누락으로 인해 낙찰자가 추가로 부담하게 된 직접 손해액</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <Gavel size={20} className="text-[#002147] shrink-0" />
                    <div>
                      <div className="text-sm font-bold text-[#002147] mb-1">배상 청구 절차</div>
                      <div className="text-xs text-slate-500 leading-relaxed">법원 판단 또는 한국공인중개사협회 공제심의위원회의 의결을 통해 과실 비율 확정 후 지급</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Exclusion List (Defense) */}
              <div className="bg-amber-50/50 p-10 rounded-[3rem] border border-amber-100">
                <h3 className="text-xl font-bold text-[#002147] mb-6 flex items-center gap-2">
                  <AlertCircle className="text-amber-600" /> 면책 사항 (배상 청구 불가)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 text-[13px] text-slate-600 leading-relaxed">
                  <div className="space-y-3">
                    <p className="flex gap-2"><strong>•</strong> <span>법원 매각물건명세서의 오기, 서류 누락 등 국가 기관의 원천적 데이터 오류</span></p>
                    <p className="flex gap-2"><strong>•</strong> <span>건물 내부의 누수, 결로, 보일러 고장 등 점유자 협조 없이는 확인 불가능한 내부 하자</span></p>
                    <p className="flex gap-2"><strong>•</strong> <span>낙찰 이후 인근 부동산 시세 변동 등 시장 상황에 따른 투자 손실</span></p>
                  </div>
                  <div className="space-y-3">
                    <p className="flex gap-2"><strong>•</strong> <span>의뢰인이 고의로 정보를 누락하거나 허위 서류를 제출하여 발생한 입찰 무효</span></p>
                    <p className="flex gap-2"><strong>•</strong> <span>분석 시점 이후 기일 연기, 변경 과정에서 발생한 새로운 권리 관계 변동</span></p>
                    <p className="flex gap-2"><strong>•</strong> <span>명도 과정에서 발생하는 통상적인 이사비 및 강제집행 실비 부담</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="text-center py-10 border-t border-slate-100">
            <p className="text-slate-400 text-sm mb-8 font-medium italic">"안전한 투자는 명확한 규정 이해에서 시작됩니다."</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="tel:063-715-1213" className="bg-[#002147] text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-900 transition shadow-2xl shadow-slate-200 flex items-center justify-center gap-2">
                법률/보증 상담 센터
              </a>
              <button className="bg-white border-2 border-slate-100 text-slate-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-50 transition">
                1:1 문의 (법무팀)
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
