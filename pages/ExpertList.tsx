
import React, { useState } from 'react';
import { mockAgents } from '../data/mockData';
// Added CheckCircle2 to imports
import { MapPin, Phone, ShieldCheck, Award, Briefcase, ChevronRight, Search, UserPlus, Info, ArrowRight, Building2, Globe, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ExpertList: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState('전체');
  
  // 대한민국 전국 광역자치단체 리스트
  const regions = [
    '전체', '서울', '경기', '인천', '부산', '대구', '대전', '광주', '울산', '세종', 
    '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'
  ];

  const filteredAgents = selectedRegion === '전체' 
    ? mockAgents 
    : mockAgents.filter(agent => agent.region.includes(selectedRegion));

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Page Header */}
      <section className="bg-[#002147] py-24 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37] blur-[180px] opacity-10 rounded-full"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-8 border border-white/20">
            <Globe size={14} className="text-[#D4AF37]" /> Nationwide Expert Network
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-8 font-serif leading-tight">전문가 서비스</h1>
          <p className="text-lg md:text-xl opacity-70 max-w-2xl mx-auto leading-relaxed font-medium">
            전국 18개 시·도, JB 하우징이 보증하는 <br className="hidden md:block"/>
            베테랑 법원경매 매수신청대리 전문가 그룹을 소개합니다.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-5">
            {regions.map(region => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-6 py-2.5 rounded-full text-sm font-black transition-all whitespace-nowrap border-2 ${
                  selectedRegion === region 
                  ? 'bg-[#002147] text-white border-[#002147] shadow-lg shadow-blue-900/20 scale-105' 
                  : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200 hover:text-slate-600'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex items-center justify-between mb-12">
           <h2 className="text-2xl font-black text-[#002147] flex items-center gap-3">
              <MapPin className="text-[#D4AF37]" /> {selectedRegion} 지역 전문가
           </h2>
           <div className="hidden md:flex items-center gap-2 bg-white px-5 py-3 rounded-2xl border border-slate-100 shadow-sm group focus-within:border-[#D4AF37] transition-all">
              <Search size={18} className="text-slate-300 group-focus-within:text-[#D4AF37]" />
              <input type="text" placeholder="성함으로 검색" className="text-sm font-bold focus:outline-none bg-transparent" />
           </div>
        </div>

        {filteredAgents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
            {filteredAgents.map(agent => (
              <div key={agent.id} className="bg-white rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col lg:flex-row group">
                <div className="lg:w-2/5 h-80 lg:h-auto overflow-hidden relative">
                  <img src={agent.imageUrl} alt={agent.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                </div>
                
                <div className="lg:w-3/5 p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-2xl font-black text-[#002147] mb-1">{agent.name} <span className="text-xs font-bold text-slate-300 ml-1">공인중개사</span></h3>
                        <div className="inline-flex items-center gap-1.5 text-[#D4AF37] text-[11px] font-black uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                          <MapPin size={12} fill="currentColor" /> {agent.region}
                        </div>
                      </div>
                      <div className="bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-xl text-[10px] font-black flex items-center gap-1.5 border border-emerald-100">
                        <ShieldCheck size={14} fill="currentColor" /> JB CERTIFIED
                      </div>
                    </div>

                    <div className="space-y-4 mb-10">
                      <div className="flex items-center gap-3 text-sm font-bold text-slate-500">
                        <Award size={18} className="text-[#D4AF37]" />
                        <span>경력: <span className="text-[#002147]">{agent.experience}</span></span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 text-sm font-bold text-slate-500">
                          <Briefcase size={18} className="text-[#D4AF37]" />
                          <span>전문분야</span>
                        </div>
                        <div className="flex flex-wrap gap-2 pl-7">
                          {agent.specialty.map(s => (
                            <span key={s} className="bg-slate-50 text-slate-400 px-3 py-1 rounded-lg text-[10px] font-black border border-slate-100 group-hover:bg-white group-hover:border-[#D4AF37]/30 transition">#{s}</span>
                          ))}
                        </div>
                      </div>
                      <div className="pl-7 text-[10px] text-slate-300 font-bold italic">License No. {agent.licenseNumber}</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <a href={`tel:${agent.phone}`} className="flex-1 bg-[#002147] text-white py-4 rounded-2xl font-black text-sm text-center hover:bg-slate-900 transition flex items-center justify-center gap-2 shadow-xl shadow-blue-900/10 active:scale-95">
                      <Phone size={16} /> 즉시 상담
                    </a>
                    <button className="flex-1 bg-slate-50 text-slate-500 py-4 rounded-2xl font-black text-sm hover:bg-white hover:text-[#002147] border border-transparent hover:border-slate-100 transition flex items-center justify-center gap-1">
                      프로필 상세 <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 animate-in fade-in zoom-in duration-500">
            <div className="bg-white rounded-[4rem] p-16 md:p-24 border-2 border-dashed border-slate-200 text-center flex flex-col items-center max-w-4xl mx-auto shadow-inner relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-2 bg-slate-100"></div>
               <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-[#D4AF37] mb-10 shadow-sm">
                  <UserPlus size={48} />
               </div>
               <h3 className="text-3xl font-black text-[#002147] mb-6 font-serif">현재 <span className="text-[#D4AF37]">{selectedRegion}</span> 지역의 <br className="md:hidden"/> 전문가를 모집 중입니다.</h3>
               <p className="text-slate-400 font-medium text-lg leading-relaxed mb-12 max-w-xl">
                  JB 하우징은 엄격한 기준을 통과한 지역별 최정예 전문가만을 선별하여 모시고 있습니다. <br className="hidden md:block"/>
                  이 지역의 새로운 파트너가 되어 의뢰인들의 자산을 함께 지켜주세요.
               </p>
               
               <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                  <Link to="/consult" className="bg-[#D4AF37] text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-[#b8962f] transition shadow-2xl shadow-amber-900/20 flex items-center justify-center gap-3 active:scale-95">
                     대리인 지원하기 <UserPlus size={24} />
                  </Link>
                  <a href="tel:063-715-1213" className="bg-[#002147] text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-slate-900 transition shadow-2xl shadow-blue-900/10 flex items-center justify-center gap-3 active:scale-95">
                     본사 직통 문의 <Phone size={24} />
                  </a>
               </div>
               
               <div className="mt-16 pt-10 border-t border-slate-50 grid grid-cols-1 sm:grid-cols-3 gap-8 w-full opacity-60">
                  <div className="space-y-2">
                     <div className="font-black text-[#002147] text-sm uppercase tracking-widest">배정 우선권</div>
                     <p className="text-[11px] font-bold text-slate-400">지역 내 신규 상담 발생 시 <br/>최우선 전문가 매칭 지원</p>
                  </div>
                  <div className="space-y-2">
                     <div className="font-black text-[#002147] text-sm uppercase tracking-widest">플랫폼 노출</div>
                     <p className="text-[11px] font-bold text-slate-400">월 5만 명 이상의 <br/>투자자들에게 프로필 홍보</p>
                  </div>
                  <div className="space-y-2">
                     <div className="font-black text-[#002147] text-sm uppercase tracking-widest">AI 리포트 지원</div>
                     <p className="text-[11px] font-bold text-slate-400">자체 AI 엔진을 활용한 <br/>고품질 권리분석 도구 제공</p>
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>

      {/* Trust & Policy Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                 <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest mb-6 border border-emerald-100">
                    <ShieldCheck size={14} fill="currentColor" /> Rigorous Verification System
                 </div>
                 <h2 className="text-4xl md:text-5xl font-black text-[#002147] mb-8 font-serif leading-tight">검증된 전문가만이 <br/><span className="text-[#D4AF37]">의뢰인의 자산</span>을 지킵니다</h2>
                 <p className="text-slate-500 text-lg leading-relaxed font-medium mb-12">
                    JB 하우징의 전문가 네트워크는 단순한 등록제가 아닌 **엄격한 5단계 검증 시스템**을 통해 운영됩니다. 
                    자격증 확인은 기본, 실전 경매 경력 50건 이상의 베테랑만을 선별하여 고객님의 소중한 기회를 가치 있는 투자로 만들어 드립니다.
                 </p>
                 <div className="space-y-6">
                    <div className="flex gap-5">
                       <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-[#D4AF37] shrink-0 border border-slate-100 shadow-sm"><CheckCircle2 size={24} /></div>
                       <div>
                          <h4 className="font-black text-[#002147] mb-1">매수신청대리 법원 공식 등록 여부</h4>
                          <p className="text-sm text-slate-400 font-medium">실제 법원에 등록되어 책임 보험에 가입된 전문가만 활동 가능</p>
                       </div>
                    </div>
                    <div className="flex gap-5">
                       <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-[#D4AF37] shrink-0 border border-slate-100 shadow-sm"><CheckCircle2 size={24} /></div>
                       <div>
                          <h4 className="font-black text-[#002147] mb-1">낙찰 데이터 기반의 실력 검증</h4>
                          <p className="text-sm text-slate-400 font-medium">최근 3년간의 낙찰 성공 사례 및 권리분석 정확도 정기 평가</p>
                       </div>
                    </div>
                 </div>
              </div>
              <div className="relative">
                 <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#D4AF37]/20 blur-[60px] rounded-full"></div>
                 <div className="bg-[#002147] rounded-[3.5rem] p-12 text-white shadow-2xl relative z-10 overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full group-hover:scale-150 transition duration-700"></div>
                    <Building2 className="text-[#D4AF37] mb-8" size={64} />
                    <h3 className="text-3xl font-black mb-6">전국 어디서나 <br/>안심하고 위임하세요</h3>
                    <p className="opacity-60 leading-relaxed font-medium mb-10 text-lg">
                       지방 물건이라도 걱정하실 필요 없습니다. <br/>
                       현지 사정에 가장 밝은 전문가가 임장부터 낙찰까지 밀착 관리해 드립니다.
                    </p>
                    <Link to="/consult" className="inline-flex items-center gap-2 bg-white text-[#002147] px-8 py-4 rounded-2xl font-black text-lg hover:bg-[#D4AF37] hover:text-white transition group">
                       상담 예약하기 <ChevronRight className="group-hover:translate-x-1 transition" size={20} />
                    </Link>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};
