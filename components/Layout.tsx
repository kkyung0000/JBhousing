
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Building2, Menu, X, Wallet, Zap, Handshake, ShieldCheck, User, Gavel, LogOut, Coins, CreditCard } from 'lucide-react';
import { dbService } from '../services/db';
import { User as UserType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(dbService.getCurrentUser());
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthChange = () => {
      setUser(dbService.getCurrentUser());
    };
    const handlePointsUpdate = () => {
      setUser(dbService.getCurrentUser());
    };

    window.addEventListener('jb_auth_changed', handleAuthChange);
    window.addEventListener('jb_points_updated', handlePointsUpdate);
    
    return () => {
      window.removeEventListener('jb_auth_changed', handleAuthChange);
      window.removeEventListener('jb_points_updated', handlePointsUpdate);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: '서비스 소개', path: '/services' },
    { name: '이용 안내', path: '/guide' },
    { name: 'AI 권리분석', path: '/ai-analysis', icon: <Zap size={14} className="text-[#C5A059]" /> },
    { name: '포인트 충전', path: '/points', icon: <Coins size={14} className="text-[#C5A059]" /> },
    { name: '대리 현황', path: '/bidding/customer', icon: <Handshake size={14} className="text-[#C5A059]" /> },
    { name: '전문가 그룹', path: '/experts' },
    { name: '경매 물건 검색', path: '/auctions' },
  ];

  const handleLogout = () => {
    dbService.logout();
    alert('로그아웃 되었습니다.');
    navigate('/');
  };

  const handleNavClick = (path: string) => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="sticky top-0 z-50 bg-[#001A3D] text-white shadow-2xl border-b border-white/5 print:hidden" role="banner">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between gap-2">
          {/* 로고 섹션 */}
          <Link to="/" onClick={() => handleNavClick('/')} className="flex items-center gap-3 shrink-0 mr-8 focus:ring-2 focus:ring-[#C5A059] rounded-lg" aria-label="입찰파트너 홈">
            <div className="w-10 h-10 bg-[#C5A059] flex items-center justify-center rounded-lg shadow-lg shadow-black/20">
              <Gavel className="w-6 h-6 text-[#001A3D]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl xl:text-2xl font-black tracking-tighter leading-none whitespace-nowrap uppercase font-serif">BID PARTNER</span>
              <span className="text-[9px] opacity-50 tracking-[0.3em] mt-1 uppercase whitespace-nowrap font-black">법원경매 매수신청대리</span>
            </div>
          </Link>
          
          {/* 데스크탑 네비게이션 */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-8 text-[13px] xl:text-[14px] font-bold overflow-hidden" role="navigation" aria-label="메인 네비게이션">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap shrink-0 hover:scale-105 ${location.pathname === link.path ? 'text-[#C5A059]' : 'text-slate-300 hover:text-white'}`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </nav>

          {/* 버튼 및 유저 세션 섹션 */}
          <div className="flex items-center gap-2 xl:gap-6 shrink-0">
            {user ? (
              <div className="flex items-center gap-4">
                <Link 
                  to="/points"
                  className="flex items-center gap-2 bg-white/5 border border-[#C5A059]/30 px-4 py-2 rounded-lg text-[13px] font-bold hover:bg-white/10 transition group"
                  aria-label={`보유 포인트 ${user.points.toLocaleString()}포인트, 충전하기`}
                >
                  <Wallet size={16} className="text-[#C5A059] group-hover:scale-110 transition" /> 
                  <span className="text-white">{user.points.toLocaleString()} P</span>
                  <span className="ml-1 text-[10px] bg-[#C5A059] text-[#001A3D] px-1.5 py-0.5 rounded font-black">충전</span>
                </Link>
                <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                  <span className="text-sm font-bold text-slate-300 hidden xl:block">{user.name}님</span>
                  <button onClick={handleLogout} className="text-slate-400 hover:text-white transition p-2 focus:ring-2 focus:ring-rose-500 rounded-lg" title="로그아웃" aria-label="로그아웃"><LogOut size={18}/></button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="text-[13px] font-bold text-slate-300 hover:text-white px-4 py-2 hover:bg-white/5 rounded-lg transition">로그인</Link>
                <Link to="/signup" className="bg-white/5 border border-white/20 text-white px-5 py-2 rounded-lg text-[13px] font-bold hover:bg-white/10 transition hover:border-[#C5A059]">회원가입</Link>
              </div>
            )}
            
            <Link 
              to="/consult" 
              className="hidden sm:block bg-[#C5A059] text-[#001A3D] px-6 py-2.5 rounded-lg font-black hover:bg-white hover:scale-105 active:scale-95 transition-all text-[13px] shadow-xl shadow-black/20 uppercase"
            >
              입찰 신청하기
            </Link>

            <button 
              className="lg:hidden p-2 hover:bg-white/10 rounded-lg ml-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="모바일 메뉴 토글"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#001A3D] border-t border-white/10 py-6 px-4 absolute w-full shadow-2xl animate-in slide-in-from-top-2 h-[calc(100vh-80px)] overflow-y-auto">
            <div className="flex flex-col gap-4 pb-20">
              {user ? (
                <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10 mb-4">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-400 font-bold mb-1">{user.name}님</span>
                      <span className="text-2xl font-black text-[#C5A059]">{user.points.toLocaleString()} P</span>
                    </div>
                    <button onClick={handleLogout} className="bg-white/10 p-3 rounded-xl text-slate-300 hover:bg-rose-500/10 hover:text-rose-500 transition-all"><LogOut size={20}/></button>
                  </div>
                  <Link 
                    to="/points" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full bg-[#C5A059] text-[#001A3D] py-4 rounded-xl font-black flex items-center justify-center gap-2 text-sm shadow-lg active:scale-95 transition"
                  >
                    <CreditCard size={18} /> 포인트 충전하기
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <Link to="/login" className="bg-white/5 py-5 rounded-2xl text-center font-bold" onClick={() => setIsMobileMenuOpen(false)}>로그인</Link>
                  <Link to="/signup" className="bg-[#C5A059] text-[#001A3D] py-5 rounded-2xl text-center font-black shadow-lg" onClick={() => setIsMobileMenuOpen(false)}>회원가입</Link>
                </div>
              )}
              
              <Link to="/bidding/agent" onClick={() => handleNavClick('/bidding/agent')} className="bg-white/5 border border-[#C5A059]/30 text-[#C5A059] py-4 rounded-xl text-center text-[11px] font-black flex items-center justify-center gap-2 uppercase tracking-widest mb-2 active:scale-95 transition">
                <ShieldCheck size={14} /> 전문가 관제 센터
              </Link>

              <div className="h-[1px] bg-white/5 my-2"></div>

              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className={`text-lg font-bold py-4 border-b border-white/5 flex items-center gap-3 transition-colors ${location.pathname === link.path ? 'text-[#C5A059]' : 'text-slate-300 hover:text-white'}`}
                  onClick={() => handleNavClick(link.path)}
                >
                  <span className="bg-white/5 p-2 rounded-lg">{link.icon}</span>
                  {link.name}
                </Link>
              ))}
              <Link to="/consult" className="bg-white text-[#001A3D] py-5 rounded-2xl text-center font-black text-lg mt-6 shadow-xl active:scale-95 transition" onClick={() => handleNavClick('/consult')}>입찰 신청하기</Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow" id="main-content" role="main">
        {children}
      </main>

      <footer className="bg-[#000F24] text-slate-400 pt-24 pb-12 border-t border-white/5 print:hidden" role="contentinfo">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-20">
            <div className="space-y-8">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#C5A059] flex items-center justify-center rounded-lg">
                  <Gavel className="w-6 h-6 text-[#000F24]" />
                </div>
                <span className="text-2xl font-black text-white tracking-tighter uppercase font-serif">BID PARTNER</span>
              </Link>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                대한민국 대법원 경매 매수신청대리 정식 등록 법인. <br/> 
                AI 정밀 분석과 실무 전문가 그룹이 <br/>
                가장 완벽한 입찰 전략을 수립합니다.
              </p>
            </div>
            
            <div className="grid grid-cols-2 lg:col-span-3 gap-12">
               <div>
                  <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Platform</h4>
                  <ul className="space-y-4 text-sm font-medium">
                     <li><Link to="/services" className="hover:text-[#C5A059] transition">서비스 소개</Link></li>
                     <li><Link to="/guide" className="hover:text-[#C5A059] transition">이용 안내</Link></li>
                     <li><Link to="/points" className="hover:text-[#C5A059] transition font-bold text-[#C5A059]">포인트 충전</Link></li>
                     <li><Link to="/ai-analysis" className="hover:text-[#C5A059] transition">AI 권리분석</Link></li>
                  </ul>
               </div>
               <div>
                  <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Legal</h4>
                  <ul className="space-y-4 text-sm font-medium">
                     <li><Link to="/terms" className="hover:text-[#C5A059] transition">이용약관</Link></li>
                     <li><Link to="/privacy" className="hover:text-[#C5A059] transition">개인정보처리방침</Link></li>
                     <li><Link to="/refund-policy" className="hover:text-[#C5A059] transition">환불규정</Link></li>
                  </ul>
               </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-bold uppercase tracking-widest">
            <p>© 2025 BID PARTNER. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8">
               <span>등록번호: 45111-2023-00001</span>
               <span>대표이사: 김종필</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
