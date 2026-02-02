
import React from 'react';
import { ShieldCheck, TrendingUp, Paintbrush, Scale, CheckCircle2, ArrowRight, Building, FileText, Landmark, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ServiceIntro: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-[#002147] py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block bg-[#D4AF37] px-4 py-1 rounded-full text-xs font-bold mb-6 tracking-widest uppercase">
            Professional Services
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-8 font-serif leading-tight">
            알면 돈이되는 <br/> <span className="text-[#D4AF37]">경·공매 재테크 솔루션</span>
          </h1>
          <p className="text-lg opacity-70 max-w-2xl mx-auto leading-relaxed">
            (주) 입찰파트너는 권리분석의 전문성과 실전 낙찰 노하우를 결합하여 <br className="hidden md:block"/>
            고객님의 자산을 안전하게 지키고 수익을 극대화합니다.
          </p>
        </div>
      </section>

      {/* Core Business 1: Auction Proxy */}
      <section className="py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-3 text-[#D4AF37] font-bold mb-4">
                <Scale size={24} /> <span>01. 경·공매 업무대행</span>
              </div>
              <h2 className="text-3xl font-bold text-[#002147] mb-6">안전한 낙찰의 시작, <br/>정밀 권리분석 서비스</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                법원 경매의 리스크는 아는 만큼 보입니다. 입찰파트너는 법률 전문가 그룹과 임장 팀이 협업하여 
                서류상 권리관계는 물론, 현장의 점유 관계와 유치권 여부까지 완벽하게 파악합니다.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  '등기부 및 물건명세서 정밀 분석',
                  '점유자 파악 및 현장 임장 조사',
                  '예상 낙찰가 산정 및 입찰 전략 수립',
                  '낙찰 후 깔끔한 명도 및 인도 지원'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="text-[#D4AF37]" size={20} /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 text-center">
                 <FileText className="w-12 h-12 text-[#002147] mx-auto mb-4" />
                 <div className="font-bold text-slate-800">분석 보고서</div>
                 <div className="text-xs text-slate-500 mt-2">사건별 10P 분량의 <br/>심층 분석 제공</div>
              </div>
              <div className="bg-[#D4AF37]/5 p-8 rounded-3xl border border-[#D4AF37]/20 text-center">
                 <Landmark className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
                 <div className="font-bold text-slate-800">법원 동행</div>
                 <div className="text-xs text-slate-500 mt-2">입찰 당일 <br/>전문가 동행 지원</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Business 2: Consulting */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-3 text-[#D4AF37] font-bold mb-4">
                <TrendingUp size={24} /> <span>02. 부동산 컨설팅</span>
              </div>
              <h2 className="text-3xl font-bold text-[#002147] mb-6">데이터 기반의 <br/>스마트 자산 포트폴리오</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                단순한 낙찰을 넘어, 자산의 미래 가치를 분석합니다. 전주 지역 및 전국의 부동산 빅데이터를 기반으로 
                수익률이 가장 높은 물건을 선별하여 고객 맞춤형 투자 전략을 제시합니다.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="font-bold text-[#002147] mb-2">수익형 투자</div>
                    <p className="text-sm text-slate-500">상가, 오피스텔 등 매월 안정적인 현금흐름 창출 전략</p>
                 </div>
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="font-bold text-[#002147] mb-2">차익형 투자</div>
                    <p className="text-sm text-slate-500">재개발, 재건축, 토지 등 자산 가치 상승 집중 전략</p>
                 </div>
              </div>
            </div>
            <div className="lg:w-1/2">
               <img src="https://images.unsplash.com/photo-1454165833767-131ef24896c3?q=80&w=1000&auto=format&fit=crop" className="rounded-3xl shadow-2xl" alt="Consulting" />
            </div>
          </div>
        </div>
      </section>

      {/* Core Business 3: Interior */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 text-center mb-16">
          <div className="flex items-center justify-center gap-3 text-[#D4AF37] font-bold mb-4">
            <Paintbrush size={24} /> <span>03. 인테리어 사업 (Value-up)</span>
          </div>
          <h2 className="text-3xl font-bold text-[#002147]">낙찰 물건의 가치를 바꾸는 리모델링</h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
            저렴하게 낙찰받는 것만큼 중요한 것은 가치를 높여서 파는 것입니다. <br/>
            입찰파트너의 인테리어 팀은 트렌디한 디자인으로 매물의 상품성을 극대화합니다.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="group cursor-pointer">
              <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
                 <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt="Interior 1" />
                 <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded text-xs font-bold text-[#002147]">주거 공간 리모델링</div>
              </div>
              <h4 className="font-bold text-slate-800">수익형 아파트 밸류업</h4>
              <p className="text-sm text-slate-500 mt-2">임대 수요가 높은 모던 화이트 톤 시공으로 즉각적인 임대 완료</p>
           </div>
           <div className="group cursor-pointer">
              <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
                 <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt="Interior 2" />
                 <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded text-xs font-bold text-[#002147]">상업 공간 기획</div>
              </div>
              <h4 className="font-bold text-slate-800">상가 업종 맞춤 시공</h4>
              <p className="text-sm text-slate-500 mt-2">상권 분석을 기반으로 한 최적의 공간 설계 및 시공</p>
           </div>
           <div className="group cursor-pointer">
              <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
                 <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt="Interior 3" />
                 <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded text-xs font-bold text-[#002147]">사무/오피스 인테리어</div>
              </div>
              <h4 className="font-bold text-slate-800">오피스 밸류 향상</h4>
              <p className="text-sm text-slate-500 mt-2">업무 효율을 극대화하는 공간 재구성 및 매각 가치 상승</p>
           </div>
        </div>
      </section>

      {/* Why Bid Partner? */}
      <section className="py-24 bg-[#002147] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
           <div className="flex flex-col lg:flex-row gap-20 items-center">
              <div className="lg:w-1/2">
                 <h2 className="text-4xl font-bold mb-8 font-serif leading-tight">입찰파트너만의 <br/><span className="text-[#D4AF37]">3가지 약속</span></h2>
                 <div className="space-y-10">
                    <div className="flex gap-6">
                       <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center shrink-0">
                          <ShieldCheck size={32} />
                       </div>
                       <div>
                          <h4 className="text-xl font-bold mb-2">100% 안전 보증 권리분석</h4>
                          <p className="opacity-70 leading-relaxed">자체 분석 프로세스를 통해 인수되는 권리가 발생할 경우 책임지고 보상합니다.</p>
                       </div>
                    </div>
                    <div className="flex gap-6">
                       <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                          <Building size={32} />
                       </div>
                       <div>
                          <h4 className="text-xl font-bold mb-2">원스톱 명도 솔루션</h4>
                          <p className="opacity-70 leading-relaxed">전문 명도 팀이 점유자와의 원만한 협의를 통해 소송 없이 빠른 입주를 지원합니다.</p>
                       </div>
                    </div>
                    <div className="flex gap-6">
                       <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                          <Star size={32} />
                       </div>
                       <div>
                          <h4 className="text-xl font-bold mb-2">사후 가치 증대(Value-up)</h4>
                          <p className="opacity-70 leading-relaxed">인테리어 사업부를 통해 낙찰받은 자산의 시세 가치를 즉각적으로 향상시킵니다.</p>
                       </div>
                    </div>
                 </div>
              </div>
              <div className="lg:w-1/2 relative">
                 <div className="bg-[#D4AF37] w-[500px] h-[500px] absolute -top-10 -right-10 rounded-full blur-[100px] opacity-20"></div>
                 <div className="relative z-10 bg-white/5 border border-white/10 p-12 rounded-3xl backdrop-blur-md">
                    <div className="text-[#D4AF37] font-bold text-sm mb-4 uppercase">Direct Contact</div>
                    <h3 className="text-3xl font-bold mb-6">지금 바로 <br/>전문가와 상의하세요</h3>
                    <p className="opacity-60 mb-8 leading-relaxed">부동산 경매는 속도가 생명입니다. 궁금하신 점을 남겨주시면 전문가 그룹이 직접 답변해 드립니다.</p>
                    <Link to="/consult" className="inline-flex items-center gap-2 bg-[#D4AF37] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#b8962f] transition">
                       무료 상담 신청하기 <ArrowRight size={18} />
                    </Link>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};
