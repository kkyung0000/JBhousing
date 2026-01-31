
import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, PhoneCall, LayoutDashboard, MessageCircle, Youtube, Instagram, Mail, Printer, MapPin, Users } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#002147] text-white shadow-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Building2 className="w-8 h-8 text-[#D4AF37]" />
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight leading-none">(주) JB HOUSING</span>
              <span className="text-[10px] opacity-70 tracking-widest mt-1 uppercase">Smart Auction Partner</span>
            </div>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <Link to="/services" className="hover:text-[#D4AF37] transition">서비스 소개</Link>
            <Link to="/experts" className="hover:text-[#D4AF37] transition">전문가 서비스</Link>
            <Link to="/auctions" className="hover:text-[#D4AF37] transition">경매찾기</Link>
            <Link to="/auctions?filter=추천" className="hover:text-[#D4AF37] transition">추천물건</Link>
            <Link to="/" className="hover:text-[#D4AF37] transition">낙찰후기</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/admin" className="hidden sm:flex items-center gap-1 hover:text-[#D4AF37] transition text-[11px] bg-white/10 px-3 py-1 rounded-full">
               <LayoutDashboard size={12} /> 관리자
            </Link>
            <Link to="/consult" className="bg-[#D4AF37] text-white px-4 py-2 rounded font-bold hover:bg-[#b8962f] transition text-sm">
              입찰대행 신청
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#00152e] text-slate-300 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Building2 className="w-8 h-8 text-[#D4AF37]" />
                <span className="text-xl font-bold text-white tracking-tight">(주) JB HOUSING</span>
              </div>
              <p className="mb-6 leading-relaxed max-w-md">
                "알면 돈이되는 경·공매 재테크" <br />
                JB 하우징은 투명한 데이터와 스마트한 권리분석으로 <br/>
                고객님의 성공적인 부동산 투자를 선도합니다.
              </p>
              <div className="flex gap-4">
                <a href="https://blog.naver.com/bosskjp" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 flex items-center justify-center rounded-full hover:bg-[#D4AF37] transition">
                  <MessageCircle size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-white/5 flex items-center justify-center rounded-full hover:bg-[#D4AF37] transition"><Youtube size={20} /></a>
                <a href="#" className="w-10 h-10 bg-white/5 flex items-center justify-center rounded-full hover:bg-[#D4AF37] transition"><Instagram size={20} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">고객센터</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm"><PhoneCall size={14} className="text-[#D4AF37]" /> T. 063-715-1213</li>
                <li className="flex items-center gap-2 text-sm"><Printer size={14} className="text-[#D4AF37]" /> F. 0508-948-3456</li>
                <li className="flex items-center gap-2 text-sm font-bold text-white"><span className="text-[#D4AF37]">M.</span> 010-2787-3456</li>
                <li className="flex items-center gap-2 text-sm"><Mail size={14} className="text-[#D4AF37]" /> bosskjp@naver.com</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">기업정보</h4>
              <p className="text-sm leading-6">
                (주) JB하우징 | 대표: 김종필<br />
                등록번호: 000-00-00000<br />
                전북 전주시 완산구 호암로 19 401호
              </p>
              <p className="text-xs mt-4 opacity-50 flex items-center gap-1">
                <MapPin size={12} /> 전주 본사 및 전국 서비스 지원
              </p>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between text-xs opacity-50">
            <p>© 2024 (주) JB HOUSING. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#">이용약관</a>
              <a href="#">개인정보처리방침</a>
              <a href="https://blog.naver.com/bosskjp" target="_blank">공식 블로그</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
