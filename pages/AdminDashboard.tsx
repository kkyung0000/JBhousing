
import React, { useState } from 'react';
import { mockAuctions, mockInquiries } from '../data/mockData';
import { Plus, Edit2, Trash2, TrendingUp, Users, FileText, CheckCircle, Settings, Server, Smartphone, Database, Globe, ShieldAlert, Cpu } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'auctions' | 'system'>('auctions');

  return (
    <div className="bg-[#F4F7FA] min-h-screen pb-32">
      <div className="bg-[#001A3D] pt-16 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <h1 className="text-3xl font-black text-white font-serif mb-2">Management Terminal</h1>
              <p className="text-slate-400 text-sm font-medium">통합 경매 관리 및 시스템 인프라 관제</p>
            </div>
            <div className="flex bg-white/10 p-1 rounded-2xl backdrop-blur-md">
               <button 
                 onClick={() => setActiveTab('auctions')}
                 className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${activeTab === 'auctions' ? 'bg-[#C5A059] text-[#001A3D]' : 'text-slate-400 hover:text-white'}`}
               >
                 경매/문의 관리
               </button>
               <button 
                 onClick={() => setActiveTab('system')}
                 className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${activeTab === 'system' ? 'bg-[#C5A059] text-[#001A3D]' : 'text-slate-400 hover:text-white'}`}
               >
                 시스템 구성 (Stack)
               </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-12">
        {activeTab === 'auctions' ? (
          <div className="space-y-12">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { icon: <TrendingUp size={20} />, label: "진행중인 경매", value: "24건", color: "text-[#001A3D]" },
                { icon: <Users size={20} />, label: "신규 문의", value: "12건", color: "text-[#C5A059]" },
                { icon: <FileText size={20} />, label: "대행 보고서", value: "85건", color: "text-[#001A3D]" },
                { icon: <CheckCircle size={20} />, label: "최종 낙찰", value: "142건", color: "text-emerald-500" },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-8 rounded-[2rem] shadow-xl border border-white">
                  <div className={`flex items-center gap-3 mb-4 ${stat.color}`}>
                    {stat.icon} <span className="font-black text-slate-400 text-[11px] uppercase tracking-widest">{stat.label}</span>
                  </div>
                  <div className="text-3xl font-black text-[#001A3D] font-serif">{stat.value}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-6">
                <div className="flex justify-between items-center">
                   <h2 className="text-xl font-black text-[#001A3D]">물건 실시간 관리</h2>
                   <button className="bg-[#001A3D] text-white px-6 py-3 rounded-xl font-black text-sm flex items-center gap-2 hover:bg-slate-900 transition shadow-lg">
                      <Plus size={18} /> 새 물건 등록
                   </button>
                </div>
                <div className="bg-white rounded-[2.5rem] shadow-xl border border-white overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        <th className="px-8 py-5 font-black text-[10px] text-slate-400 uppercase tracking-widest">사건번호</th>
                        <th className="px-8 py-5 font-black text-[10px] text-slate-400 uppercase tracking-widest">물건명</th>
                        <th className="px-8 py-5 font-black text-[10px] text-slate-400 uppercase tracking-widest">감정가</th>
                        <th className="px-8 py-5 font-black text-[10px] text-slate-400 uppercase tracking-widest">관리</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {mockAuctions.map(auction => (
                        <tr key={auction.id} className="hover:bg-slate-50 transition group">
                          <td className="px-8 py-6 text-sm font-black text-[#C5A059]">{auction.caseNumber}</td>
                          <td className="px-8 py-6 font-bold text-[#001A3D]">{auction.title}</td>
                          <td className="px-8 py-6 text-sm font-medium">{(auction.appraisalValue / 100000000).toFixed(1)}억</td>
                          <td className="px-8 py-6">
                            <div className="flex gap-2">
                              <button className="p-2 text-slate-300 hover:text-[#001A3D] transition"><Edit2 size={16}/></button>
                              <button className="p-2 text-slate-300 hover:text-rose-500 transition"><Trash2 size={16}/></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-xl font-black text-[#001A3D]">최근 상담 문의</h2>
                <div className="space-y-4">
                  {mockInquiries.map(inquiry => (
                    <div key={inquiry.id} className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-white relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 -mr-12 -mt-12 rounded-full group-hover:bg-[#C5A059]/10 transition"></div>
                      <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="font-black text-[#001A3D]">{inquiry.name}</div>
                        <span className="text-[10px] text-slate-400 font-bold">{inquiry.date}</span>
                      </div>
                      <div className="text-[11px] font-bold text-[#C5A059] mb-4">{inquiry.phone}</div>
                      <p className="text-sm text-slate-500 mb-6 italic leading-relaxed">"{inquiry.message}"</p>
                      <button className="w-full py-4 bg-slate-900 text-white rounded-xl text-xs font-black hover:bg-[#C5A059] hover:text-[#001A3D] transition shadow-lg">
                        응대 및 보고서 작성
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Frontend Card */}
                <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-white">
                   <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-8">
                      <Globe size={32} />
                   </div>
                   <h3 className="text-xl font-black text-[#001A3D] mb-2">Web Platform</h3>
                   <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Current Stack: React 19</div>
                   <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                         <span className="text-xs font-bold text-slate-500">배포 상태</span>
                         <span className="text-[10px] font-black bg-emerald-100 text-emerald-600 px-2 py-1 rounded">Active</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                         <span className="text-xs font-bold text-slate-500">반응형 엔진</span>
                         <span className="text-[10px] font-black bg-blue-100 text-blue-600 px-2 py-1 rounded">Tailwind CSS</span>
                      </div>
                   </div>
                </div>

                {/* Backend/DB Card */}
                <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-white relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-6">
                      <ShieldAlert className="text-amber-500 animate-pulse" size={20} />
                   </div>
                   <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-8">
                      <Database size={32} />
                   </div>
                   <h3 className="text-xl font-black text-[#001A3D] mb-2">Backend & DB</h3>
                   <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Planned Stack: Supabase</div>
                   <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-amber-50 rounded-xl">
                         <span className="text-xs font-bold text-amber-600">현재 상태</span>
                         <span className="text-[10px] font-black bg-amber-100 text-amber-600 px-2 py-1 rounded">Simulated (Mock)</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        현재 localStorage를 통한 시뮬레이션 모드입니다. <br/>
                        Supabase 연동 시 실시간 DB 및 Auth가 활성화됩니다.
                      </p>
                      <button className="w-full py-3 border-2 border-emerald-500 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-50 transition">
                         Connect to Supabase
                      </button>
                   </div>
                </div>

                {/* Mobile App Card */}
                <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-white">
                   <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 mb-8">
                      <Smartphone size={32} />
                   </div>
                   <h3 className="text-xl font-black text-[#001A3D] mb-2">Mobile Application</h3>
                   <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Planned Stack: Flutter</div>
                   <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                         <span className="text-xs font-bold text-slate-500">개발 상태</span>
                         <span className="text-[10px] font-black bg-slate-200 text-slate-400 px-2 py-1 rounded">Planned</span>
                      </div>
                      <div className="p-4 bg-slate-900 rounded-2xl">
                         <div className="flex items-center gap-2 mb-2">
                            <Cpu size={14} className="text-[#C5A059]" />
                            <span className="text-[10px] font-black text-white uppercase tracking-widest">Push Service</span>
                         </div>
                         <p className="text-[10px] text-slate-500 leading-relaxed">
                           Flutter 통합 시 낙찰 소식 및 전문가 상담 알림을 푸시 메시지로 전송합니다.
                         </p>
                      </div>
                   </div>
                </div>
             </div>

             <div className="mt-12 bg-[#001A3D] p-12 rounded-[3.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-12 border border-white/10">
                <div className="max-w-xl">
                   <h4 className="text-2xl font-black mb-4 font-serif">통합 아키텍처 로드맵</h4>
                   <p className="opacity-50 text-sm leading-relaxed font-medium">
                     현재 입찰파트너 플랫폼은 웹 프론트엔드 엔진이 완벽히 구축되어 있습니다. 
                     Supabase 백엔드 연동을 위한 데이터 스키마 설계가 완료되었으며, 
                     Flutter 기반의 하이브리드 모바일 앱 런칭을 위해 API 인터페이스를 표준화하고 있습니다.
                   </p>
                </div>
                <div className="bg-white/5 p-8 rounded-3xl border border-white/10 text-center shrink-0">
                   <div className="text-[10px] font-black text-[#C5A059] uppercase tracking-widest mb-2">Build Version</div>
                   <div className="text-2xl font-black">v1.2.0-STABLE</div>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};
