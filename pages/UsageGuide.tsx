
import React from 'react';
import { Search, CreditCard, ClipboardCheck, Scale, PartyPopper, ArrowRight, Clock, AlertCircle } from 'lucide-react';

export const UsageGuide: React.FC = () => {
  const steps = [
    {
      icon: <Search className="w-8 h-8" />,
      title: '물건 검색 및 신청',
      desc: '경매 물건을 검색하고 대리입찰 서비스를 신청합니다.',
      tip: '입찰 2~3일 전 신청을 권장합니다.'
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: '서비스 이용료 결제',
      desc: '신청 확인 후 서비스 이용료를 결제하여 접수를 확정합니다.',
      tip: '기본 11만원 (부가세 포함)'
    },
    {
      icon: <ClipboardCheck className="w-8 h-8" />,
      title: '전문가 배정 및 분석',
      desc: '지역별 담당 전문가가 배정되어 최종 권리분석을 진행합니다.',
      tip: '전자 계약서가 발행됩니다.'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: '보증금 입금 (D-1)',
      desc: '입찰기일 전날 오후 8시까지 보증금을 송금합니다.',
      tip: '지정된 대리인 계좌로 입금'
    },
    {
      icon: <Scale className="w-8 h-8" />,
      title: '법원 입찰 및 결과',
      desc: '전문 대리인이 법원에 동행/대리 입찰을 진행합니다.',
      tip: '당일 즉시 결과 통보'
    }
  ];

  return (
    <div className="bg-white pb-20">
      {/* Header */}
      <section className="bg-slate-50 py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-[#002147] mb-6">서비스 이용 안내</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            JB 하우징의 대리입찰 서비스는 신청부터 결과 통보까지 <br/>
            모든 과정이 투명하고 안전하게 관리됩니다.
          </p>
        </div>
      </section>

      {/* Timeline Steps */}
      <section className="py-20 max-w-5xl mx-auto px-4">
        <div className="space-y-12">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col md:flex-row gap-8 items-start relative">
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute left-9 top-20 bottom-0 w-0.5 bg-slate-100"></div>
              )}
              <div className="w-18 h-18 bg-[#002147] text-[#D4AF37] rounded-3xl flex items-center justify-center shrink-0 shadow-lg shadow-slate-200 z-10">
                {step.icon}
              </div>
              <div className="flex-grow pt-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[#D4AF37] font-black text-sm uppercase tracking-tighter">Step 0{idx + 1}</span>
                  <h3 className="text-2xl font-bold text-[#002147]">{step.title}</h3>
                </div>
                <p className="text-slate-600 mb-4">{step.desc}</p>
                <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg text-sm font-bold inline-flex items-center gap-2 border border-emerald-100">
                  <AlertCircle size={14} /> {step.tip}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Critical Timeline */}
      <section className="max-w-7xl mx-auto px-4 py-16 bg-[#00152e] rounded-[3rem] text-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">입찰 보증금 마감 안내</h2>
          <p className="opacity-60">안전한 입찰 준비를 위해 시간을 꼭 지켜주세요.</p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-center">
          <div className="bg-white/5 p-8 rounded-3xl border border-white/10 w-full max-w-xs">
            <div className="text-[#D4AF37] font-bold mb-2">입찰 전날 (D-1)</div>
            <div className="text-4xl font-black mb-4">20:00</div>
            <p className="text-sm opacity-50 font-medium">보증금 입금 마감</p>
          </div>
          <ArrowRight className="hidden md:block opacity-20" size={48} />
          <div className="bg-white/5 p-8 rounded-3xl border border-white/10 w-full max-w-xs">
            <div className="text-emerald-400 font-bold mb-2">입찰 당일 (D-Day)</div>
            <div className="text-4xl font-black mb-4">10:00</div>
            <p className="text-sm opacity-50 font-medium">법원 입찰 개시</p>
          </div>
        </div>
      </section>
    </div>
  );
};
