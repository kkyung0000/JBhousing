
import React, { useState } from 'react';
import { MapPin, Award, Briefcase, Globe, Info, UserPlus, X } from 'lucide-react';
import { mockAgents } from '../data/mockData';
import { Agent } from '../types';

export const ExpertList: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState('전체');
  const [experts, setExperts] = useState<Agent[]>(mockAgents);

  const regions = [
    '전체', '서울', '경기', '인천', '부산', '대구', '대전', '광주', '전북', '전남'
  ];

  const filteredAgents = selectedRegion === '전체' 
    ? experts 
    : experts.filter(agent => agent.region.includes(selectedRegion));

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-[#001A3D] py-24 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C5A059] blur-[180px] opacity-10 rounded-full"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-8 border border-white/20">
            <Globe size={14} className="text-[#C5A059]" /> Nationwide Expert Network
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-8 font-serif">전문가 그룹</h1>
          <p className="text-lg md:text-xl opacity-70 max-w-2xl mx-auto leading-relaxed font-medium">
            전국 18개 시·도, 입찰파트너가 보증하는 <br className="hidden md:block"/>
            베테랑 대리입찰 전문가를 확인하세요.
          </p>
        </div>
      </section>

      <div className="bg-white border-b border-slate-200 sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center py-5">
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
            {regions.map(region => (
              <button key={region} onClick={() => setSelectedRegion(region)} className={`px-6 py-2 rounded-full text-sm font-black transition-all whitespace-nowrap border-2 ${selectedRegion === region ? 'bg-[#001A3D] text-white border-[#001A3D]' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200'}`}>
                {region}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filteredAgents.map(agent => (
            <div key={agent.id} className="bg-white rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex group">
              <div className="w-2/5 h-auto overflow-hidden">
                <img src={agent.imageUrl} alt={agent.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
              </div>
              <div className="w-3/5 p-10 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-black text-[#001A3D] mb-1">{agent.name} <span className="text-xs font-bold text-slate-300">중개사</span></h3>
                  <div className="inline-flex items-center gap-1 text-[#C5A059] text-[11px] font-black uppercase bg-slate-50 px-3 py-1 rounded-full mb-6">
                    <MapPin size={12} /> {agent.region}
                  </div>
                  <div className="space-y-4 text-sm font-bold text-slate-500">
                    <div className="flex items-center gap-3"><Award size={18} className="text-[#C5A059]" /> 경력 {agent.experience}</div>
                    <div className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">등록번호: {agent.licenseNumber}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a href={`tel:${agent.phone}`} className="flex-1 bg-[#001A3D] text-white py-3 rounded-xl font-black text-center text-sm">상담 연결</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
