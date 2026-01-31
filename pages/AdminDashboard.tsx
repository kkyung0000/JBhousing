
import React from 'react';
import { mockAuctions, mockInquiries } from '../data/mockData';
import { Plus, Edit2, Trash2, TrendingUp, Users, FileText, CheckCircle } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Sidebar-less layout for SPA simplicity */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-[#002147]">Admin Dashboard</h1>
          <button className="bg-[#D4AF37] text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-[#b8962f] transition">
            <Plus size={18} /> 새 물건 등록
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-4 text-[#002147]">
              <TrendingUp /> <span className="font-bold text-slate-400 text-sm">진행중인 경매</span>
            </div>
            <div className="text-3xl font-bold">24건</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-4 text-[#002147]">
              <Users /> <span className="font-bold text-slate-400 text-sm">신규 문의</span>
            </div>
            <div className="text-3xl font-bold text-[#D4AF37]">12건</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-4 text-[#002147]">
              <FileText /> <span className="font-bold text-slate-400 text-sm">대행 보고서</span>
            </div>
            <div className="text-3xl font-bold">85건</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-4 text-emerald-500">
              <CheckCircle /> <span className="font-bold text-slate-400 text-sm">최종 낙찰</span>
            </div>
            <div className="text-3xl font-bold">142건</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Auction Table */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-[#002147]">물건 관리</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 font-bold text-xs text-slate-400 uppercase">사건번호</th>
                    <th className="px-6 py-4 font-bold text-xs text-slate-400 uppercase">물건명</th>
                    <th className="px-6 py-4 font-bold text-xs text-slate-400 uppercase">감정가</th>
                    <th className="px-6 py-4 font-bold text-xs text-slate-400 uppercase">상태</th>
                    <th className="px-6 py-4 font-bold text-xs text-slate-400 uppercase">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {mockAuctions.map(auction => (
                    <tr key={auction.id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4 text-sm font-bold text-slate-500">{auction.caseNumber}</td>
                      <td className="px-6 py-4 font-bold">{auction.title}</td>
                      <td className="px-6 py-4 text-sm">{(auction.appraisalValue / 100000000).toFixed(1)}억</td>
                      <td className="px-6 py-4">
                        <span className="bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-0.5 rounded text-[10px] font-bold">{auction.status}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="p-2 text-slate-400 hover:text-[#002147]"><Edit2 size={16}/></button>
                          <button className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={16}/></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Inquiry List */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#002147]">최근 상담 문의</h2>
            <div className="space-y-4">
              {mockInquiries.map(inquiry => (
                <div key={inquiry.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-bold text-[#002147]">{inquiry.name}</div>
                    <span className="text-[10px] text-slate-400">{inquiry.date}</span>
                  </div>
                  <div className="text-xs text-slate-500 mb-4">{inquiry.phone}</div>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2 italic">"{inquiry.message}"</p>
                  <button className="w-full py-2 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold hover:bg-emerald-100 transition">
                    응대 완료하기
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
