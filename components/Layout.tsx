
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, PhoneCall, LayoutDashboard, MessageCircle, Youtube, Instagram, Mail, Printer, MapPin, Users, Menu, X, ShieldCheck, Info, HelpCircle, AlertCircle, Wallet, Scale, Zap, ChevronRight, Smartphone, Handshake } from 'lucide-react';

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
      <footer className="bg-[#00152e] text-slate-300 pt-20 pb-10 print:hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            {/* Branding & Contacts */}
            <div className="lg:col-span-1 space-y-6">
              <Link to="/" className="flex items-center gap-2">
                <Building2 className="w-8 h-8 text-[#D4AF37]" />
                <span className="text-xl font-bold text-white tracking-tight">JB HOUSING</span>
              </Link>
              <p className="text-sm text-slate-400 leading-relaxed">
                대한민국 법원경매 매수신청대리 정식 등록업체로서 의뢰인의 자산을 보호하고 최상의 낙찰 전략을 제공합니다.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#D4AF37]/20 transition text-slate-400 hover:text-[#D4AF37]"><Instagram size={16}/></a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#D4AF37]/20 transition text-slate-400 hover:text-[#D4AF37]"><Youtube size={16}/></a>
                <a href="mailto:contact@jbhousing.com" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#D4AF37]/20 transition text-slate-400 hover:text-[#D4AF37]"><Mail size={16}/></a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold mb-6 flex items-center gap-2 text-sm uppercase tracking-widest">
                Main Services <ChevronRight size={12} className="text-[#D4AF37]" />
              </h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link to="/services" className="hover:text-[#D4AF37] transition">서비스 소개</Link></li>
                <li><Link to="/auctions" className="hover:text-[#D4AF37] transition">경매 물건 찾기</Link></li>
                <li><Link to="/ai-analysis" className="hover:text-[#D4AF37] transition flex items-center gap-2">AI 정밀 권리분석 <Zap size={12} className="text-[#D4AF37]"/></Link></li>
                <li><Link to="/experts" className="hover:text-[#D4AF37] transition">지역별 전문가 찾기</Link></li>
              </ul>
            </div>

            {/* Partner Menu (Requested Feature) */}
            <div>
              <h4 className="text-white font-bold mb-6 flex items-center gap-2 text-sm uppercase tracking-widest">
                Partner / Affiliate <ChevronRight size={12} className="text-[#D4AF37]" />
              </h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link to="/consult" className="hover:text-[#D4AF37] transition">대리인 지원하기</Link></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition flex items-center gap-2">대리인 앱 다운로드 <Smartphone size={12}/></a></li>
                <li><a href="mailto:contact@jbhousing.com" className="hover:text-[#D4AF37] transition flex items-center gap-2">제휴 문의하기 <Handshake size={12}/></a></li>
                <li><Link to="/guide" className="hover:text-[#D4AF37] transition">파트너 정책 안내</Link></li>
              </ul>
            </div>

            {/* Support & Legal */}
            <div>
              <h4 className="text-white font-bold mb-6 flex items-center gap-2 text-sm uppercase tracking-widest">
                Support & Legal <ChevronRight size={12} className="text-[#D4AF37]" />
              </h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link to="/faq" className="hover:text-[#D4AF37] transition">자주 묻는 질문(FAQ)</Link></li>
                <li><Link to="/terms" className="hover:text-[#D4AF37] transition">이용약관</Link></li>
                <li><Link to="/privacy" className="text-white hover:text-[#D4AF37] transition font-bold">개인정보 처리방침</Link></li>
                <li><Link to="/refund-policy" className="hover:text-[#D4AF37] transition">환불 및 규정</Link></li>
              </ul>
            </div>

            {/* Customer Center */}
            <div>
              <h4 className="text-white font-bold mb-6 flex items-center gap-2 text-sm uppercase tracking-widest">
                Customer Center <ChevronRight size={12} className="text-[#D4AF37]" />
              </h4>
              <div className="space-y-4">
                <a href="tel:063-715-1213" className="block group">
                  <div className="text-[10px] text-slate-500 font-bold mb-1 group-hover:text-[#D4AF37] transition">평일 09:00 - 18:00</div>
                  <div className="text-2xl font-black text-white group-hover:text-[#D4AF37] transition tracking-tighter">063-715-1213</div>
                </a>
                <Link to="/consult" className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#D4AF37] hover:text-[#002147] transition">
                  <MessageCircle size={14} /> 1:1 온라인 상담
                </Link>
              </div>
            </div>
          </div>

          {/* Legal Notice Box */}
          <div className="bg-white/5 rounded-2xl p-6 mb-12 border border-white/10 flex gap-4 items-start">
            <AlertCircle className="text-[#D4AF37] shrink-0" size={20} />
            <div className="space-y-2">
              <p className="text-[11px] text-slate-400 leading-relaxed">
                <strong>법적 고지 및 면책:</strong> JB 하우징이 제공하는 모든 정보는 대법원 경매정보 시스템 및 공개된 공적 데이터를 기반으로 AI가 분석한 참고 자료입니다. 실제 법정 공고 및 현황과 시차가 발생할 수 있으므로, 최종 입찰 전 반드시 대법원 정식 공고문 확인 및 현장 실사를 거쳐야 합니다. 본 서비스의 분석 결과로 인한 투자 결과에 대해 회사는 법적 책임을 지지 않습니다.
              </p>
            </div>
          </div>

          {/* Bottom Footer Info */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 pt-8 border-t border-white/5">
            <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-[12px] text-slate-500 font-medium">
              <span>(주) JB 하우징</span>
              <span className="hidden sm:inline text-white/10">|</span>
              <span>대표이사 : 김종필</span>
              <span className="hidden sm:inline text-white/10">|</span>
              <span>사업자등록번호 : 000-00-00000</span>
              <span className="hidden sm:inline text-white/10">|</span>
              <span>매수신청대리인 등록번호 : 제 12-23-45호</span>
              <span className="hidden sm:inline text-white/10">|</span>
              <span className="flex items-center gap-1"><MapPin size={10} /> 전라북도 전주시 완산구 호암로 19 401호</span>
            </div>
            <p className="text-[11px] text-slate-600 font-bold uppercase tracking-widest">
              © 2024 (주) JB HOUSING. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
