
import React, { useState } from 'react';
import { User, Mail, Lock, Smartphone, ShieldCheck, CheckCircle2, ChevronRight, Building2, UserCheck, Briefcase, Zap, Info, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'individual' | 'expert' | 'corporate'>('individual');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewingTerms, setViewingTerms] = useState<'terms' | 'privacy' | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAllAgree = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setAgreements({
      terms: checked,
      privacy: checked,
      marketing: checked,
    });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!agreements.terms || !agreements.privacy) {
      alert('필수 약관에 동의해주세요.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('회원가입이 완료되었습니다! 로그인 후 JB 하우징의 서비스를 이용해보세요.');
      navigate('/login');
    }, 1500);
  };

  const TermsModal = () => {
    if (!viewingTerms) return null;

    const content = viewingTerms === 'terms' ? {
      title: '서비스 이용약관',
      body: `
        제1조 (목적)
        본 약관은 (주) JB 하우징(이하 "회사")이 운영하는 플랫폼에서 제공하는 부동산 경매 정보 및 매수신청대리 관련 서비스의 이용조건 및 절차를 규정함을 목적으로 합니다.
        
        제2조 (용어의 정의)
        1. "이용자"란 본 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.
        2. "회원"이란 회사에 개인정보를 제공하여 회원등록을 한 자로서, 회사의 정보를 지속적으로 제공받으며 서비스를 이용할 수 있는 자를 말합니다.
        
        제3조 (서비스의 제공 및 변경)
        회사는 다음과 같은 업무를 수행합니다:
        1. 부동산 경매 물건 정보 제공 및 AI 권리분석 리포트 생성
        2. 법원 매수신청대리 위임 사무 처리
        3. 부동산 투자 컨설팅 및 관련 교육 서비스
        
        제4조 (회원의 의무)
        회원은 본인의 아이디 및 비밀번호를 안전하게 관리할 책임이 있으며, 타인에게 양도하거나 대여할 수 없습니다.
      `
    } : {
      title: '개인정보 수집 및 이용 동의',
      body: `
        1. 수집하는 개인정보 항목
        - 필수: 이름, 이메일 주소, 비밀번호, 휴대폰 번호
        - 선택: 관심 지역, 희망 투자 금액
        
        2. 개인정보의 수집 및 이용 목적
        - 서비스 회원 가입 및 관리
        - AI 분석 리포트 제공 및 상담 연락
        - 대리입찰 계약 체결 및 사후 관리
        
        3. 개인정보의 보유 및 이용 기간
        - 회원 탈퇴 시까지 (단, 관계 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관)
        
        4. 동의 거부 권리 및 불이익
        귀하는 개인정보 수집에 대한 동의를 거부할 권리가 있습니다. 단, 필수 항목 동의 거부 시 회원가입 및 서비스 이용이 제한될 수 있습니다.
      `
    };

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[#002147]/60 backdrop-blur-sm" onClick={() => setViewingTerms(null)}></div>
        <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
            <h3 className="text-lg font-black text-[#002147]">{content.title}</h3>
            <button onClick={() => setViewingTerms(null)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-slate-100 transition shadow-sm text-slate-400"><X size={20}/></button>
          </div>
          <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
            <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap font-medium">
              {content.body}
            </div>
          </div>
          <div className="p-6 bg-slate-50 border-t border-slate-100">
            <button 
              onClick={() => {
                if(viewingTerms === 'terms') setAgreements(prev => ({...prev, terms: true}));
                if(viewingTerms === 'privacy') setAgreements(prev => ({...prev, privacy: true}));
                setViewingTerms(null);
              }}
              className="w-full bg-[#002147] text-white py-4 rounded-2xl font-black text-sm hover:bg-slate-900 transition"
            >
              내용 확인 및 동의
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen py-20 px-4">
      <TermsModal />
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <Building2 className="w-10 h-10 text-[#D4AF37]" />
            <span className="text-2xl font-black text-[#002147] tracking-tighter">JB HOUSING</span>
          </Link>
          <h1 className="text-3xl font-black text-[#002147] mb-2 font-serif">새로운 투자 파트너</h1>
          <p className="text-slate-400 font-medium">대한민국 최고의 경매 플랫폼에 오신 것을 환영합니다.</p>
        </div>

        {/* User Type Selector */}
        <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 flex gap-1 mb-10">
          <button 
            onClick={() => setUserType('individual')}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${userType === 'individual' ? 'bg-[#002147] text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            <User size={16} /> 개인 투자자
          </button>
          <button 
            onClick={() => setUserType('expert')}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${userType === 'expert' ? 'bg-[#002147] text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            <Briefcase size={16} /> 대리인/전문가
          </button>
          <button 
            onClick={() => setUserType('corporate')}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${userType === 'corporate' ? 'bg-[#002147] text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            <Building2 size={16} /> 법인 회원
          </button>
        </div>

        {/* Signup Form Card */}
        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#002147] via-[#D4AF37] to-[#002147]"></div>
          
          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">성명 / 상호명</label>
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="실명 혹은 기업명을 입력하세요"
                  className="w-full pl-14 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/10 focus:border-[#D4AF37] transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">이메일 계정</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="example@email.com"
                  className="w-full pl-14 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/10 focus:border-[#D4AF37] transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">휴대폰 번호</label>
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <Smartphone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="010-0000-0000"
                    className="w-full pl-14 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/10 focus:border-[#D4AF37] transition-all font-medium"
                  />
                </div>
                <button type="button" className="px-5 py-4 bg-slate-100 text-[#002147] rounded-2xl text-xs font-black hover:bg-slate-200 transition shrink-0">인증 요청</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">비밀번호</label>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="password" 
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    placeholder="8자 이상 조합"
                    className="w-full pl-14 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/10 focus:border-[#D4AF37] transition-all font-medium"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">비밀번호 확인</label>
                <div className="relative">
                  <ShieldCheck className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="password" 
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    placeholder="비밀번호 재입력"
                    className="w-full pl-14 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/10 focus:border-[#D4AF37] transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Agreements */}
            <div className="pt-6 border-t border-slate-50 space-y-4">
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <input 
                  type="checkbox" 
                  id="all-agree" 
                  onChange={handleAllAgree}
                  checked={agreements.terms && agreements.privacy && agreements.marketing}
                  className="w-5 h-5 rounded-lg border-slate-300 text-[#D4AF37] focus:ring-[#D4AF37]" 
                />
                <label htmlFor="all-agree" className="text-sm font-black text-[#002147] cursor-pointer">약관 전체 동의</label>
              </div>
              
              <div className="px-2 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      id="terms" 
                      checked={agreements.terms}
                      onChange={(e) => setAgreements(prev => ({ ...prev, terms: e.target.checked }))}
                      className="w-4 h-4 rounded border-slate-300 text-[#D4AF37] cursor-pointer" 
                    />
                    <label htmlFor="terms" className="text-xs text-slate-500 font-bold cursor-pointer">[필수] 서비스 이용약관 동의</label>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setViewingTerms('terms')}
                    className="text-[10px] text-[#D4AF37] underline font-bold uppercase tracking-widest hover:text-slate-900 transition"
                  >
                    전문보기
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      id="privacy" 
                      checked={agreements.privacy}
                      onChange={(e) => setAgreements(prev => ({ ...prev, privacy: e.target.checked }))}
                      className="w-4 h-4 rounded border-slate-300 text-[#D4AF37] cursor-pointer" 
                    />
                    <label htmlFor="privacy" className="text-xs text-slate-500 font-bold cursor-pointer">[필수] 개인정보 수집 및 이용 동의</label>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setViewingTerms('privacy')}
                    className="text-[10px] text-[#D4AF37] underline font-bold uppercase tracking-widest hover:text-slate-900 transition"
                  >
                    전문보기
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    id="marketing" 
                    checked={agreements.marketing}
                    onChange={(e) => setAgreements(prev => ({ ...prev, marketing: e.target.checked }))}
                    className="w-4 h-4 rounded border-slate-300 text-[#D4AF37] cursor-pointer" 
                  />
                  <label htmlFor="marketing" className="text-xs text-slate-400 font-medium cursor-pointer">[선택] 마케팅 및 투자 정보 SMS 수신 동의</label>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-[#002147] text-white py-5 rounded-2xl font-black text-xl hover:bg-slate-900 transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-900/10 active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? '가입 진행 중...' : '회원가입 완료'} <CheckCircle2 size={24} />
            </button>
          </form>

          <div className="mt-10 text-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest font-black text-slate-300 bg-white px-4">Social Connect</div>
            </div>
            
            <div className="flex gap-3">
              <button className="flex-1 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-black hover:bg-slate-100 transition flex items-center justify-center gap-2">
                <Zap size={14} className="text-amber-400" /> 카카오로 시작
              </button>
              <button className="flex-1 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-black hover:bg-slate-100 transition flex items-center justify-center gap-2">
                <ShieldCheck size={14} className="text-emerald-500" /> 네이버로 시작
              </button>
            </div>

            <p className="text-sm text-slate-400 font-medium">
              이미 계정이 있으신가요? <Link to="/login" className="text-[#D4AF37] font-bold hover:underline">로그인하기</Link>
            </p>
          </div>
        </div>

        {/* Security Info */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8 text-slate-300">
           <div className="flex items-center gap-2">
              <ShieldCheck size={16} /> <span className="text-[11px] font-bold uppercase tracking-widest">Secure Data Transfer</span>
           </div>
           <div className="flex items-center gap-2">
              <UserCheck size={16} /> <span className="text-[11px] font-bold uppercase tracking-widest">Real-name Identity</span>
           </div>
           <div className="flex items-center gap-2">
              <Info size={16} /> <span className="text-[11px] font-bold uppercase tracking-widest">Privacy Protected</span>
           </div>
        </div>
      </div>
    </div>
  );
};
