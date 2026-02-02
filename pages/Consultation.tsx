
import React, { useState } from 'react';
import { Send, Info, Scale } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Consultation: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    caseNumber: '',
    message: ''
  });
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      alert('입찰 상담 신청이 정상적으로 접수되었습니다. 담당 전문가가 곧 연락드리겠습니다.');
      navigate('/');
    }, 1500);
  };

  return (
    <div className="bg-white py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#C5A059]/10 text-[#C5A059] px-3 py-1 rounded-full text-xs font-bold mb-6">
            <Info size={14} /> 법원 정식 등록 대리업체
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#001A3D] mb-8 font-serif leading-tight">
            성공 낙찰을 위한 <br/> <span className="text-[#C5A059]">전문가 1:1 상담 신청</span>
          </h1>
          <p className="text-xl text-slate-600 mb-12 leading-relaxed">
            전담 전문가가 접수된 내용을 즉시 검토를 시작합니다. 
            <strong>법정 수수료 요율을 준수</strong>하며 가장 투명한 경매 프로세스를 제공합니다.
          </p>

          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 mb-10">
             <div className="flex items-center gap-2 text-[#001A3D] font-bold text-sm mb-6 border-b border-slate-200 pb-3">
                <Scale size={18} className="text-[#C5A059]" /> 법정 수수료 요율 안내
             </div>
             <ul className="space-y-3 text-xs text-slate-500 leading-relaxed">
                <li className="flex justify-between"><span>상담 및 권리분석</span> <span className="font-bold text-slate-700">50만 원 범위 내</span></li>
                <li className="flex justify-between"><span>대리입찰 수수료 (낙찰 시)</span> <span className="font-bold text-slate-700">감정가 1% 또는 낙찰가 1.5% 내</span></li>
                <li className="flex justify-between"><span>취하/미낙찰 시</span> <span className="font-bold text-slate-700">5만 원 범위 내 실비</span></li>
             </ul>
          </div>
        </div>

        <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-[#C5A059]"></div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold text-[#001A3D] mb-2">대리입찰 신청서</h3>
              <p className="text-sm text-slate-400 font-medium">작성하신 내용은 암호화되어 전담 전문가에게만 전달됩니다.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                 <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">성함</label>
                 <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="홍길동" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#C5A059]/50" />
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">연락처</label>
                 <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required placeholder="010-0000-0000" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#C5A059]/50" />
               </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">사건 번호</label>
              <input type="text" name="caseNumber" value={formData.caseNumber} onChange={handleInputChange} placeholder="예: 2024타경 12345 (미정일 시 비움)" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#C5A059]/50" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">상담 요청 내용</label>
              <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="상담받고 싶은 물건이나 투자 성향을 남겨주세요." rows={4} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#C5A059]/50"></textarea>
            </div>

            <div className="pt-4 border-t border-slate-50">
              <label className="flex items-center gap-3 text-xs text-slate-500 font-bold cursor-pointer">
                <input type="checkbox" checked={agreePrivacy} onChange={(e) => setAgreePrivacy(e.target.checked)} required className="w-5 h-5 rounded-lg border-slate-300 text-[#C5A059] focus:ring-[#C5A059]" />
                [필수] 개인정보 수집 및 이용 동의
              </label>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-[#001A3D] text-white py-5 rounded-2xl font-black text-xl hover:bg-slate-900 transition-all flex items-center justify-center gap-2 shadow-xl active:scale-95 disabled:opacity-50">
              {isSubmitting ? '데이터 처리 중...' : '상담 신청 완료'} <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
