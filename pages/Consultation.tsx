
import React from 'react';
/* Fixed: Removed conflicting Smartphone import from lucide-react as it is locally defined below */
import { Send, PhoneCall, ShieldCheck, MapPin, Info, AlertCircle } from 'lucide-react';

export const Consultation: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('상담 신청이 완료되었습니다. 김종필 대표님이 곧 직접 연락드리겠습니다.');
  };

  return (
    <div className="bg-white py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 text-[#D4AF37] px-3 py-1 rounded-full text-xs font-bold mb-6">
            <Info size={14} /> 안전한 매수신청대리 업체
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#002147] mb-8 font-serif leading-tight">
            성공 낙찰을 위한 <br/> <span className="text-[#D4AF37]">전문가 1:1 상담</span>
          </h1>
          <p className="text-xl text-slate-600 mb-12 leading-relaxed">
            복잡한 권리관계로 고민 중이신가요? <br/>
            (주) JB 하우징의 김종필 대표가 풍부한 실전 경험을 바탕으로 안전하고 확실한 투자 길잡이가 되어 드립니다.
          </p>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mb-10">
             <div className="flex items-center gap-2 text-rose-600 font-bold text-sm mb-4">
                <AlertCircle size={18} /> 반드시 확인해주세요!
             </div>
             <ul className="space-y-3 text-sm text-slate-500">
                <li>• 입찰 보증금은 입찰 기일 <span className="text-slate-900 font-bold">전일 오후 8시</span>까지 입금 마감됩니다.</li>
                <li>• 공동입찰 시 모든 참여자의 <span className="text-slate-900 font-bold">전자본인서명확인서</span>가 필요합니다.</li>
                <li>• 기본 이용료 외에 취득세, 등기 비용 등은 별도로 발생합니다.</li>
             </ul>
          </div>
          
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-slate-50 flex items-center justify-center rounded-2xl shadow-sm text-[#D4AF37] border border-slate-100">
                <Smartphone size={20} />
              </div>
              <div>
                <h4 className="font-bold text-[#002147] mb-1">직통 상담</h4>
                <p className="text-slate-500 text-sm font-medium">M. 010-2787-3456 (김종필 대표)</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-slate-50 flex items-center justify-center rounded-2xl shadow-sm text-[#D4AF37] border border-slate-100">
                <ShieldCheck />
              </div>
              <div>
                <h4 className="font-bold text-[#002147] mb-1">안전 보증</h4>
                <p className="text-slate-500 text-sm font-medium">공제보험 2억 원 가입 및 책임 권리분석 보증</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-[#D4AF37]"></div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold text-[#002147] mb-2">대리입찰 신청서</h3>
              <p className="text-sm text-slate-400 font-medium">신청 내용을 바탕으로 전문가가 직접 연락드립니다.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">성함</label>
                 <input type="text" placeholder="홍길동" required className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50" />
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">연락처</label>
                 <input type="tel" placeholder="010-0000-0000" required className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50" />
               </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">사건 번호 (선택사항)</label>
              <input type="text" placeholder="예: 2023타경 12345" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">입찰 유형</label>
                <select className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 text-sm font-semibold">
                  <option>단독 입찰</option>
                  <option>공동 입찰 (2인 이상)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">희망 투자 금액</label>
                <select className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 text-sm font-semibold">
                  <option>1억 미만</option>
                  <option>1억 ~ 3억</option>
                  <option>3억 ~ 5억</option>
                  <option>5억 이상</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">추가 상담 내용</label>
              <textarea placeholder="상담받고 싶은 내용을 자유롭게 남겨주세요." rows={4} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"></textarea>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3 border border-slate-100">
              <input type="checkbox" id="privacy" required className="w-5 h-5 rounded-lg border-slate-300 text-[#D4AF37] focus:ring-[#D4AF37]" />
              <label htmlFor="privacy" className="text-xs text-slate-500 font-medium">개인정보 수집 및 이용(마케팅 활용 포함)에 동의합니다.</label>
            </div>

            <button type="submit" className="w-full bg-[#002147] text-white py-5 rounded-2xl font-bold text-xl hover:bg-slate-900 transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-200 active:scale-95">
              상담 신청 완료 <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const Smartphone = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-smartphone"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
);
