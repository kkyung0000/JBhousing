
import React, { useState, useEffect } from 'react';
import { User as UserIcon, Mail, Lock, Smartphone, ShieldCheck, CheckCircle2, ChevronRight, Building2, UserCheck, Briefcase, Zap, Info, X, Shield, Scale, Clock, RefreshCcw } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { dbService } from '../services/db';
import { User } from '../types';

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
  
  // 인증 관련 상태
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [timer, setTimer] = useState(180); // 3분
  const [isTimerActive, setIsTimerActive] = useState(false);

  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewingTerms, setViewingTerms] = useState<'terms' | 'privacy' | null>(null);

  useEffect(() => {
    let interval: any;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSendCode = () => {
    if (!formData.phone || formData.phone.length < 10) {
      alert('유효한 휴대폰 번호를 입력해주세요.');
      return;
    }
    setIsCodeSent(true);
    setTimer(180);
    setIsTimerActive(true);
    alert('인증번호가 발송되었습니다. (테스트 번호: 123456)');
  };

  const handleVerifyCode = () => {
    if (verificationCode === '123456') {
      setIsPhoneVerified(true);
      setIsTimerActive(false);
      alert('휴대폰 인증이 완료되었습니다.');
    } else {
      alert('인증번호가 일치하지 않습니다.');
    }
  };

  // Fixed: handleSignup must be async to await dbService.getUsers()
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isPhoneVerified) {
      alert('휴대폰 본인 인증을 완료해주세요.');
      return;
    }

    // Fixed: await dbService.getUsers() because it returns a Promise
    const existingUsers = await dbService.getUsers();
    if (existingUsers.some(u => u.email === formData.email)) {
      alert('이미 가입된 이메일입니다.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!agreements.terms || !agreements.privacy) {
      alert('필수 약관에 동의해주세요.');
      return;
    }

    setIsSubmitting(true);
    
    // Fixed: setTimeout callback should be async to await saveUser
    setTimeout(async () => {
      const newUser: User = {
        id: `user-${Date.now()}`,
        email: formData.email,
        password: formData.password,
        name: formData.name,
        phone: formData.phone,
        userType: userType,
        points: 0,
        createdAt: new Date().toISOString()
      };

      // Fixed: await dbService.saveUser()
      await dbService.saveUser(newUser);
      setIsSubmitting(false);
      alert('입찰파트너 회원가입이 완료되었습니다! 로그인을 진행해주세요.');
      navigate('/login');
    }, 1000);
  };

  const handleAllAgree = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setAgreements({ terms: checked, privacy: checked, marketing: checked });
  };

  const termsContent = {
    terms: `제 1조 (목적)\n본 약관은 (주) 입찰파트너(이하 "회사")가 운영하는 '입찰파트너' 서비스의 이용조건 및 절차에 관한 사항을 규정함을 목적으로 합니다.\n\n제 2조 (서비스의 내용)\n1. 법원 경매 물건 정보 제공 및 AI 권리분석\n2. 매수신청대리 위임 및 수행 관리\n3. 전문가 상담 및 부동산 컨설팅\n\n제 3조 (매수신청대리 위임의 특약)\n본 서비스를 통해 진행되는 대리입찰은 대법원 규칙 및 공인중개사법을 준수합니다. 회원은 입찰에 필요한 서류(위임장, 인감증명서 등)를 정확히 제공할 의무가 있습니다.`,
    privacy: `1. 개인정보 수집 항목\n성명, 이메일, 휴대전화번호, 비밀번호, 서비스 이용 기록, 기기 정보.\n\n2. 수집 및 이용 목적\n- 회원 가입 의사 확인 및 본인 식별\n- 법원 경매 대리입찰 업무 수행 및 관련 서류 관리\n- 포인트 충전/차감 등 자산 관리 및 정산\n\n3. 보유 및 이용 기간\n회원 탈퇴 시까지 보관하나, 관련 법령(공인중개사법 등)에 따라 입찰 관련 서류는 5년간 보관할 수 있습니다.`
  };

  const TermsModal = () => {
    if (!viewingTerms) return null;
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[#001A3D]/80 backdrop-blur-md" onClick={() => setViewingTerms(null)}></div>
        <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
            <div className="flex items-center gap-3">
              <Scale size={20} className="text-[#C5A059]" />
              <h3 className="text-lg font-black text-[#001A3D]">{viewingTerms === 'terms' ? '서비스 이용약관' : '개인정보 처리방침'}</h3>
            </div>
            <button onClick={() => setViewingTerms(null)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-slate-100 transition shadow-sm text-slate-400"><X size={20}/></button>
          </div>
          <div className="p-8 max-h-[50vh] overflow-y-auto">
            <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap font-medium">
              {termsContent[viewingTerms]}
            </div>
          </div>
          <div className="p-6 bg-slate-50 border-t border-slate-100">
            <button 
              onClick={() => {
                if(viewingTerms === 'terms') setAgreements(prev => ({...prev, terms: true}));
                if(viewingTerms === 'privacy') setAgreements(prev => ({...prev, privacy: true}));
                setViewingTerms(null);
              }}
              className="w-full bg-[#001A3D] text-white py-5 rounded-2xl font-black text-sm hover:bg-slate-900 transition shadow-xl"
            >
              내용 확인 및 동의하기
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
            <div className="w-10 h-10 bg-[#C5A059] flex items-center justify-center rounded-lg shadow-lg">
              <ShieldCheck className="w-6 h-6 text-[#001A3D]" />
            </div>
            <span className="text-2xl font-black text-[#001A3D] tracking-tighter uppercase font-serif">BID PARTNER</span>
          </Link>
          <h1 className="text-3xl font-black text-[#001A3D] mb-2 font-serif">새로운 투자 파트너</h1>
          <p className="text-slate-400 font-medium">대한민국 최고의 경매 대리입찰 플랫폼에 오신 것을 환영합니다.</p>
        </div>

        <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 flex gap-1 mb-10">
          <button onClick={() => setUserType('individual')} className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${userType === 'individual' ? 'bg-[#001A3D] text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}>
            <UserIcon size={16} /> 개인 투자자
          </button>
          <button onClick={() => setUserType('expert')} className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${userType === 'expert' ? 'bg-[#001A3D] text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}>
            <Briefcase size={16} /> 대리인/전문가
          </button>
        </div>

        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#001A3D] via-[#C5A059] to-[#001A3D]"></div>
          
          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">성명 / 상호명</label>
              <div className="relative">
                <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="실명을 입력하세요" className="w-full pl-14 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#C5A059]/10 transition-all font-medium" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">이메일 계정</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="example@email.com" className="w-full pl-14 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#C5A059]/10 transition-all font-medium" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">휴대폰 번호 본인 인증</label>
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <Smartphone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    disabled={isPhoneVerified}
                    required 
                    placeholder="01000000000" 
                    className="w-full pl-14 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#C5A059]/10 transition-all font-medium disabled:bg-slate-100 disabled:text-slate-400" 
                  />
                  {isPhoneVerified && <CheckCircle2 className="absolute right-5 top-1/2 -translate-y-1/2 text-emerald-500" size={20} />}
                </div>
                {!isPhoneVerified && (
                  <button 
                    type="button" 
                    onClick={handleSendCode}
                    className="bg-[#001A3D] text-white px-6 rounded-2xl font-bold text-sm whitespace-nowrap hover:bg-slate-900 transition active:scale-95"
                  >
                    {isCodeSent ? '재발송' : '인증요청'}
                  </button>
                )}
              </div>
            </div>

            {isCodeSent && !isPhoneVerified && (
              <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex justify-between items-center">
                  인증번호 6자리
                  <span className="flex items-center gap-1 text-[#C5A059]"><Clock size={10} /> {formatTime(timer)}</span>
                </label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={verificationCode} 
                    onChange={(e) => setVerificationCode(e.target.value)} 
                    placeholder="123456" 
                    className="flex-grow px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#C5A059]/10 transition-all font-bold tracking-[0.5em] text-center" 
                  />
                  <button 
                    type="button" 
                    onClick={handleVerifyCode}
                    className="bg-[#C5A059] text-[#001A3D] px-8 rounded-2xl font-black text-sm hover:bg-white border-2 border-[#C5A059] transition active:scale-95"
                  >
                    확인
                  </button>
                </div>
                {timer === 0 && <p className="text-[10px] text-rose-500 font-bold ml-1">인증 시간이 만료되었습니다. 다시 시도해주세요.</p>}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">비밀번호</label>
                <input type="password" name="password" value={formData.password} onChange={handleInputChange} required placeholder="8자 이상" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#C5A059]/10 transition-all font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">비밀번호 확인</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required placeholder="재입력" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#C5A059]/10 transition-all font-medium" />
              </div>
            </div>

            <div className="pt-6 border-t border-slate-50 space-y-4">
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <input type="checkbox" id="all-agree" onChange={handleAllAgree} checked={agreements.terms && agreements.privacy && agreements.marketing} className="w-5 h-5 rounded-lg border-slate-300 text-[#C5A059] focus:ring-[#C5A059]" />
                <label htmlFor="all-agree" className="text-sm font-black text-[#001A3D] cursor-pointer">약관 전체 동의</label>
              </div>
              <div className="px-2 flex flex-col gap-3">
                <div className="flex justify-between items-center text-xs">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-600">
                    <input type="checkbox" checked={agreements.terms} onChange={(e)=>setAgreements(p=>({...p, terms: e.target.checked}))} /> 
                    [필수] 이용약관 동의
                  </label>
                  <button type="button" onClick={()=>setViewingTerms('terms')} className="text-[#C5A059] font-black underline">전문보기</button>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-600">
                    <input type="checkbox" checked={agreements.privacy} onChange={(e)=>setAgreements(p=>({...p, privacy: e.target.checked}))} /> 
                    [필수] 개인정보 처리방침 동의
                  </label>
                  <button type="button" onClick={()=>setViewingTerms('privacy')} className="text-[#C5A059] font-black underline">전문보기</button>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-400">
                    <input type="checkbox" checked={agreements.marketing} onChange={(e)=>setAgreements(p=>({...p, marketing: e.target.checked}))} /> 
                    [선택] 마케팅 정보 수신 동의
                  </label>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting || !isPhoneVerified} 
              className="w-full bg-[#001A3D] text-white py-5 rounded-2xl font-black text-xl hover:bg-slate-900 transition-all flex items-center justify-center gap-2 shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '진행 중...' : '입찰파트너 시작하기'} <CheckCircle2 size={24} />
            </button>
            {!isPhoneVerified && <p className="text-center text-[10px] text-rose-500 font-bold">휴대폰 인증을 완료해야 가입이 가능합니다.</p>}
          </form>
          <div className="mt-8 text-center text-sm text-slate-400">
            이미 계정이 있으신가요? <Link to="/login" className="text-[#C5A059] font-bold">로그인하기</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
