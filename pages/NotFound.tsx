
import React from 'react';
import { Link } from 'react-router-dom';
import { Gavel, Home, Search, ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F4F7FA] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center space-y-12">
        <div className="relative inline-block animate-bounce duration-1000">
          <div className="w-32 h-32 bg-[#001A3D] rounded-[2.5rem] flex items-center justify-center shadow-2xl rotate-12">
            <Gavel size={64} className="text-[#C5A059] -rotate-12" />
          </div>
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#C5A059] rounded-full flex items-center justify-center text-[#001A3D] font-black text-xl shadow-lg">
            ?
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-8xl font-black text-[#001A3D] font-serif tracking-tighter">404</h1>
          <h2 className="text-3xl font-black text-[#001A3D]">길을 잃으셨나요?</h2>
          <p className="text-slate-400 font-medium leading-relaxed max-w-md mx-auto">
            요청하신 페이지가 존재하지 않거나 경로가 변경되었습니다.<br/>
            전문가의 안내에 따라 다시 이동해 보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto pt-8">
          <Link 
            to="/" 
            className="flex items-center justify-center gap-3 bg-[#001A3D] text-white py-6 rounded-2xl font-black text-lg hover:bg-slate-900 transition-all shadow-xl shadow-blue-900/10 group"
          >
            <Home size={20} className="group-hover:scale-110 transition" /> 메인으로 돌아가기
          </Link>
          <Link 
            to="/auctions" 
            className="flex items-center justify-center gap-3 bg-white border-2 border-slate-100 text-[#001A3D] py-6 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all shadow-sm group"
          >
            <Search size={20} className="group-hover:scale-110 transition text-[#C5A059]" /> 물건 검색하기
          </Link>
        </div>

        <button 
          onClick={() => window.history.back()} 
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-[#001A3D] transition"
        >
          <ArrowLeft size={16} /> 이전 페이지로 이동
        </button>

        <div className="pt-12 border-t border-slate-200">
          <p className="text-[10px] text-slate-300 font-black uppercase tracking-[0.3em]">
            © 2025 BID PARTNER. PROFESSIONAL LEGAL ASSET MANAGEMENT.
          </p>
        </div>
      </div>
    </div>
  );
};
