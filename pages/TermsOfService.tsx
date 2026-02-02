
import React from 'react';
import { ShieldCheck, Scale, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';

export const TermsOfService: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pb-20">
      <section className="bg-[#002147] py-24 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 blur-[100px] rounded-full"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="flex items-center gap-3 text-[#D4AF37] mb-6 font-black uppercase tracking-widest text-xs">
            <ShieldCheck size={16} /> Legal & Compliance
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 font-serif leading-tight">
            서비스 이용약관
          </h1>
          <p className="text-lg opacity-60 font-medium">본 약관은 (주) 입찰파트너 서비스 이용에 따른 권리와 의무를 규정합니다.</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="p-8 bg-amber-50 rounded-[2rem] border border-amber-100 mb-16 flex flex-col md:flex-row gap-6 items-center">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#D4AF37] shadow-sm shrink-0 border border-amber-200">
            <Scale size={32} />
          </div>
          <p className="text-sm text-amber-900 leading-relaxed font-medium">
            본 서비스는 <strong>「공인중개사법」</strong> 및 <strong>「매수신청대리인 등록 규칙」</strong>에 의거하여 운영됩니다. 
            모든 입찰 대리 업무는 법원에 등록된 공인중개사가 직접 수행하며, 불법 컨설팅 및 무자격 대리 행위를 엄격히 금지합니다.
          </p>
        </div>

        <div className="space-y-16">
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-[#002147] flex items-center gap-3">
              <span className="w-10 h-10 bg-[#002147] text-[#D4AF37] rounded-xl flex items-center justify-center text-sm">01</span>
              제1조 (목적)
            </h2>
            <div className="pl-12 text-slate-600 leading-relaxed font-medium">
              본 약관은 (주) 입찰파트너(이하 "회사")가 제공하는 부동산 경매 정보 제공, AI 권리분석 리포트, 그리고 매수신청대리 위임 서비스(이하 "서비스")를 이용함에 있어 "회사"와 "회원" 간의 이용 조건 및 절차를 규정함을 목적으로 합니다.
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-black text-[#002147] flex items-center gap-3">
              <span className="w-10 h-10 bg-[#002147] text-[#D4AF37] rounded-xl flex items-center justify-center text-sm">02</span>
              제2조 (매수신청대리의 위임 및 수수료)
            </h2>
            <div className="pl-12 space-y-4 text-slate-600 leading-relaxed font-medium">
              <p>1. "회원"은 본 플랫폼을 통해 "회사"의 소속 전문가에게 법원 경매 입찰 대리를 위임할 수 있습니다.</p>
              <p>2. "회사"는 「매수신청대리인 등록 규칙」에 정해진 법정 수수료를 청구하며, 이는 다음 각 호와 같습니다 (VAT 별도):</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong>상담 및 권리분석 수수료:</strong> 50만 원 범위 내</li>
                <li><strong>매수신청대리 수수료:</strong> 낙찰 시 감정가의 1% 또는 낙찰가의 1.5% 중 협의된 금액</li>
                <li><strong>미낙찰 시 수수료:</strong> 실비 및 행정 비용조로 5만 원 청구</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-black text-[#002147] flex items-center gap-3">
              <span className="w-10 h-10 bg-[#002147] text-[#D4AF37] rounded-xl flex items-center justify-center text-sm">03</span>
              제3조 (회원의 의무 및 보증금 관리)
            </h2>
            <div className="pl-12 space-y-4 text-slate-600 leading-relaxed font-medium">
              <p>1. "회원"은 입찰에 필요한 인감증명서, 위임장, 신분증 사본 등 필수 서류를 "회사"가 정한 기한 내에 정확하게 제공해야 합니다.</p>
              <p>2. 입찰 보증금은 "회사"가 안내하는 법원 보관금 계좌 또는 에스크로 계좌로 입찰 전일까지 입금 완료되어야 하며, 미입금으로 인한 입찰 불가 시 책임은 "회원"에게 있습니다.</p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-black text-[#002147] flex items-center gap-3">
              <span className="w-10 h-10 bg-[#002147] text-[#D4AF37] rounded-xl flex items-center justify-center text-sm">04</span>
              제4조 (책임의 범위)
            </h2>
            <div className="pl-12 space-y-4 text-slate-600 leading-relaxed font-medium">
              <p>1. "회사"는 신의성실의 원칙에 따라 권리분석 리포트를 작성하나, 등기부상 나타나지 않는 특수 권리(유치권, 법정지상권 등)에 대해서는 현장 조사의 한계 내에서 최선을 다하며, 고의가 없는 한 면책됩니다.</p>
              <p>2. 최종 입찰가 결정은 "회원"의 자기 책임 하에 이루어지며, 낙찰 결과 및 향후 부동산 가치 변동에 대한 책임은 "회원"에게 귀속됩니다.</p>
            </div>
          </div>
        </div>

        <div className="mt-24 p-12 bg-slate-50 rounded-[3rem] border border-slate-100 text-center">
          <p className="text-slate-400 font-bold mb-6 italic">"투명한 계약 관리가 안전한 경매 투자의 시작입니다."</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#002147] text-white px-8 py-4 rounded-2xl font-black text-sm hover:bg-slate-900 transition shadow-xl shadow-blue-900/10">
              약관 PDF 다운로드
            </button>
            <a href="tel:063-715-1213" className="bg-white border-2 border-slate-200 text-[#002147] px-8 py-4 rounded-2xl font-black text-sm hover:bg-slate-50 transition">
              법률 자문 문의
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
