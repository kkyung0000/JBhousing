
import React, { useState } from 'react';
import { Send, PhoneCall, ShieldCheck, MapPin, Info, AlertCircle, FileText, Scale, Smartphone } from 'lucide-react';

export const Consultation: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    caseNumber: '',
    message: ''
  });
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreePrivacy) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }

    // 이메일 발송을 위한 데이터 구성 (대표님 이메일: contact@jbhousing.com)
    const representativeEmail = "contact@jbhousing.com";
    const subject = encodeURIComponent(`[JB 하우징 대리입찰 신청] ${formData.name}님으로부터의 신청 건`);
    const body = encodeURIComponent(
      `대리입찰 신청서 정보\n` +
      `---------------------------------\n` +
      `신청인 성함: ${formData.name}\n` +
      `연락처: ${formData.phone}\n` +
      `사건번호: ${formData.caseNumber || '정보없음'}\n` +
      `상담 요청 내용:\n${formData.message}\n` +
      `---------------------------------\n` +
      `본 메일은 JB 하우징 웹사이트 상담 폼을 통해 자동 생성되었습니다.`
    );

    // 이메일 클라이언트 호출
    window.location.href = `mailto:${representativeEmail}?subject=${subject}&body=${body}`;

    alert('상담 신청 데이터가 이메일로 준비되었습니다. 확인 버튼을 누르시면 이메일 창이 열립니다. 김종필 대표님이 곧 연락드리겠습니다.');
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
            (주) JB 하우징은 <strong>법정 수수료 요율을 준수</strong>하며 투명하게 운영됩니다. 김종필 대표가 풍부한 실전 경험을 바탕으로 확실한 투자 길잡이가 되어 드립니다.
          </p>

          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 mb-10">
             <div className="flex items-center gap-2 text-[#002147] font-bold text-sm mb-6 border-b border-slate-200 pb-3">
                <Scale size={18} className="text-[#D4AF37]" /> 법정 수수료 요율 안내
             </div>
             <ul className="space-y-3 text-xs text-slate-500 leading-relaxed">
                <li className="flex justify-between"><span>상담 및 권리분석</span> <span className="font-bold text-slate-700">50만 원 범위 내</span></li>
                <li className="flex justify-between"><span>매수신청대리 (낙찰 시)</span> <span className="font-bold text-slate-700">감정가 1% 또는 낙찰가 1.5% 내</span></li>
                <li className="flex justify-between"><span>매수신청대리 (미낙찰 시)</span> <span className="font-bold text-slate-700">5만 원 범위 내</span></li>
                <li className="pt-2 text-[10px] italic">* 모든 수수료는 부가세 별도이며, 실비는 별도 청구될 수 있습니다.</li>
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
                 <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="홍길동" 
                  required 
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50" 
                 />
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">연락처</label>
                 <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="010-0000-0000" 
                  required 
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50" 
                 />
               </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">사건 번호 (선택사항)</label>
              <input 
                type="text" 
                name="caseNumber"
                value={formData.caseNumber}
                onChange={handleInputChange}
                placeholder="예: 2023타경 12345" 
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">추가 상담 내용</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="상담받고 싶은 내용을 자유롭게 남겨주세요." 
                rows={4} 
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
              ></textarea>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-50">
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  id="privacy" 
                  checked={agreePrivacy}
                  onChange={(e) => setAgreePrivacy(e.target.checked)}
                  required 
                  className="w-5 h-5 rounded-lg border-slate-300 text-[#D4AF37] focus:ring-[#D4AF37]" 
                />
                <label htmlFor="privacy" className="text-xs text-slate-500 font-bold">
                  [필수] 개인정보 수집 및 이용 동의
                </label>
              </div>
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  id="marketing" 
                  checked={agreeMarketing}
                  onChange={(e) => setAgreeMarketing(e.target.checked)}
                  className="w-5 h-5 rounded-lg border-slate-300 text-[#D4AF37] focus:ring-[#D4AF37]" 
                />
                <label htmlFor="marketing" className="text-xs text-slate-400">
                  [선택] 이벤트 및 투자 정보 SMS 수신 동의
                </label>
              </div>
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
