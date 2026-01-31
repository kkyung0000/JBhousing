
import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pb-20">
      <section className="bg-slate-50 py-16 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 text-emerald-600 mb-4 font-bold uppercase tracking-widest text-xs">
            <Lock size={16} /> Privacy & Data
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#002147] mb-4 font-serif">
            개인정보 처리방침
          </h1>
          <p className="text-slate-500 text-sm">최근 수정일: 2024년 6월 10일</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-8">
          <p className="font-medium">
            (주) JB 하우징(이하 "회사")은 이용자의 개인정보를 보호하고 관련 법령을 준수하기 위해 다음과 같은 처리방침을 수립·공개합니다.
          </p>

          <div>
            <h2 className="text-xl font-bold text-[#002147] mb-4">1. 수집하는 개인정보 항목</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>필수항목: 성명, 연락처(전화번호), 상담 내용</li>
              <li>선택항목: 관심 지역, 희망 투자 금액, 사건번호</li>
              <li>자동수집항목: IP주소, 쿠키, 방문 기록</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#002147] mb-4">2. 개인정보의 수집 및 이용 목적</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>경·공매 매수신청대리 상담 및 서비스 제공</li>
              <li>본인 식별 및 의사소통 경로 확보</li>
              <li>신규 서비스 및 이벤트 정보 안내 (마케팅 동의 시)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#002147] mb-4">3. 개인정보의 보유 및 이용 기간</h2>
            <p>회사는 원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계 법령에 따라 보존할 필요가 있는 경우 다음과 같이 보관합니다.</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>상담 신청 기록: 1년 (고객 응대 및 이력 관리)</li>
              <li>계약 및 대금결제 기록: 5년 (전자상거래법 등)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#002147] mb-4">4. 개인정보의 제3자 제공</h2>
            <p>회사는 이용자의 동의 없이 개인정보를 외부에 제공하지 않습니다. 단, 서비스 제공에 필수적인 협력 업체(지역 담당 공인중개사 등)에 한하여 최소한의 정보를 제공할 수 있습니다.</p>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <h2 className="text-lg font-bold text-[#002147] mb-2 flex items-center gap-2">
              <ShieldCheck size={20} className="text-emerald-500" /> 개인정보 보호책임자
            </h2>
            <p className="text-sm">성명: 김종필 | 직책: 대표이사 | 연락처: 063-715-1213</p>
          </div>
        </div>
      </section>
    </div>
  );
};
