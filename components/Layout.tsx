
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, PhoneCall, LayoutDashboard, MessageCircle, Youtube, Instagram, Mail, Printer, MapPin, Users, Menu, X, ShieldCheck, Info, HelpCircle, AlertCircle } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // 페이지 경로가 변경될 때마다 최상단으로 스크롤 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: '서비스 소개', path: '/services' },
    { name: '이용 안내', path: '/guide' },
    { name: '전문가 서비스', path: '/experts' },
    { name: '경매찾기', path: '/auctions' },
    { name: '안전 시스템', path: '/safety' },
    { name: 'FAQ', path: '/faq' },
  ];

  // 메뉴 클릭 시 수행할 공통 함수
  const handleNavClick = (path: string) => {
    // 만약 현재 위치와 같은 곳을 눌렀을 경우를 위해 수동 스크롤
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#002147] text-white shadow-lg border-b border-white/10">
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
                key={link.path} 
                to={link.path} 
                onClick={() => handleNavClick(link.path)}
                className={`transition-colors duration-200 ${location.pathname === link.path ? 'text-[#D4AF37]' : 'hover:text-[#D4AF37]'}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="xl:hidden bg-[#00152e] border-t border-white/10 py-6 px-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className="text-lg font-medium py-2 border-b border-white/5"
                  onClick={() => handleNavClick(link.path)}
                >
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

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#00152e] text-slate-300 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4">
          {/* AI Grounding Disclaimer */}
          <div className="bg-white/5 rounded-2xl p-6 mb-16 border border-white/10 flex gap-4 items-start">
            <AlertCircle className="text-[#D4AF37] shrink-0" size={20} />
            <p className="text-[11px] text-slate-400 leading-relaxed">
              <strong>법적 고지 및 면책:</strong> JB 하우징의 실시간 통합 검색 결과 및 AI 요약 정보는 Google Search Grounding 및 대법원 데이터를 기반으로 생성된 참고용 데이터입니다. 실제 사건의 상세 내역과 기일 변경 등은 반드시 해당 법원 공고문을 통해 재확인하시기 바라며, AI 분석 결과로 인해 발생하는 직접적·간접적 손해에 대해 본 회사는 고의 또는 중과실이 없는 한 법적 책임을 지지 않습니다. 최종 입찰 결정은 전문가의 대면 상담 및 정밀 권리분석 리포트를 거치시기 바랍니다.
            </p>
          </div>

          {/* Main Footer Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 border-b border-white/5 pb-16">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-6 text-white">
                <Building2 className="w-8 h-8 text-[#D4AF37]" />
                <span className="text-2xl font-bold tracking-tight">JB HOUSING</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-400 mb-8">
                투명함이 만드는 부동산 투자의 미래.<br />
                전문적인 권리분석과 최적의 전략으로 고객의 소중한 자산을 지킵니다.
              </p>
              <div className="flex gap-4">
                <a href="https://blog.naver.com/bosskjp" target="_blank" className="w-10 h-10 bg-white/5 flex items-center justify-center rounded-full hover:bg-[#D4AF37] hover:text-white transition-all">
                  <MessageCircle size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-white/5 flex items-center justify-center rounded-full hover:bg-[#D4AF37] hover:text-white transition-all">
                  <Youtube size={18} />
                </a>
              </div>
            </div>

            <div className="lg:pl-8">
              <h4 className="text-white font-bold mb-6 text-base">고객지원</h4>
              <ul className="space-y-4 text-[14px]">
                <li><Link to="/faq" onClick={() => handleNavClick('/faq')} className="hover:text-[#D4AF37] transition-colors">자주하는 질문</Link></li>
                <li><Link to="/consult" onClick={() => handleNavClick('/consult')} className="hover:text-[#D4AF37] transition-colors">1:1 문의하기</Link></li>
                <li><Link to="/guide" onClick={() => handleNavClick('/guide')} className="hover:text-[#D4AF37] transition-colors">JB 하우징 이용가이드</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 text-base">약관/정책</h4>
              <ul className="space-y-4 text-[14px]">
                <li><Link to="/privacy" onClick={() => handleNavClick('/privacy')} className="hover:text-[#D4AF37] transition-colors font-bold text-white">개인정보 처리방침</Link></li>
                <li><Link to="/terms" onClick={() => handleNavClick('/terms')} className="hover:text-[#D4AF37] transition-colors">이용약관</Link></li>
                <li><Link to="/services" onClick={() => handleNavClick('/services')} className="hover:text-[#D4AF37] transition-colors">회사소개</Link></li>
                <li><Link to="/safety" onClick={() => handleNavClick('/safety')} className="hover:text-[#D4AF37] transition-colors">환불 및 과실 배상 규정</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 text-base">파트너/제휴</h4>
              <ul className="space-y-4 text-[14px]">
                <li><Link to="/experts" onClick={() => handleNavClick('/experts')} className="hover:text-[#D4AF37] transition-colors">대리인 지원하기</Link></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">대리인 앱 다운로드</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">제휴문의</a></li>
              </ul>
            </div>
          </div>

          {/* Business Info & Copyright */}
          <div className="flex flex-col lg:flex-row justify-between gap-10">
            <div className="max-w-3xl">
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-slate-500 mb-6 font-medium">
                <span>(주) JB 하우징</span>
                <span>대표이사 : 김종필</span>
                <span>사업자등록번호 : 123-45-67890</span>
                <span>매수신청대리 등록 : 전주지방법원 00-00-00</span>
                <span>본사 : 전라북도 전주시 완산구 호암로 19 401호</span>
              </div>
              <div className="flex flex-wrap gap-6 text-[13px] text-slate-500">
                <span className="flex items-center gap-2"><PhoneCall size={14} className="text-[#D4AF37]" /> 고객센터 : 063-715-1213</span>
                <span className="flex items-center gap-2"><Smartphone size={14} className="text-[#D4AF37]" /> 직통문의 : 010-2787-3456</span>
                <span className="flex items-center gap-2"><Mail size={14} className="text-[#D4AF37]" /> Email : bosskjp@naver.com</span>
              </div>
            </div>
            
            <div className="flex flex-col items-start lg:items-end justify-between py-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-4 py-2 rounded-full mb-6">
                <ShieldCheck size={16} /> 공제보험 2억 원 가입 인증 업체
              </div>
              <p className="text-[12px] text-slate-600">© 2024 (주) JB HOUSING. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const Smartphone = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-smartphone"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
);
