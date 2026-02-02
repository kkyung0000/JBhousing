
import React from 'react';
import { Search, ChevronRight, Calculator, FileText, CheckCircle2, TrendingUp, Paintbrush, Zap, Trophy, ShieldCheck, Map, ArrowRight, Building2, PhoneCall, Users, Star, Sparkles, Scale, Gavel, BarChart3, Globe, Shield, Target, Award, Signature, FileCheck, Eye } from 'lucide-react';
import { mockAuctions, mockReviews } from '../data/mockData';
import { AuctionCard } from '../components/AuctionCard';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <div className="bg-white">
      {/* 히어로 섹션 - 대리입찰 전문성 극대화 */}
      <section className="relative min-h-[90vh] flex items-center text-white overflow-hidden bg-[#001A3D]">
        <div className="absolute inset-0">
           <img 
            src="https://images.unsplash.com/photo-1582559886470-df618442317c?q=80&w=2000&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-25 mix-blend-luminosity" 
            alt="Court Building" 
           />
           <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D] via-[#001A3D]/90 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 w-full py-20">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-3 mb-12">
              <div className="inline-flex items-center gap-2 bg-[#C5A059] text-[#001A3D] px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.2em] shadow-xl">
                <Gavel size={16} /> 법원 정식 등록 대리입찰 법인
              </div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.2em] border border-white/20">
                <ShieldCheck size={16} className="text-[#C5A059]" /> 2억 원 전문인 배상책임보험 가입
              </div>
            </div>
            
            <h1 className="text-6xl md:text-[92px] font-black leading-[1] mb-12 font-serif tracking-tighter">
              대한민국 <span className="text-[#C5A059]">대리입찰</span>의<br />
              압도적 기준.
            </h1>
            
            <p className="text-xl md:text-3xl text-slate-300 mb-16 leading-relaxed font-medium max-w-2xl border-l-4 border-[#C5A059] pl-8">
              당신이 잠든 사이, 전문가 그룹이<br/>
              가장 안전한 낙찰의 기회를 선점합니다.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/consult" className="group bg-[#C5A059] text-[#001A3D] px-12 py-7 rounded-2xl font-black text-xl hover:bg-white transition-all flex items-center justify-center gap-4 shadow-2xl shadow-black/50">
                무료 대리입찰 상담 <ArrowRight className="group-hover:translate-x-2 transition" />
              </Link>
              <Link to="/guide" className="bg-white/5 border border-white/20 text-white px-12 py-7 rounded-2xl font-black text-xl hover:bg-white/10 transition flex items-center justify-center gap-4 backdrop-blur-md">
                서비스 이용 가이드 <ChevronRight size={24} />
              </Link>
            </div>
          </div>
        </div>

        {/* 하단 전문가 증명 섹션 */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-7xl px-6 hidden xl:grid grid-cols-4 gap-12 border-t border-white/10 pt-12">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#C5A059]/10 rounded-xl flex items-center justify-center text-[#C5A059] border border-[#C5A059]/30">
                 <Building2 size={24} />
              </div>
              <div>
                 <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">법원등록번호</div>
                 <div className="text-sm font-bold">전주지법 제 12-23-45호</div>
              </div>
           </div>
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#C5A059]/10 rounded-xl flex items-center justify-center text-[#C5A059] border border-[#C5A059]/30">
                 <Award size={24} />
              </div>
              <div>
                 <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">실무 경력</div>
                 <div className="text-sm font-bold">베테랑 전문가 15년+</div>
              </div>
           </div>
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#C5A059]/10 rounded-xl flex items-center justify-center text-[#C5A059] border border-[#C5A059]/30">
                 <Signature size={24} />
              </div>
              <div>
                 <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">책임 보증</div>
                 <div className="text-sm font-bold">2억 원 배상책임보험</div>
              </div>
           </div>
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#C5A059]/10 rounded-xl flex items-center justify-center text-[#C5A059] border border-[#C5A059]/30">
                 <Globe size={24} />
              </div>
              <div>
                 <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">대행 가능 지역</div>
                 <div className="text-sm font-bold">전국 18개 법원 관할</div>
              </div>
           </div>
        </div>
      </section>

      {/* 대리입찰 핵심 프로세스 섹션 */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h4 className="text-[11px] font-black text-[#C5A059] uppercase tracking-[0.4em] mb-4">Service Flow</h4>
            <h2 className="text-5xl font-black text-[#001A3D] font-serif mb-6 leading-tight">입찰파트너만의<br/>프리미엄 대리 시스템</h2>
            <p className="text-slate-500 font-medium leading-relaxed">단순히 입찰표를 대신 써주는 것이 아닙니다. 입찰파트너는 법적 권리 보호부터 사후 명도까지 완벽한 원스톱 관리 시스템을 제공합니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                step: '01', 
                icon: <FileCheck className="w-8 h-8" />, 
                title: '정밀 권리 분석', 
                desc: '대법원 등기부 및 점유 관계를 실시간 판독하여 낙찰 후 발생할 수 있는 모든 리스크를 원천 차단합니다.' 
              },
              { 
                step: '02', 
                icon: <Map className="w-8 h-8" />, 
                title: '현장 실사 보고', 
                desc: '지역 수석 마스터가 직접 현장을 방문하여 외관 상태, 점유 현황, 체납 관리비 등을 밀착 조사합니다.' 
              },
              { 
                step: '03', 
                icon: <Gavel className="w-8 h-8" />, 
                title: '전략 입찰 대행', 
                desc: '빅데이터 기반의 낙찰가 시뮬레이션을 통해 최적의 가격을 산출하고 법원 입찰 전 과정을 대행합니다.' 
              },
              { 
                step: '04', 
                icon: <ShieldCheck className="w-8 h-8" />, 
                title: '책임 명도 완료', 
                desc: '낙찰 이후 가장 까다로운 점유자 인도 절차를 법률 지원팀이 원만하게 해결하여 입주를 지원합니다.' 
              }
            ].map((item, i) => (
              <div key={i} className="relative group bg-white p-12 rounded-[2.5rem] border border-slate-100 hover:border-[#C5A059] hover:shadow-2xl transition-all duration-500">
                <div className="absolute top-8 right-10 text-5xl font-black text-slate-50 group-hover:text-[#C5A059]/10 transition font-serif">{item.step}</div>
                <div className="text-[#C5A059] mb-10 group-hover:scale-110 transition duration-500 relative z-10">{item.icon}</div>
                <h3 className="text-2xl font-black text-[#001A3D] mb-4 font-serif relative z-10">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed font-medium relative z-10">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Terminal - 대리인을 위한 강력한 도구 강조 */}
      <section className="py-24 bg-[#001A3D] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="lg:w-1/2">
               <div className="bg-gradient-to-br from-[#002147] to-[#000F24] p-10 rounded-[3rem] border border-white/5 relative shadow-2xl">
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#C5A059]/10 blur-3xl rounded-full"></div>
                  <div className="relative z-10 bg-[#001A3D] rounded-3xl p-8 border border-white/10 font-mono text-[12px] text-emerald-500 space-y-4">
                     <div className="flex items-center gap-2 text-slate-500 mb-6">
                        <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span className="ml-4 opacity-50">AGENT_INTELLIGENCE_CORE</span>
                     </div>
                     <div>> ANALYZING_RIGHTS_STRUCTURE... [100%]</div>
                     <div className="text-white font-black">> 말소기준권리: 2018-05-12 근저당권 (안전)</div>
                     <div className="text-[#C5A059]">> 예상 낙찰가율 시뮬레이션: 87.4%</div>
                     <div className="h-0.5 bg-white/5 my-4"></div>
                     <div className="text-white opacity-40 leading-relaxed">
                        본 보고서는 대법원 법원경매정보와 연동되어 <br/>
                        담당 대리인의 현장 분석과 결합된 최종 전략 리포트입니다.
                     </div>
                  </div>
                  {/* Floating Elements */}
                  <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-2xl flex items-center gap-4">
                     <TrendingUp className="text-emerald-500" size={32} />
                     <div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Expected Success</div>
                        <div className="text-xl font-black text-[#001A3D]">HIGH CONFIDENCE</div>
                     </div>
                  </div>
               </div>
            </div>
            
            <div className="lg:w-1/2">
              <h4 className="text-[11px] font-black text-[#C5A059] uppercase tracking-[0.4em] mb-6">AI Powered Proxy</h4>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-10 font-serif leading-tight">
                경매 전문가의 직관과<br/>
                <span className="text-[#C5A059]">AI 정밀 데이터</span>의 결합
              </h2>
              <p className="text-lg text-slate-400 mb-12 leading-relaxed font-medium">
                입찰파트너의 모든 대리인은 독자적인 AI 분석 터미널을 사용합니다. 
                사람이 놓칠 수 있는 0.1%의 법적 리스크까지 인공지능이 먼저 필터링하고, 
                베테랑 전문가가 현장에서 한 번 더 검증합니다.
              </p>
              
              <div className="grid grid-cols-2 gap-8 mb-12">
                 <div className="space-y-2">
                    <div className="text-3xl font-black text-white font-serif">100%</div>
                    <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">권리 분석 안전 보장</div>
                 </div>
                 <div className="space-y-2">
                    <div className="text-3xl font-black text-white font-serif">150+</div>
                    <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">검증된 대리 전문가</div>
                 </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/ai-analysis" className="group inline-flex items-center justify-center gap-4 bg-[#C5A059] text-[#001A3D] px-10 py-6 rounded-xl font-black text-lg hover:bg-white transition-all shadow-2xl shadow-black/40">
                  AI 권리분석 시작하기 <ChevronRight size={24} className="group-hover:translate-x-1 transition" />
                </Link>
                <Link to="/ai-analysis" className="inline-flex items-center justify-center gap-3 text-white/60 hover:text-[#C5A059] font-black text-sm transition">
                  <Eye size={20} /> 분석 결과 샘플 보기
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h4 className="text-[11px] font-black text-[#C5A059] uppercase tracking-[0.4em] mb-4">Investment Board</h4>
              <h2 className="text-4xl font-black text-[#001A3D] font-serif">실시간 대리입찰 추천 물건</h2>
            </div>
            <Link to="/auctions" className="text-[#001A3D] font-black hover:text-[#C5A059] transition flex items-center gap-2 text-sm uppercase tracking-widest border-b-2 border-slate-100 pb-2">
              전체 물건 보기 <ChevronRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockAuctions.slice(0, 4).map(item => (
              <AuctionCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Safety Banner */}
      <section className="py-24 bg-slate-50 border-t border-slate-100 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="bg-[#001A3D] rounded-[3.5rem] p-12 md:p-20 text-white flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/10 blur-[100px] rounded-full"></div>
             
             <div className="max-w-xl">
                <div className="w-20 h-20 bg-[#C5A059] rounded-2xl flex items-center justify-center text-[#001A3D] mb-10 shadow-xl shadow-black/30">
                   <ShieldCheck size={44} />
                </div>
                <h3 className="text-4xl font-black mb-8 font-serif">의뢰인의 자산은<br/><span className="text-[#C5A059]">2억 원 보험</span>으로 보호됩니다.</h3>
                <p className="text-slate-400 font-medium leading-relaxed text-lg">
                   입찰파트너는 법적으로 검증되지 않은 대행을 철저히 배격합니다. 
                   모든 대리입찰 계약은 공인된 보험 가입 증명과 함께 진행되며, 
                   분석 과실 발생 시 법적 배상을 100% 보장합니다.
                </p>
             </div>
             
             <div className="flex flex-col gap-4 w-full lg:w-auto">
                <Link to="/consult" className="bg-[#C5A059] text-[#001A3D] px-12 py-7 rounded-2xl font-black text-xl hover:bg-white transition-all text-center shadow-xl">
                   대리입찰 즉시 신청
                </Link>
                <div className="flex items-center justify-center gap-6 opacity-40 grayscale group-hover:grayscale-0 transition duration-500 pt-4">
                   <div className="bg-white/10 px-4 py-2 rounded text-[10px] font-black uppercase tracking-widest">Court Registered</div>
                   <div className="bg-white/10 px-4 py-2 rounded text-[10px] font-black uppercase tracking-widest">Certified Indemnity</div>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};
