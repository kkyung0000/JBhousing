
import React, { useState } from 'react';
import { mockAgents } from '../data/mockData';
import { MapPin, Phone, ShieldCheck, Award, Briefcase, ChevronRight, Search } from 'lucide-react';

export const ExpertList: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState('전체');
  const regions = ['전체', '전북', '서울', '경기'];

  const filteredAgents = selectedRegion === '전체' 
    ? mockAgents 
    : mockAgents.filter(agent => agent.region.includes(selectedRegion));

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Page Header */}
      <section className="bg-[#002147] py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-serif">전문가 서비스</h1>
          <p className="text-lg opacity-70 max-w-2xl mx-auto leading-relaxed">
            전국 주요 거점의 베테랑 공인중개사가 고객님의 현지 파트너가 되어 드립니다. <br/>
            JB 하우징이 보증하는 정예 전문가 그룹을 만나보세요.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
            {regions.map(region => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition whitespace-nowrap border ${
                  selectedRegion === region 
                  ? 'bg-[#D4AF37] text-white border-[#D4AF37]' 
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-2 text-slate-400 text-sm">
            <Search size={16} />
            <input type="text" placeholder="전문가 이름 검색" className="focus:outline-none" />
          </div>
        </div>
      </div>

      {/* Agent Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredAgents.map(agent => (
            <div key={agent.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col sm:flex-row">
              <div className="sm:w-2/5 h-64 sm:h-auto overflow-hidden">
                <img src={agent.imageUrl} alt={agent.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="sm:w-3/5 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-[#002147]">{agent.name} <span className="text-sm font-medium text-slate-400 ml-1">공인중개사</span></h3>
                      <div className="flex items-center gap-1 text-[#D4AF37] text-sm font-bold mt-1">
                        <MapPin size={14} /> {agent.region}
                      </div>
                    </div>
                    <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
                      <ShieldCheck size={12}/> JB 인증 파트너
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <Award size={16} className="text-slate-400" />
                      <span>경력: <span className="font-bold text-slate-900">{agent.experience}</span></span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-slate-600">
                      <Briefcase size={16} className="text-slate-400 mt-1" />
                      <div>
                        <span className="block mb-1">전문분야:</span>
                        <div className="flex flex-wrap gap-1">
                          {agent.specialty.map(s => (
                            <span key={s} className="bg-slate-100 px-2 py-0.5 rounded text-[10px] font-medium text-slate-500">#{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-300">자격번호: {agent.licenseNumber}</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <a href={`tel:${agent.phone}`} className="flex-1 bg-[#002147] text-white py-3 rounded-xl font-bold text-center hover:bg-slate-900 transition flex items-center justify-center gap-2">
                    <Phone size={16} /> 전화상담
                  </a>
                  <button className="flex-1 border border-slate-200 text-slate-600 py-3 rounded-xl font-bold hover:bg-slate-50 transition flex items-center justify-center gap-1">
                    프로필 상세보기 <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAgents.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-400">해당 지역의 전문가를 준비 중입니다. 본사로 직접 문의주시면 친절히 안내해 드립니다.</p>
          </div>
        )}
      </div>

      {/* Trust Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-[#D4AF37]/10 text-[#D4AF37] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-2xl font-bold text-[#002147] mb-4">엄격한 검증 시스템</h2>
          <p className="text-slate-500 leading-relaxed">
            JB 하우징의 전문가 그룹은 공인중개사 자격증 보유는 물론, <br/>
            실전 경매 낙찰 경험 50건 이상의 베테랑만을 선별하여 구성하였습니다. <br/>
            현장 방문부터 서류 분석까지, 안심하고 맡기셔도 좋습니다.
          </p>
        </div>
      </section>
    </div>
  );
};
