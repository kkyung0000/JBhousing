
import React, { useState, useEffect } from 'react';
import { mockBiddingRequests } from '../data/mockData';
import { BiddingRequest } from '../types';
import { Handshake, ClipboardList, CheckCircle2, ArrowRight, Lock, Gavel } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BiddingServiceCustomer: React.FC = () => {
  const [requests, setRequests] = useState<BiddingRequest[]>(mockBiddingRequests);

  const statusMap = {
    'PENDING': { label: '접수완료', step: 1, color: 'text-slate-400' },
    'REVIEWING': { label: '서류검토중', step: 2, color: 'text-amber-500' },
    'VERIFIED': { label: '검토완료', step: 3, color: 'text-emerald-500' },
    'COMPLETED': { label: '입찰완료', step: 4, color: 'text-[#C5A059]' },
  };

  if (requests.length === 0) {
    return (
      <div className="bg-[#f8fafc] min-h-screen py-32 text-center">
        <Gavel className="mx-auto text-slate-200 mb-8" size={64} />
        <h2 className="text-2xl font-black text-[#001A3D] mb-4">현재 진행 중인 입찰 대리 내역이 없습니다.</h2>
        <Link to="/consult" className="bg-[#C5A059] text-[#001A3D] px-8 py-4 rounded-xl font-black">첫 대리입찰 신청하기</Link>
      </div>
    );
  }

  const activeRequest = requests[0];
  const currentStatus = statusMap[activeRequest.status as keyof typeof statusMap];

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <section className="bg-[#001A3D] pt-24 pb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C5A059] blur-[180px] opacity-10 rounded-full"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-6 border border-white/20">
                <Handshake size={14} className="text-[#C5A059]" /> Live Bidding Status
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-4 font-serif">내 입찰 대리 현황</h1>
              <p className="opacity-60 font-medium">실시간 데이터 동기화 시스템으로 입찰 진행 상태를 모니터링합니다.</p>
            </div>
            <Link to="/consult" className="bg-[#C5A059] text-[#001A3D] px-8 py-4 rounded-2xl font-black flex items-center gap-2 shadow-xl">
              신규 대리 신청 <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 -mt-16 pb-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div className="bg-white rounded-[3rem] p-10 md:p-12 shadow-2xl border border-slate-100 relative overflow-hidden">
               <div className="flex justify-between items-center mb-12">
                  <h2 className="text-2xl font-black text-[#001A3D] flex items-center gap-3">
                    <ClipboardList className="text-[#C5A059]" /> 진행 프로세스
                  </h2>
                  <div className={`px-4 py-2 rounded-full text-xs font-black bg-slate-50 border border-slate-100 ${currentStatus.color}`}>
                    {currentStatus.label}
                  </div>
               </div>

               <div className="relative flex justify-between items-center max-w-2xl mx-auto mb-16">
                  <div className="absolute h-1 bg-slate-100 w-full top-1/2 -translate-y-1/2 z-0"></div>
                  <div className="absolute h-1 bg-[#C5A059] transition-all duration-1000 top-1/2 -translate-y-1/2 z-0" style={{ width: `${(currentStatus.step - 1) * 33.3}%` }}></div>
                  
                  {[1, 2, 3, 4].map((s) => (
                    <div key={s} className="relative z-10 flex flex-col items-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${
                        s <= currentStatus.step 
                        ? 'bg-[#001A3D] border-[#C5A059] text-white' 
                        : 'bg-white border-slate-100 text-slate-300'
                      }`}>
                        {s < currentStatus.step ? <CheckCircle2 size={24} /> : <span className="font-black">{s}</span>}
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${s <= currentStatus.step ? 'text-[#001A3D]' : 'text-slate-300'}`}>
                        {Object.values(statusMap).find(m => m.step === s)?.label}
                      </span>
                    </div>
                  ))}
               </div>

               <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">의뢰 물건/사건</div>
                    <div className="text-lg font-black text-[#001A3D]">{activeRequest.propertyTitle}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">접수 일시</div>
                    <div className="font-bold text-slate-600">{activeRequest.submittedAt}</div>
                  </div>
               </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-slate-100">
               <h3 className="text-xl font-black text-[#001A3D] mb-8 flex items-center gap-3">
                 <Lock className="text-[#C5A059]" /> 보안 서류 관리
               </h3>
               <div className="space-y-4">
                  {activeRequest.documents.map((doc, i) => (
                    <div key={i} className="p-5 bg-slate-50 rounded-2xl flex items-center justify-between">
                       <span className="text-sm font-bold text-slate-700">{doc.type}</span>
                       <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${doc.status === 'uploaded' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-400'}`}>
                          {doc.status === 'uploaded' ? '완료' : '미업로드'}
                       </span>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
