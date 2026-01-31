
import React from 'react';
import { ShieldCheck, Lock, UserCheck, FileText, BadgeCheck, Scale } from 'lucide-react';

export const SafetySystem: React.FC = () => {
  return (
    <div className="bg-slate-50 pb-20">
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-[#002147] mb-6 font-serif underline decoration-[#D4AF37] decoration-4 underline-offset-8">안전 시스템</h1>
          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
            고객님의 소중한 자산을 지키기 위해 JB 하우징은 <br/>
            이중, 삼중의 안전 장치를 운영하고 있습니다.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: <ShieldCheck size={40} className="text-[#D4AF37]" />,
            title: '2억 원 공제보험 가입',
            desc: '모든 대리인은 매수신청대리 사고에 대비하여 기본 2억 원의 보증보험에 가입되어 있습니다.'
          },
          {
            icon: <UserCheck size={40} className="text-[#D4AF37]" />,
            title: '전문가 검증 시스템',
            desc: '공인중개사 자격 및 법원 등록 여부를 국토교통부 정보를 통해 100% 실시간 검증합니다.'
          },
          {
            icon: <Lock size={40} className="text-[#D4AF37]" />,
            title: '보안 전자 계약',
            desc: '위변조가 불가능한 전자 서명 계약을 통해 의뢰 내용과 책임을 명확히 기록합니다.'
          }
        ].map((item, i) => (
          <div key={i} className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all">
            <div className="mb-6 bg-slate-50 w-20 h-20 rounded-2xl flex items-center justify-center">{item.icon}</div>
            <h3 className="text-xl font-bold text-[#002147] mb-4">{item.title}</h3>
            <p className="text-slate-500 text-sm leading-6">{item.desc}</p>
          </div>
        ))}
      </div>

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
              분석 오류로 인해 발생한 손해에 대해 JB 하우징은 법적 책임을 집니다. 
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
