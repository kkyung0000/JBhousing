
import React from 'react';
import { Send, PhoneCall, ShieldCheck, MapPin, Smartphone } from 'lucide-react';

export const Consultation: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('상담 신청이 완료되었습니다. 김종필 대표님이 곧 직접 연락드리겠습니다.');
  };

  return (
    <div className="bg-slate-50 py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#002147] mb-8 font-serif">
            Expert Consulting
          </h1>
          <p className="text-xl text-slate-600 mb-12 leading-relaxed">
            복잡한 권리관계로 고민 중이신가요? <br/>
            (주) JB 하우징의 김종필 대표가 풍부한 실전 경험을 바탕으로 안전하고 확실한 투자 길잡이가 되어 드립니다.
          </p>
          
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-white flex items-center justify-center rounded-2xl shadow-sm text-[#D4AF37] border border-slate-100">
                <Smartphone size={20} />
              </div>
              <div>
                <h4 className="font-bold text-[#002147] mb-1">직통 상담</h4>
                <p className="text-slate-500 text-sm">M. 010-2787-3456 (김종필 대표)</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-white flex items-center justify-center rounded-2xl shadow-sm text-[#D4AF37] border border-slate-100">
                <ShieldCheck />
              </div>
              <div>
                <h4 className="font-bold text-[#002147] mb-1">안전 보증</h4>
                <p className="text-slate-500 text-sm">인수 권리 유무 및 법적 리스크 100% 책임 분석</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-white flex items-center justify-center rounded-2xl shadow-sm text-[#D4AF37] border border-slate-100">
                <MapPin />
              </div>
              <div>
                <h4 className="font-bold text-[#002147] mb-1">위치</h4>
                <p className="text-slate-500 text-sm">전북 전주시 완산구 호암로 19 401호</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-10 shadow-xl border border-slate-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-[#002147] mb-2">상담 신청서</h3>
              <p className="text-sm text-slate-400">대표님이 직접 내용을 확인 후 연락드립니다.</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">성함</label>
              <input type="text" placeholder="성함을 입력해주세요" required className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">연락처</label>
              <input type="tel" placeholder="010-0000-0000" required className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">관심 분야</label>
              <select className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-sm">
                <option>경·공매 업무대행</option>
                <option>부동산 컨설팅</option>
                <option>인테리어 상담</option>
                <option>기타 재테크 문의</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">상담 내용</label>
              <textarea placeholder="관심 물건 번호나 투자 희망 지역을 남겨주시면 더욱 정확한 상담이 가능합니다." rows={4} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"></textarea>
            </div>

            <div className="flex items-center gap-2 mb-8">
              <input type="checkbox" id="privacy" required className="w-4 h-4 rounded text-[#D4AF37] focus:ring-[#D4AF37]" />
              <label htmlFor="privacy" className="text-xs text-slate-500">개인정보 수집 및 이용에 동의합니다.</label>
            </div>

            <button type="submit" className="w-full bg-[#002147] text-white py-5 rounded-xl font-bold text-xl hover:bg-slate-900 transition flex items-center justify-center gap-2 shadow-lg shadow-slate-200">
              상담 신청하기 <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
