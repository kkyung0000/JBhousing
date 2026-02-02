
import React, { useState } from 'react';
import { Mail, Lock, LogIn, Building2, ShieldCheck, Zap, Info, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { dbService } from '../services/db';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const user = await dbService.login(formData.email, formData.password);
      setIsSubmitting(false);

      if (user) {
        alert(`${user.name}님, 입찰파트너에 오신 것을 환영합니다!`);
        window.dispatchEvent(new Event('jb_points_updated'));
        navigate('/');
      } else {
        alert('이메일 또는 비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      alert('로그인 처리 중 오류가 발생했습니다.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen py-24 px-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <Building2 className="w-10 h-10 text-[#C5A059]" />
            <span className="text-2xl font-black text-[#001A3D] tracking-tighter uppercase font-serif">BID PARTNER</span>
          </Link>
          <h1 className="text-3xl font-black text-[#001A3D] mb-2 font-serif">다시 만나서 반갑습니다</h1>
          <p className="text-slate-400 font-medium text-sm">최상의 낙찰 전략, 전문가 그룹이 함께합니다.</p>
        </div>

        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#001A3D] via-[#C5A059] to-[#001A3D]"></div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">이메일 계정</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="example@email.com" className="w-full pl-14 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#C5A059]/10 transition-all font-medium" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">비밀번호</label>
                <button type="button" className="text-[10px] font-black text-[#C5A059] hover:underline">비밀번호 찾기</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input type="password" name="password" value={formData.password} onChange={handleInputChange} required placeholder="비밀번호 입력" className="w-full pl-14 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#C5A059]/10 transition-all font-medium" />
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-[#001A3D] text-white py-5 rounded-2xl font-black text-xl hover:bg-slate-900 transition-all flex items-center justify-center gap-2 shadow-xl disabled:opacity-50">
              {isSubmitting ? '로그인 중...' : '로그인'} <LogIn size={20} />
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-sm text-slate-400 font-medium">
              아직 회원이 아니신가요? <Link to="/signup" className="text-[#C5A059] font-bold">회원가입하기</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
