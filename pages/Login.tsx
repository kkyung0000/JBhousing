
import React, { useState } from 'react';
import { Mail, Lock, LogIn, Building2, ShieldCheck, Zap, Info, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 로그인 시뮬레이션
    setTimeout(() => {
      setIsSubmitting(false);
      alert('로그인에 성공했습니다. JB 하우징에 오신 것을 환영합니다!');
      navigate('/');
    }, 1200);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen py-24 px-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <Building2 className="w-10 h-10 text-[#D4AF37]" />
            <span className="text-2xl font-black text-[#002147] tracking-tighter uppercase">JB HOUSING</span>
          </Link>
          <h1 className="text-3xl font-black text-[#002147] mb-2 font-serif">다시 만나서 반갑습니다</h1>
          <p className="text-slate-400 font-medium text-sm">최상의 낙찰 전략, 전문가 그룹이 함께합니다.</p>
        </div>

        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#002147] via-[#D4AF37] to-[#002147]"></div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
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

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">비밀번호</label>
                <button type="button" className="text-[10px] font-black text-[#D4AF37] hover:underline">비밀번호 찾기</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="비밀번호를 입력하세요"
                  className="w-full pl-14 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/10 focus:border-[#D4AF37] transition-all font-medium"
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-3 ml-1">
              <input 
                type="checkbox" 
                id="rememberMe" 
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="w-4 h-4 rounded border-slate-300 text-[#D4AF37] focus:ring-[#D4AF37]" 
              />
              <label htmlFor="rememberMe" className="text-xs text-slate-500 font-bold cursor-pointer">이메일 기억하기</label>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-[#002147] text-white py-5 rounded-2xl font-black text-xl hover:bg-slate-900 transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-900/10 active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? '로그인 중...' : '로그인'} <LogIn size={20} />
            </button>
          </form>

          <div className="mt-10 text-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest font-black text-slate-300 bg-white px-4">Easy Login</div>
            </div>
            
            <div className="flex gap-3">
              <button className="flex-1 py-4 bg-[#FEE500] text-[#3c1e1e] rounded-2xl text-xs font-black hover:opacity-90 transition flex items-center justify-center gap-2">
                카카오
              </button>
              <button className="flex-1 py-4 bg-[#03C75A] text-white rounded-2xl text-xs font-black hover:opacity-90 transition flex items-center justify-center gap-2">
                네이버
              </button>
            </div>

            <p className="text-sm text-slate-400 font-medium">
              아직 회원이 아니신가요? <Link to="/signup" className="text-[#D4AF37] font-bold hover:underline">회원가입하기</Link>
            </p>
          </div>
        </div>

        {/* Security Info */}
        <div className="mt-10 flex items-center justify-center gap-6 text-slate-400">
           <div className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-500" /> 
              <span className="text-[10px] font-black uppercase tracking-tighter">Secure Auth</span>
           </div>
           <div className="flex items-center gap-1.5">
              <Info size={14} className="text-[#D4AF37]" /> 
              <span className="text-[10px] font-black uppercase tracking-tighter">Privacy Protected</span>
           </div>
        </div>
      </div>
    </div>
  );
};
