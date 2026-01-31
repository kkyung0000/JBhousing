
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, PhoneCall, LayoutDashboard, MessageCircle, Youtube, Instagram, Mail, Printer, MapPin, Users, Menu, X, ShieldCheck, Info, HelpCircle } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: '서비스 소개', path: '/services' },
    { name: '이용 안내', path: '/guide' },
    { name: '전문가 서비스', path: '/experts' },
    { name: '경매찾기', path: '/auctions' },
    { name: '안전 시스템', path: '/safety' },
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#002147] text-white shadow-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
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
                className={`transition-colors duration-200 ${location.pathname === link.path ? 'text-[#D4AF37]' : 'hover:text-[#D4AF37]'}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/consult" className="hidden sm:block bg-[#D4AF37] text-[#002147] px-6 py-2.5 rounded-lg font-bold hover:bg-white transition-all text-sm shadow-lg shadow-amber-900/20">
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
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                to="/consult" 
                className="bg-[#D4AF37] text-white py-4 rounded-xl text-center font-bold mt-4"
                onClick={() => setIsMobileMenuOpen(false)}
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
      <footer className="bg-[#00152e] text-slate-400 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-6 text-white">
                <Building2 className="w-8 h-8 text-[#D4AF37]" />
                <span className="text-2xl font-bold tracking-tight">(주) JB 하우징</span>
              </div>
              <p className="mb-8 leading-relaxed max-w-md">
                "투명함이 만드는 부동산 투자의 미래"<br />
                JB 하우징은 전주 본사를 중심으로 전국 법원 경매 전문가 네트워크를 통해 가장 안전한 입찰 경험을 제공합니다.
              </p>
              <div className="flex gap-4">
                <a href="https://blog.naver.com/bosskjp" target="_blank" className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-full hover:bg-[#D4AF37] hover:text-white transition-all">
                  <MessageCircle size={22} />
                </a>
                <a href="#" className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-full hover:bg-[#D4AF37] hover:text-white transition-all">
                  <Youtube size={22} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 flex items-center gap-2 underline underline-offset-8 decoration-[#D4AF37]">고객 지원</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm"><PhoneCall size={16} className="text-[#D4AF37]" /> 063-715-1213</li>
                <li className="flex items-center gap-3 text-sm font-bold text-white"><Smartphone size={16} className="text-[#D4AF37]" /> 010-2787-3456</li>
                <li className="flex items-center gap-3 text-sm"><Mail size={16} className="text-[#D4AF37]" /> bosskjp@naver.com</li>
                <li className="flex items-center gap-3 text-sm"><HelpCircle size={16} className="text-[#D4AF37]" /> <Link to="/faq">자주 묻는 질문</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 flex items-center gap-2 underline underline-offset-8 decoration-[#D4AF37]">기업 정보</h4>
              <p className="text-sm leading-7">
                대표이사: 김종필<br />
                사업자등록번호: 000-00-00000<br />
                매수신청대리 등록: 전주지방법원 00-00-00<br />
                본사: 전북 전주시 완산구 호암로 19 401호
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full w-fit">
                <ShieldCheck size={14} /> 공제보험 2억 원 가입 업체
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between text-xs opacity-50 font-medium">
            <p>© 2024 (주) JB HOUSING. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">이용약관</a>
              <a href="#" className="hover:text-white">개인정보처리방침</a>
              <a href="#" className="hover:text-white">윤리강령</a>
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
