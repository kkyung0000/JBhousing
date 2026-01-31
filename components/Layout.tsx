
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, PhoneCall, LayoutDashboard, MessageCircle, Youtube, Instagram, Mail, Printer, MapPin, Users, Menu, X, ShieldCheck, Info, HelpCircle, AlertCircle, Wallet, Scale, Zap, ChevronRight, Smartphone, Handshake, UserPlus, LogIn } from 'lucide-react';

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
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
          <Link to="/" onClick={() => handleNavClick('/')} className="flex items-center gap-2 shrink-0">
            <Building2 className="w-10 h-10 text-[#D4AF37]" />
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight leading-none whitespace-nowrap">JB HOUSING</span>
              <span className="text-[10px] opacity-70 tracking-widest mt-1 uppercase whitespace-nowrap">Court Auction Proxy</span>
            </div>
          </Link>
          
          <nav className="hidden xl:flex items-center gap-6 text-[15px] font-semibold overflow-hidden">
            {navLinks.map((link) => (
              <Link 
                key={link.path + link.name} 
                to={link.path} 
                onClick={() => handleNavClick(link.path)}
                className={`transition-colors duration-200 flex items-center gap-1.5 whitespace-nowrap shrink-0 ${location.pathname === link.path && link.name !== 'AI 분석' ? 'text-[#D4AF37]' : 'hover:text-[#D4AF37]'}`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 shrink-0">
            {/* Login / Signup Buttons */}
            <div className="hidden lg:flex items-center gap-4 mr-2">
              <Link to="/signup" onClick={() => handleNavClick('/signup')} className="text-sm font-bold text-white/70 hover:text-[#D4AF37] transition flex items-center gap-1.5 whitespace-nowrap">
                <UserPlus size={16} /> 회원가입
              </Link>
              <span className="w-[1px] h-3 bg-white/20"></span>
              <Link to="/login" onClick={() => handleNavClick('/login')} className="text-sm font-bold text-white/70 hover:text-[#D4AF37] transition flex items-center gap-1.5 whitespace-nowrap">
                <LogIn size={16} /> 로그인
              </Link>
            </div>

            <Link 
              to="/points"
              onClick={() => handleNavClick('/points')}
              className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-sm font-bold hover:bg-white/10 transition whitespace-nowrap"
            >
              <Wallet size={16} className="text-[#D4AF37]" /> 15,000 P
            </Link>
            <Link 
              to="/consult" 
              onClick={() => handleNavClick('/consult')}
              className="hidden sm:block bg-[#D4AF37] text-[#002147] px-6 py-2.5 rounded-lg font-bold hover:bg-white transition-all text-sm shadow-lg shadow-amber-900/20 whitespace-nowrap"
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
              <div className="flex items-center gap-4 pb-4 border-b border-white/5">
                <Link to="/signup" onClick={() => handleNavClick('/signup')} className="flex-1 text-center py-3 bg-white/5 rounded-xl text-sm font-bold border border-white/10">회원가입</Link>
                <Link to="/login" onClick={() => handleNavClick('/login')} className="flex-1 text-center py-3 bg-white/5 rounded-xl text-sm font-bold border border-white/10">로그인</Link>
              </div>
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

      <footer className="bg-[#00152e] text-slate-300 pt-20 pb-10 print:hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            <div className="lg:col-span-1 space-y-6">
              <Link to="/" className="flex items-center gap-2">
                <Building2 className="w-8 h-8 text-[#D4AF37]" />
                <span className="text-xl font-bold text-white tracking-tight">JB HOUSING</span>
              </Link>
              <p className="text-sm text-slate-400 leading-relaxed">
                대한민국 법원경매 매수신청대리 정식 등록업체로서 의뢰인의 자산을 보호하고 최상의 낙찰 전략을 제공합니다.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 flex items-center gap-2 text-sm uppercase tracking-widest">Main Services <ChevronRight size={12} className="text-[#D4AF37]" /></h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link to="/services" className="hover:text-[#D4AF37] transition">서비스 소개</Link></li>
                <li><Link to="/auctions" className="hover:text-[#D4AF37] transition">경매 물건 찾기</Link></li>
                <li><Link to="/ai-analysis" className="hover:text-[#D4AF37] transition flex items-center gap-2">AI 정밀 권리분석 <Zap size={12} className="text-[#D4AF37]"/></Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 flex items-center gap-2 text-sm uppercase tracking-widest">Support & Legal <ChevronRight size={12} className="text-[#D4AF37]" /></h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link to="/faq" className="hover:text-[#D4AF37] transition">FAQ</Link></li>
                <li><Link to="/terms" className="hover:text-[#D4AF37] transition">이용약관</Link></li>
                <li><Link to="/privacy" className="text-white hover:text-[#D4AF37] transition font-bold">개인정보 처리방침</Link></li>
              </ul>
            </div>
            <div className="lg:col-span-2">
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Customer Center</h4>
              <div className="text-2xl font-black text-white mb-2">063-715-1213</div>
              <p className="text-sm text-slate-500">평일 09:00 - 18:00 (주말/공휴일 휴무)</p>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-4 text-[12px] text-slate-500">
            <p>© 2024 (주) JB HOUSING. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
