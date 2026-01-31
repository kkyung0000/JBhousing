
import React from 'react';
import { FileText, ShieldCheck, Scale } from 'lucide-react';

export const TermsOfService: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header */}
      <section className="bg-slate-50 py-16 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 text-[#D4AF37] mb-4 font-bold uppercase tracking-widest text-xs">
            <ShieldCheck size={16} /> Legal Documents
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#002147] mb-4 font-serif">
            경매 매수신청대리 서비스 이용약관
          </h1>
          <p className="text-slate-500 text-sm">최근 수정일: 2024년 6월 10일</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-10">
          
          <div>
            <h2 className="text-xl font-bold text-[#002147] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-[#002147] text-white rounded-lg flex items-center justify-center text-sm">1</span>
              제1조 (목적)
            </h2>
            <p className="pl-10">
              본 약관은 (주) JB 하우징(이하 "회사")이 운영하는 홈페이지를 통해 제공하는 부동산 경매 물건 정보 제공 및 매수신청대리 서비스를 이용함에 있어, "회사"와 "이용자"의 권리, 의무 및 책임 사항을 규정함을 목적으로 합니다.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#002147] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-[#002147] text-white rounded-lg flex items-center justify-center text-sm">2</span>
              제2조 (서비스의 범위 및 자격)
            </h2>
            <div className="pl-10 space-y-2">
              <p>1. "회사"는 법원에 등록된 <strong>매수신청대리인(등록번호: 전주지방법원 00-00-00)</strong>으로서 법령이 허용하는 범위 내에서 업무를 수행합니다.</p>
              <p>2. 제공되는 서비스는 경매 물건의 권리분석, 현황조사, 입찰가 상담, 입찰표 작성 및 제출 대행에 한합니다.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#002147] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-[#002147] text-white rounded-lg flex items-center justify-center text-sm">3</span>
              제3조 (대행 수수료 및 비용)
            </h2>
            <div className="pl-10 space-y-3">
              <p>이용자는 「공인중개사법」 및 「매수신청대리인 등록 규칙」에 정해진 수수료를 지불해야 합니다.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>상담 및 권리분석 수수료: 50만 원 범위 내 (협의)</li>
                <li>매수신청대리 수수료: 낙찰 시 감정가의 1% 또는 낙찰가의 1.5% 범위 내 (협의), 미낙찰 시 5만 원 범위 내</li>
                <li>실비(원거리 여비, 등기부등본 열람비 등)는 수수료와 별도로 청구될 수 있습니다.</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#002147] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-[#002147] text-white rounded-lg flex items-center justify-center text-sm">4</span>
              제4조 (이용자의 의무 및 보증금 관리)
            </h2>
            <div className="pl-10 space-y-2">
              <p>1. 이용자는 입찰에 필요한 신분증 사본, 인감증명서, 위임장 등을 정확하게 제공해야 하며, 허위 서류로 인한 모든 책임은 이용자에게 있습니다.</p>
              <p>2. 입찰 보증금은 이용자가 직접 법원 계좌로 입금하거나, "회사"가 지정한 에스크로 계좌를 통해 안전하게 전달되어야 합니다. <strong>"회사" 임직원의 개인 계좌로 입금을 요구하지 않습니다.</strong></p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#002147] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-[#002147] text-white rounded-lg flex items-center justify-center text-sm">5</span>
              제5조 (책임의 한계 및 면책)
            </h2>
            <div className="pl-10 space-y-2">
              <p>1. "회사"는 신의성실의 원칙에 따라 권리분석을 수행하나, 등기부상 나타나지 않는 유치권, 점유 관계, 법정지상권 등 현장조사의 한계로 발생하는 특수 사정에 대해서는 고의 또는 중과실이 없는 한 책임을 지지 않습니다.</p>
              <p>2. 최종 입찰가 결정의 책임은 "이용자"에게 있으며, 낙찰 결과(수익성 등)에 대해 "회사"는 보장하지 않습니다.</p>
              <p>3. 천재지변, 법원의 기일 변경, 공고 오류 등 "회사"의 통제 범위를 벗어난 사유로 발생한 손해에 대해서는 면책됩니다.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#002147] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-[#002147] text-white rounded-lg flex items-center justify-center text-sm">6</span>
              제6조 (손해배상 및 보험)
            </h2>
            <p className="pl-10">
              "회사"는 매수신청대리 업무 중 고의 또는 과실로 이용자에게 재산상 손해를 입힌 경우, 관계 법령에 따라 가입된 공제사업(또는 보증보험) 한도 내에서 책임을 집니다.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#002147] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-[#002147] text-white rounded-lg flex items-center justify-center text-sm">7</span>
              제7조 (계약의 해지 및 환불)
            </h2>
            <div className="pl-10 space-y-2">
              <p>1. 입찰 기일 <strong>3일 전</strong>까지는 서면 통지로 계약 해지가 가능하며, 이 경우 기발생한 실비를 제외한 수수료를 환불합니다.</p>
              <p>2. 입찰 당일 취소 또는 이용자의 단순 변심으로 인한 노쇼(No-show) 시 수수료는 반환되지 않습니다.</p>
            </div>
          </div>

        </div>

        <div className="mt-20 p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#D4AF37]">
              <Scale size={24} />
            </div>
            <div>
              <p className="font-bold text-[#002147]">약관 관련 문의</p>
              <p className="text-sm text-slate-500">궁금하신 사항은 고객센터로 연락주세요.</p>
            </div>
          </div>
          <a href="tel:063-715-1213" className="bg-[#002147] text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-slate-200">
            063-715-1213
          </a>
        </div>
      </section>
    </div>
  );
};
