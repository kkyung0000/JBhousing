
import React, { useState, useEffect } from 'react';
import { pointPackages } from '../data/mockData';
import { PointPackage, User } from '../types';
import { CreditCard, Zap, CheckCircle2, Wallet, BadgePercent, ShieldCheck, X, Loader2, Trophy, ArrowRight, Smartphone, Building, ReceiptText, Sparkles, TrendingUp, Info, HelpCircle, AlertTriangle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { dbService } from '../services/db';

export const PointsPurchase: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(dbService.getCurrentUser());
  const [selectedPackage, setSelectedPackage] = useState<PointPackage | null>(pointPackages[2]); // Pro 1M 기본 선택
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      setCurrentUser(dbService.getCurrentUser());
    };
    window.addEventListener('jb_points_updated', handleUpdate);
    return () => window.removeEventListener('jb_points_updated', handleUpdate);
  }, []);

  const handleChargeRequest = () => {
    if (!currentUser) {
      if (confirm('포인트 충전은 로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?')) {
        navigate('/login');
      }
      return;
    }
    setShowCheckout(true);
  };

  const executePayment = async () => {
    if (!selectedPackage || !currentUser) return;
    
    setShowCheckout(false);
    setIsProcessing(true);
    
    // 결제 승인 시뮬레이션
    setTimeout(async () => {
      const addedPoints = selectedPackage.points + selectedPackage.bonusPoints;
      await dbService.addPoints(currentUser.id, addedPoints);
      
      setIsProcessing(false);
      setIsSuccess(true);
      setCurrentUser(dbService.getCurrentUser());
    }, 2500);
  };

  if (isSuccess && selectedPackage && currentUser) {
    const updatedUser = dbService.getCurrentUser();
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 size={48} />
            </div>
            <div className="absolute -top-2 -right-2 bg-[#C5A059] text-white p-2 rounded-full animate-bounce">
              <Trophy size={16} />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-[#001A3D]">충전이 완료되었습니다!</h2>
            <p className="text-slate-400 font-medium">{currentUser.name}님의 계정으로 자산이 안전하게 지급되었습니다.</p>
          </div>
          <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 text-left space-y-4 shadow-inner">
             <div className="flex justify-between items-center text-sm font-bold text-slate-500">
               <span>충전 상품</span>
               <span>{selectedPackage.name}</span>
             </div>
             <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                <span className="font-black text-[#001A3D]">현재 총 보유 포인트</span>
                <span className="text-2xl font-black text-[#C5A059]">{(updatedUser?.points || 0).toLocaleString()} P</span>
             </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/ai-analysis" className="bg-[#001A3D] text-white py-5 rounded-2xl font-black text-sm shadow-xl flex items-center justify-center gap-2">
              AI 분석 이용하기 <Zap size={16} />
            </Link>
            <Link to="/" className="bg-slate-100 text-[#001A3D] py-5 rounded-2xl font-black text-sm hover:bg-slate-200 transition">
              홈으로 이동
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F4F7FA] min-h-screen pb-32">
      {isProcessing && (
        <div className="fixed inset-0 z-[100] bg-[#001A3D]/95 backdrop-blur-md flex flex-col items-center justify-center text-white text-center p-6">
          <div className="relative mb-8">
            <Loader2 size={80} className="animate-spin text-[#C5A059]" />
            <ShieldCheck size={32} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" />
          </div>
          <h3 className="text-2xl font-black mb-2">보안 결제 승인 중</h3>
          <p className="opacity-50 font-medium">금융사와의 안전한 통신을 위해 잠시만 기다려주세요.</p>
        </div>
      )}

      {showCheckout && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#001A3D]/60 backdrop-blur-sm" onClick={() => setShowCheckout(false)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-[3rem] shadow-2xl p-8 md:p-10 animate-in zoom-in duration-300">
             <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black text-[#001A3D]">최종 결제 확인</h3>
                <button onClick={() => setShowCheckout(false)} className="text-slate-300 hover:text-slate-900"><X size={24} /></button>
             </div>
             <div className="bg-slate-50 p-8 rounded-3xl mb-8 space-y-4 border border-slate-100">
                <div className="flex justify-between font-bold text-slate-500"><span>선택 패키지</span> <span className="text-[#001A3D]">{selectedPackage?.name}</span></div>
                <div className="flex justify-between items-end">
                   <span className="text-sm font-bold text-slate-500">지급 포인트</span> 
                   <span className="text-2xl font-black text-[#C5A059]">{(selectedPackage!.points + selectedPackage!.bonusPoints).toLocaleString()} P</span>
                </div>
                <div className="h-[1px] bg-slate-200 my-2"></div>
                <div className="flex justify-between items-center">
                   <span className="font-black text-[#001A3D]">최종 결제 금액</span>
                   <span className="text-xl font-black text-[#001A3D]">{selectedPackage?.price.toLocaleString()}원</span>
                </div>
             </div>
             <button onClick={executePayment} className="w-full bg-[#001A3D] text-white py-6 rounded-2xl font-black text-xl shadow-2xl shadow-blue-900/20 active:scale-95 transition">안전 결제 승인</button>
          </div>
        </div>
      )}

      <section className="bg-[#001A3D] pt-32 pb-60 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#C5A059] blur-[250px] opacity-10 rounded-full -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#F4F7FA] to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-8 border border-white/20 backdrop-blur-md">
             <Wallet size={14} className="text-[#C5A059]" /> Integrated Asset Management
          </div>
          <h1 className="text-4xl md:text-7xl font-black mb-8 font-serif leading-tight tracking-tighter">포인트 서비스 안내</h1>
          <p className="opacity-60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            AI 정밀 분석과 전문가 컨설팅을 위한 통합 자산 시스템. <br className="hidden md:block"/>
            고객님의 성공적인 입찰을 위해 <span className="text-[#C5A059] font-black">압도적인 리워드</span>를 제안합니다.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 -mt-40 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-3 space-y-16">
            {/* 포인트 패키지 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {pointPackages.map((pkg) => (
                <button 
                  key={pkg.id} 
                  onClick={() => setSelectedPackage(pkg)} 
                  className={`group relative p-6 sm:p-8 md:p-10 rounded-[3rem] border-2 text-left transition-all duration-500 bg-white shadow-xl ${
                    selectedPackage?.id === pkg.id 
                    ? 'border-[#C5A059] ring-8 ring-[#C5A059]/5 -translate-y-4 shadow-2xl shadow-amber-900/10' 
                    : 'border-white hover:border-slate-200 hover:-translate-y-2'
                  }`}
                >
                  {pkg.isPopular && (
                    <div className="absolute top-0 right-0 bg-[#C5A059] text-[#001A3D] px-5 py-1.5 rounded-bl-2xl text-[10px] font-black uppercase tracking-widest z-10">Recommended</div>
                  )}
                  
                  <div className={`text-[10px] font-black uppercase tracking-[0.2em] mb-4 ${selectedPackage?.id === pkg.id ? 'text-[#C5A059]' : 'text-slate-400'}`}>
                    {pkg.name} Package
                  </div>
                  
                  {/* 포인트 금액 레이아웃 최종 수정: shrink-0와 min-width 확보로 'P'자가 절대 잘리지 않도록 함 */}
                  <div className="mb-3 flex items-baseline gap-1 font-serif w-full overflow-hidden">
                    <span className="text-2xl sm:text-3xl lg:text-[2rem] xl:text-[2.25rem] font-black text-[#001A3D] whitespace-nowrap leading-tight shrink truncate">
                      {pkg.points.toLocaleString()}
                    </span>
                    <span className="text-lg sm:text-xl font-black font-sans text-[#C5A059] shrink-0 ml-0.5">P</span>
                  </div>
                  
                  {pkg.bonusPoints > 0 ? (
                    <div className="text-emerald-500 text-[11px] sm:text-[12px] font-black flex items-center gap-1.5 mb-8 sm:mb-10 bg-emerald-50 w-fit px-3 py-1 rounded-full border border-emerald-100/50">
                      <Sparkles size={12} className="shrink-0" /> + {pkg.bonusPoints.toLocaleString()}P Bonus
                    </div>
                  ) : (
                    <div className="h-10 mb-10"></div>
                  )}
                  
                  <div className="mt-4 flex justify-between items-center pt-8 border-t border-slate-50">
                     <div className="text-lg sm:text-xl xl:text-2xl font-black text-[#001A3D]">{pkg.price.toLocaleString()}<span className="text-sm font-bold text-slate-400 ml-1">원</span></div>
                     <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all shadow-sm shrink-0 ${selectedPackage?.id === pkg.id ? 'bg-[#001A3D] text-white' : 'bg-slate-50 text-slate-200'}`}>
                        <CheckCircle2 size={20} />
                     </div>
                  </div>
                </button>
              ))}
            </div>

            {/* 가이드 섹션 */}
            <div className="bg-white rounded-[3.5rem] p-10 md:p-20 shadow-xl border border-white space-y-24">
               <div>
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                     <div>
                        <h4 className="text-[11px] font-black text-[#C5A059] uppercase tracking-[0.4em] mb-4">Service Costs</h4>
                        <h3 className="text-3xl font-black text-[#001A3D] font-serif flex items-center gap-3">
                           <HelpCircle className="text-[#C5A059]" /> 포인트 사용 가이드
                        </h3>
                     </div>
                     <p className="text-slate-400 font-medium text-sm">모든 서비스는 차감 방식으로 즉시 이용 가능합니다.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 group hover:bg-white hover:shadow-2xl hover:border-[#C5A059]/20 transition-all duration-500">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#001A3D] shadow-sm mb-6 group-hover:scale-110 transition-transform"><Zap size={28}/></div>
                        <div className="font-black text-[#001A3D] text-lg mb-2">AI 정밀 권리분석</div>
                        <p className="text-[13px] text-slate-400 font-medium leading-relaxed mb-6">전국 법원 등기부 및 실거래가 기반 하이퍼 리포트 실시간 생성</p>
                        <div className="text-xl font-black text-[#C5A059]">10,000 P <span className="text-xs text-slate-300 font-bold ml-1">/ 건당</span></div>
                     </div>
                     <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 group hover:bg-white hover:shadow-2xl hover:border-[#C5A059]/20 transition-all duration-500">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#001A3D] shadow-sm mb-6 group-hover:scale-110 transition-transform"><Building size={28}/></div>
                        <div className="font-black text-[#001A3D] text-lg mb-2">전문가 1:1 상담</div>
                        <p className="text-[13px] text-slate-400 font-medium leading-relaxed mb-6">지역 수석 에이전트 및 전문 분석가와의 심층 비대면 컨설팅</p>
                        <div className="text-xl font-black text-[#C5A059]">50,000 P <span className="text-xs text-slate-300 font-bold ml-1">/ 30분</span></div>
                     </div>
                     <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 group hover:bg-white hover:shadow-2xl hover:border-[#C5A059]/20 transition-all duration-500">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#001A3D] shadow-sm mb-6 group-hover:scale-110 transition-transform"><ReceiptText size={28}/></div>
                        <div className="font-black text-[#001A3D] text-lg mb-2">전략 분석 보고서</div>
                        <p className="text-[13px] text-slate-400 font-medium leading-relaxed mb-6">지역 데이터 기반 예상 낙찰가 및 입찰 경쟁률 심층 리포트</p>
                        <div className="text-xl font-black text-[#C5A059]">100,000 P <span className="text-xs text-slate-300 font-bold ml-1">/ 회당</span></div>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-[3.5rem] p-10 shadow-2xl border border-white sticky top-28 overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/5 blur-3xl rounded-full"></div>
               
               <div className="flex items-center gap-3 mb-12 relative z-10">
                  <ReceiptText className="text-[#C5A059]" size={24} />
                  <h3 className="text-xl font-black text-[#001A3D]">주문 요약</h3>
               </div>
               
               <div className="space-y-6 mb-12 relative z-10">
                  <div className="flex justify-between items-center">
                    <span className="text-[13px] font-bold text-slate-400">선택한 패키지</span>
                    <span className="font-black text-[#001A3D]">{selectedPackage?.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[13px] font-bold text-slate-400">지급 예정 포인트</span>
                    <span className="font-black text-2xl text-[#C5A059]">{(selectedPackage!.points + selectedPackage!.bonusPoints).toLocaleString()} P</span>
                  </div>
                  <div className="h-[1px] bg-slate-50"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-black text-[#001A3D]">{selectedPackage?.price.toLocaleString()}원</span>
                  </div>
               </div>

               <button 
                 onClick={handleChargeRequest} 
                 className="w-full bg-[#001A3D] text-white py-6 rounded-2xl font-black text-xl shadow-2xl shadow-blue-900/20 hover:bg-slate-900 transition flex items-center justify-center gap-3 group relative z-10"
               >
                 안전 결제하기 <ArrowRight className="group-hover:translate-x-1 transition" size={20} />
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
