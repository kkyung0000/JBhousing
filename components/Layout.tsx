
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, Menu, X, Wallet, Zap, UserPlus, LogIn, ChevronRight, Handshake, MapPin, Phone, Mail, ShieldCheck } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [points, setPoints] = useState<number>(15000);
  const location = useLocation();

  useEffect(() => {
    const savedPoints = localStorage.getItem('jb_user_points');
    if (savedPoints) {
      setPoints(parseInt(savedPoints, 10));
    } else {
      localStorage.setItem('jb_user_points', '15000');
    }

    const handlePointsUpdate = () => {
      const updatedPoints = localStorage.getItem('jb_user_points');
      if (updatedPoints) {
        setPoints(parseInt(updatedPoints, 10));
      }
    };

    window.addEventListener('jb_points_updated', handlePointsUpdate);
    return () => window.removeEventListener('jb_points_updated', handlePointsUpdate);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: '서비스 소개', path: '/services' },
    { name: '이용 안내', path: '/guide' },
    { name: 'AI 분석', path: '/ai-analysis', icon: <Zap size={14} className="text-[#D4AF37]" /> },
    { name: '입찰파트너', path: '/bidding/customer', icon: <Handshake size={14} className="text-[#D4AF37]" /> },
    { name: '전문가 서비스', path: '/experts' },
    { name: '경매찾기', path: '/auctions' },
    { name: '포인트 충전', path: '/points' },
  ];

  const handleNavClick = (path: string) => {
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="sticky top-0 z-50 bg-[#002147] text-white shadow-lg border-b border-white/10 print:hidden">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
          <Link to="/" onClick={() => handleNavClick('/')} className="flex items-center gap-2 shrink-0">
            <Building2 className="w-10 h-10 text-[#D4AF37]" />
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight leading-none whitespace-nowrap uppercase">JB HOUSING</span>
              <span className="text-[10px] opacity-70 tracking-widest mt-1 uppercase whitespace-nowrap">Court Auction Proxy</span>
            </div>
          </Link>
          
          <nav className="hidden xl:flex items-center gap-6 text-[15px] font-semibold overflow-hidden">
            {navLinks.map((link) => (
              <Link 
                key={link.path + link.name} 
                to={link.path} 
                onClick={() => handleNavClick(link.path)}
                className={`transition-colors duration-200 flex items-center gap-1.5 whitespace-nowrap shrink-0 ${location.pathname === link.path ? 'text-[#D4AF37]' : 'hover:text-[#D4AF37]'}`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden lg:flex items-center gap-4 mr-2 border-r border-white/10 pr-4">
              <Link to="/signup" className="text-sm font-bold text-white/70 hover:text-[#D4AF37] transition flex items-center gap-1.5 whitespace-nowrap">
                회원가입
              </Link>
              <Link to="/login" className="text-sm font-bold text-white/70 hover:text-[#D4AF37] transition flex items-center gap-1.5 whitespace-nowrap">
                로그인
              </Link>
            </div>

            <Link 
              to="/points"
              className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-sm font-bold hover:bg-white/10 transition whitespace-nowrap"
            >
              <Wallet size={16} className="text-[#D4AF37]" /> {points.toLocaleString()} P
            </Link>
            
            <div className="flex items-center gap-2">
              <Link 
                to="/consult" 
                className="hidden sm:block bg-[#D4AF37] text-[#002147] px-6 py-2.5 rounded-lg font-bold hover:bg-white transition-all text-sm shadow-lg shadow-amber-900/20 whitespace-nowrap"
              >
                대리입찰 신청
              </Link>
              
              {/* 대리인용 메뉴 - 오른쪽 배치 */}
              <Link 
                to="/bidding/agent" 
                className="hidden lg:flex items-center gap-1.5 bg-white/10 border border-[#D4AF37]/50 text-[#D4AF37] px-3 py-2 rounded-lg text-[11px] font-black uppercase tracking-tighter hover:bg-[#D4AF37] hover:text-[#002147] transition-all group"
              >
                <ShieldCheck size={14} className="group-hover:scale-110 transition" /> 대리인 포털
              </Link>
            </div>

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
              <div className="flex items-center gap-2 mb-2">
                <Link to="/bidding/agent" onClick={() => handleNavClick('/bidding/agent')} className="flex-1 bg-white/5 border border-[#D4AF37]/30 text-[#D4AF37] py-3 rounded-xl text-center text-xs font-black flex items-center justify-center gap-2">
                  <ShieldCheck size={14} /> 전문가 전용 관제실
                </Link>
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
              <Link to="/consult" className="bg-[#D4AF37] text-white py-4 rounded-xl text-center font-bold mt-4" onClick={() => handleNavClick('/consult')}>대리입찰 신청하기</Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-[#00152e] text-slate-300 pt-24 pb-12 border-t border-white/5 print:hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-20">
            <div className="space-y-8">
              <Link to="/" className="flex items-center gap-2">
                <Building2 className="w-10 h-10 text-[#D4AF37]" />
                <span className="text-2xl font-black text-white tracking-tighter uppercase">JB HOUSING</span>
              </Link>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">
                대한민국 대법원 경매 매수신청대리 정식 등록업체로서, <br/> 
                AI 기술과 베테랑 전문가의 노하우로 <br/>
                가장 안전한 낙찰 경험을 선사합니다.
              </p>
              <div className="flex gap-4">
                 <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-400 hover:text-[#D4AF37] hover:bg-white/10 transition cursor-pointer"><Phone size={18}/></div>
                 <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-400 hover:text-[#D4AF37] hover:bg-white/10 transition cursor-pointer"><Mail size={18}/></div>
                 <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-400 hover:text-[#D4AF37] hover:bg-white/10 transition cursor-pointer"><ShieldCheck size={18}/></div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-black mb-8 text-sm uppercase tracking-widest flex items-center gap-2">
                 Quick Links <div className="h-[1px] w-8 bg-[#D4AF37]"></div>
              </h4>
              <ul className="space-y-4 text-sm font-bold">
                <li><Link to="/services" className="text-slate-500 hover:text-[#D4AF37] transition">서비스 소개</Link></li>
                <li><Link to="/auctions" className="text-slate-500 hover:text-[#D4AF37] transition">경매 물건 찾기</Link></li>
                <li><Link to="/ai-analysis" className="text-slate-500 hover:text-[#D4AF37] transition">AI 권리분석</Link></li>
                <li><Link to="/bidding/customer" className="text-slate-500 hover:text-[#D4AF37] transition">입찰파트너 현황</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-black mb-8 text-sm uppercase tracking-widest flex items-center gap-2">
                 Legal Policy <div className="h-[1px] w-8 bg-[#D4AF37]"></div>
              </h4>
              <ul className="space-y-4 text-sm font-bold">
                <li><Link to="/terms" className="text-slate-500 hover:text-[#D4AF37] transition">이용약관</Link></li>
                <li><Link to="/privacy" className="text-slate-200 hover:text-[#D4AF37] transition">개인정보 처리방침</Link></li>
                <li><Link to="/refund-policy" className="text-slate-500 hover:text-[#D4AF37] transition">환불 및 과실배상규정</Link></li>
                <li><Link to="/safety" className="text-slate-500 hover:text-[#D4AF37] transition">안전 보증 안내</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-black mb-8 text-sm uppercase tracking-widest flex items-center gap-2">
                 Contact <div className="h-[1px] w-8 bg-[#D4AF37]"></div>
              </h4>
              <div className="space-y-6">
                <div>
                  <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Customer Center</div>
                  <div className="text-2xl font-black text-white">063-715-1213</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Direct Email</div>
                  <div className="text-sm font-bold text-slate-300">contact@jbhousing.com</div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col lg:flex-row justify-between items-start gap-8">
            <div className="space-y-3">
               <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-bold text-slate-500">
                  <span>상호명: (주) JB 하우징</span>
                  <span>대표자: 김종필</span>
                  <span>사업자등록번호: 000-00-00000</span>
                  <span>매수신청대리인 등록번호: 전주지방법원 12-23-45</span>
               </div>
               <div className="flex items-center gap-4 text-[11px] font-bold text-slate-600">
                  <div className="flex items-center gap-1.5"><MapPin size={12} className="text-[#D4AF37]"/> 전라북도 전주시 완산구 홍산로 245</div>
                  <span>© 2024 JB HOUSING. All rights reserved.</span>
               </div>
            </div>
            <div className="flex gap-4 opacity-50 grayscale hover:grayscale-0 transition duration-500">
               <div className="bg-white/10 px-3 py-1 rounded border border-white/10 text-[9px] font-black text-white">보험가입업체 (2억)</div>
               <div className="bg-white/10 px-3 py-1 rounded border border-white/10 text-[9px] font-black text-white">전주지방법원 정식등록</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
