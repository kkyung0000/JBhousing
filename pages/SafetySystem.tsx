
import React from 'react';
import { ShieldCheck, Lock, UserCheck, FileText, BadgeCheck, Scale, Gavel, Landmark } from 'lucide-react';

export const SafetySystem: React.FC = () => {
  return (
    <div className="bg-slate-50 pb-20">
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-[#002147] mb-6 font-serif underline decoration-[#D4AF37] decoration-4 underline-offset-8">안전 및 규정 준수</h1>
          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
            (주) JB 하우징은 관계 법령을 철저히 준수하며 <br/>
            고객님의 자산을 보호하기 위한 법적 장치를 투명하게 공개합니다.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: <ShieldCheck size={40} className="text-[#D4AF37]" />,
            title: '2억 원 공제보험 가입',
            desc: '모든 대리인은 매수신청대리 사고에 대비하여 한국공인중개사협회 2억 원 보증보험에 가입되어 있습니다.'
          },
          {
            icon: <UserCheck size={40} className="text-[#D4AF37]" />,
            title: '법원 등록 공식 업체',
            desc: '지방법원에 정식 등록된 매수신청대리 업체로서 법적 자격 요건을 완벽히 갖추고 있습니다.'
          },
          {
            icon: <Lock size={40} className="text-[#D4AF37]" />,
            title: '수수료 규정 준수',
            desc: '공인중개사법에 따른 법정 수수료 요율(상담비 50만 원, 낙찰 시 1~1.5%)을 엄격히 준수합니다.'
          }
        ].map((item, i) => (
          <div key={i} className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all">
            <div className="mb-6 bg-slate-50 w-20 h-20 rounded-2xl flex items-center justify-center">{item.icon}</div>
            <h3 className="text-xl font-bold text-[#002147] mb-4">{item.title}</h3>
            <p className="text-slate-500 text-sm leading-6">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Registration Proof UI */}
      <section className="max-w-7xl mx-auto px-4 mb-20">
         <div className="bg-white border border-slate-200 rounded-[3rem] p-12 shadow-inner overflow-hidden flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
               <h2 className="text-3xl font-bold text-[#002147] mb-6">매수신청대리인 등록 정보</h2>
               <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                     <Landmark className="text-[#D4AF37]" />
                     <div>
                        <div className="text-xs text-slate-400 font-bold">등록 법원</div>
                        <div className="font-bold">전주지방법원 본원</div>
                     </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                     <BadgeCheck className="text-[#D4AF37]" />
                     <div>
                        <div className="text-xs text-slate-400 font-bold">등록 번호</div>
                        <div className="font-bold">제 12-23-45호</div>
                     </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                     <Scale className="text-[#D4AF37]" />
                     <div>
                        <div className="text-xs text-slate-400 font-bold">자격 종류</div>
                        <div className="font-bold">공인중개사 (매수신청대리인 등록)</div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="lg:w-1/2 w-full">
               <div className="bg-amber-50 rounded-[2rem] p-8 border border-amber-200 relative">
                  <div className="absolute top-4 right-6 opacity-10">
                    <Gavel size={120} />
                  </div>
                  <h4 className="font-black text-amber-900 mb-4 flex items-center gap-2">
                    <ShieldCheck size={20} /> 전문가의 약속
                  </h4>
                  <p className="text-sm text-amber-800 leading-relaxed font-medium">
                    "JB 하우징은 불법적인 컨설팅이나 자격 없는 자의 대리 업무를 철저히 배격합니다. 모든 입찰 대행은 법원 등록 공인중개사가 직접 수행하며, 의뢰인에게 제공되는 모든 리포트는 투명한 근거 자료를 바탕으로 작성됨을 약속드립니다."
                  </p>
                  <div className="mt-8 pt-6 border-t border-amber-200 text-right">
                     <span className="font-serif text-xl font-bold text-amber-900">대표이사 김종필 (인)</span>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-[#002147] rounded-[3rem] p-12 text-white flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/3">
            <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mx-auto">
               <Scale size={64} className="text-[#D4AF37]" />
            </div>
          </div>
          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold mb-6">책임 권리 분석 리포트</h2>
            <p className="opacity-70 mb-8 leading-relaxed">
              분석 오류로 인해 발생한 재산상 손해에 대해 JB 하우징은 법령이 정한 범위 내에서 책임을 집니다. 
              단순히 서류를 읽어주는 서비스가 아닌, 자산의 가치를 보호하는 전문가의 책임을 약속합니다.
            </p>
            <div className="flex flex-wrap gap-4">
               <span className="flex items-center gap-1 text-xs font-bold bg-white/10 px-3 py-1 rounded-full"><BadgeCheck size={14}/> 법률 검토 완료</span>
               <span className="flex items-center gap-1 text-xs font-bold bg-white/10 px-3 py-1 rounded-full"><BadgeCheck size={14}/> 현장 실사 보고서</span>
               <span className="flex items-center gap-1 text-xs font-bold bg-white/10 px-3 py-1 rounded-full"><BadgeCheck size={14}/> 예상 배당표 제공</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
