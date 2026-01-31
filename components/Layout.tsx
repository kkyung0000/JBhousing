
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, PhoneCall, LayoutDashboard, MessageCircle, Youtube, Instagram, Mail, Printer, MapPin, Users, Menu, X, ShieldCheck, Info, HelpCircle, AlertCircle, Wallet, Scale, Zap } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: '서비스 소개', path: '/services' },
    { name: '이용 안내', path: '/guide' },
    { name: 'AI 분석', path: '/ai-analysis', icon: <Zap size={14} className="text-[#D4AF37]" /> },
    { name: '전문가 서비스', path: '/experts' },
    { name: '경매찾기', path: '/auctions' },
    { name: '포인트 충전', path: '/points' },
    { name: 'FAQ', path: '/faq' },
  ];

  const handleNavClick = (path: string) => {
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#002147] text-white shadow-lg border-b border-white/10 print:hidden">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link to="/" onClick={() => handleNavClick('/')} className="flex items-center gap-2">
            <Building2 className="w-10 h-10 text-[#D4AF37]" />
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight leading-none">JB HOUSING</span>
              <span className="text-[10px] opacity-70 tracking-widest mt-1 uppercase">Court Auction Proxy</span>
            </div>
          </Link>
          
          <nav className="hidden xl:flex items-center gap-8 text-[15px] font-semibold">
            {navLinks.map((link) => (
              <Link 
                key={link.path + link.name} 
                to={link.path} 
                onClick={() => handleNavClick(link.path)}
                className={`transition-colors duration-200 flex items-center gap-1.5 ${location.pathname === link.path && link.name !== 'AI 분석' ? 'text-[#D4AF37]' : 'hover:text-[#D4AF37]'}`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link 
              to="/points"
              onClick={() => handleNavClick('/points')}
              className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-sm font-bold hover:bg-white/10 transition"
            >
              <Wallet size={16} className="text-[#D4AF37]" /> 15,000 P
            </Link>
            <Link 
              to="/consult" 
              onClick={() => handleNavClick('/consult')}
              className="hidden sm:block bg-[#D4AF37] text-[#002147] px-6 py-2.5 rounded-lg font-bold hover:bg-white transition-all text-sm shadow-lg shadow-amber-900/20"
            >
              대리입찰 신청
            </Link>
            <button 
              className="xl:hidden p-2 hover:bg-white/10 rounded-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="xl:hidden bg-[#00152e] border-t border-white/10 py-6 px-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.path + link.name} 
                  to={link.path} 
                  className="text-lg font-medium py-2 border-b border-white/5 flex items-center gap-2"
                  onClick={() => handleNavClick(link.path)}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
              <Link 
                to="/consult" 
                className="bg-[#D4AF37] text-white py-4 rounded-xl text-center font-bold mt-4"
                onClick={() => handleNavClick('/consult')}
              >
                대리입찰 신청하기
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#00152e] text-slate-300 pt-20 pb-10 print:hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white/5 rounded-2xl p-6 mb-16 border border-white/10 flex gap-4 items-start">
            <AlertCircle className="text-[#D4AF37] shrink-0" size={20} />
            <div className="space-y-2">
              <p className="text-[11px] text-slate-400 leading-relaxed">
                <strong>법적 고지 및 면책:</strong> JB 하우징의 정보는 대법원 데이터를 기반으로 생성된 참고용 데이터입니다. 실제 법정 공고와 다를 수 있으므로 입찰 전 재확인이 필요합니다.
              </p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between gap-10">
            <div className="max-w-3xl">
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-slate-500 mb-6 font-medium">
                <span>(주) JB 하우징</span>
                <span>대표이사 : 김종필</span>
                <span>본사 : 전라북도 전주시 완산구 호암로 19 401호</span>
              </div>
            </div>
            <p className="text-[12px] text-slate-600">© 2024 (주) JB HOUSING. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
