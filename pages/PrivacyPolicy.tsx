
import React from 'react';
import { ShieldCheck, Lock, UserCheck, EyeOff, Trash2, Database } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pb-20">
      <section className="bg-[#002147] py-24 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 blur-[100px] rounded-full"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="flex items-center gap-3 text-emerald-400 mb-6 font-black uppercase tracking-widest text-xs">
            <Lock size={16} /> Privacy & Data Protection
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 font-serif leading-tight">
            개인정보 처리방침
          </h1>
          <p className="text-lg opacity-60 font-medium">JB 하우징은 의뢰인의 소중한 법적 정보와 개인 데이터를 최우선으로 보호합니다.</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center">
            <EyeOff className="mx-auto text-[#002147] mb-4" size={32} />
            <h3 className="font-black text-[#002147] mb-2 text-sm">정보 마스킹</h3>
            <p className="text-[11px] text-slate-400 font-medium">신분증 뒷자리 등 불필요한 민감 정보는 즉시 비식별 처리</p>
          </div>
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center">
            <Trash2 className="mx-auto text-rose-500 mb-4" size={32} />
            <h3 className="font-black text-[#002147] mb-2 text-sm">즉시 파기 원칙</h3>
            <p className="text-[11px] text-slate-400 font-medium">입찰 종료 및 계약 해지 시 모든 서류 데이터 영구 삭제</p>
          </div>
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center">
            <Database className="mx-auto text-emerald-500 mb-4" size={32} />
            <h3 className="font-black text-[#002147] mb-2 text-sm">암호화 저장</h3>
            <p className="text-[11px] text-slate-400 font-medium">업로드된 이미지는 군사용 수준의 256-bit AES 암호화</p>
          </div>
        </div>

        <div className="prose prose-slate max-w-none space-y-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-[#002147]">1. 수집하는 개인정보 항목 및 목적</h2>
            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
               <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-400 font-black uppercase text-[10px] tracking-widest">
                     <tr>
                        <th className="px-6 py-4">구분</th>
                        <th className="px-6 py-4">항목</th>
                        <th className="px-6 py-4">이용 목적</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
                     <tr>
                        <td className="px-6 py-4 text-[#002147] font-bold">기본 정보</td>
                        <td className="px-6 py-4">성명, 연락처, 이메일</td>
                        <td className="px-6 py-4">회원 가입 및 상담 응대</td>
                     </tr>
                     <tr>
                        <td className="px-6 py-4 text-[#002147] font-bold">입찰 서류</td>
                        <td className="px-6 py-4">신분증 사본, 인감증명서, 위임장</td>
                        <td className="px-6 py-4">법원 매수신청대리 사무 수행</td>
                     </tr>
                     <tr>
                        <td className="px-6 py-4 text-[#002147] font-bold">자동 수집</td>
                        <td className="px-6 py-4">IP주소, 쿠키, 방문 일시</td>
                        <td className="px-6 py-4">서비스 품질 개선 및 보안 강화</td>
                     </tr>
                  </tbody>
               </table>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-[#002147]">2. 개인정보의 보유 및 이용 기간</h2>
            <p className="text-slate-600 leading-relaxed font-medium">
              "회사"는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 다음의 경우 관련 법령에 의거하여 보관합니다:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600 font-medium">
              <li><strong>매수신청대리 관련 서류:</strong> 5년 (매수신청대리인 등록 규칙 제18조에 따른 장부 보존 의무)</li>
              <li><strong>계약 및 결제 기록:</strong> 5년 (전자상거래법)</li>
              <li><strong>상담 내역:</strong> 1년 (고객 응대 히스토리 관리)</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-[#002147]">3. 정보주체의 권리</h2>
            <p className="text-slate-600 leading-relaxed font-medium">
              이용자는 언제든지 본인의 개인정보를 열람, 수정, 삭제 요청할 수 있으며, 특히 '입찰파트너' 서류함에 업로드된 민감 서류는 입찰 전 언제든지 삭제가 가능합니다. 개인정보 보호 관련 문의는 <strong>063-715-1213</strong>으로 연락 주시기 바랍니다.
            </p>
          </div>
        </div>

        <div className="mt-20 p-10 bg-[#002147] rounded-[3rem] text-white">
           <div className="flex items-center gap-4 mb-6">
              <ShieldCheck className="text-[#D4AF37]" size={32} />
              <h3 className="text-xl font-black">개인정보 보호 책임자</h3>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 opacity-70 font-medium text-sm">
              <div>
                 <div className="mb-2 uppercase tracking-widest text-[10px] font-black">Chief Officer</div>
                 <p className="text-lg text-white">김종필 대표이사</p>
              </div>
              <div>
                 <div className="mb-2 uppercase tracking-widest text-[10px] font-black">Department</div>
                 <p className="text-lg text-white">법무 및 정보보안팀</p>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};
