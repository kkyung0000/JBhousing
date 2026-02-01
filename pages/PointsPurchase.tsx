
import React, { useState } from 'react';
import { pointPackages } from '../data/mockData';
import { PointPackage } from '../types';
import { CreditCard, Zap, CheckCircle2, ChevronRight, Wallet, BadgePercent, ShieldCheck, X, Loader2, Trophy, ArrowRight, Smartphone, Building, ReceiptText, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PointsPurchase: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<PointPackage | null>(pointPackages[1]);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'kakao' | 'naver'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [finalPoints, setFinalPoints] = useState<number>(0);

  const handleStartPayment = () => {
    if (!selectedPackage) return;
    setShowCheckout(true);
  };

  const executePayment = () => {
    if (!selectedPackage) return;
    setShowCheckout(false);
    setIsProcessing(true);
    
    // 결제 프로세스 시뮬레이션 (2.5초)
    setTimeout(() => {
      setIsProcessing(false);
      
      const currentPoints = parseInt(localStorage.getItem('jb_user_points') || '15000', 10);
      const addedPoints = selectedPackage.points + selectedPackage.bonusPoints;
      const newTotal = currentPoints + addedPoints;
      
      localStorage.setItem('jb_user_points', newTotal.toString());
      setFinalPoints(newTotal);
      
      // 헤더 업데이트 알림
      window.dispatchEvent(new Event('jb_points_updated'));
      
      setIsSuccess(true);
    }, 2500);
  };

  if (isSuccess && selectedPackage) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 size={48} />
            </div>
            <div className="absolute -top-2 -right-2 bg-amber-400 text-white p-2 rounded-full animate-bounce">
              <Trophy size={16} />
            </div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-[#002147]">결제가 완료되었습니다!</h2>
            <p className="text-slate-400 font-medium">포인트가 즉시 충전되었습니다.</p>
          </div>

          <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 text-left space-y-4 shadow-inner">
             <div className="flex justify-between items-center text-sm border-b border-slate-200 pb-4 mb-4">
                <span className="text-slate-400 font-bold uppercase tracking-widest">Order Receipt</span>
                <span className="text-[#002147] font-mono font-bold">#{Math.random().toString(36).substring(7).toUpperCase()}</span>
             </div>
             <div className="flex justify-between items-center">
                <span className="text-slate-500">충전 패키지</span>
                <span className="font-bold text-[#002147]">{selectedPackage.name}</span>
             </div>
             <div className="flex justify-between items-center">
                <span className="text-slate-500">기본 포인트</span>
                <span className="font-bold">{selectedPackage.points.toLocaleString()} P</span>
             </div>
             <div className="flex justify-between items-center text-emerald-600">
                <span className="font-bold">보너스 리워드</span>
                <span className="font-bold">+{selectedPackage.bonusPoints.toLocaleString()} P</span>
             </div>
             <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                <span className="font-black text-[#002147]">최종 보유 포인트</span>
                <span className="text-2xl font-black text-[#D4AF37]">{finalPoints.toLocaleString()} P</span>
             </div>
          </div>

          <div className="flex flex-col gap-3">
             <Link to="/ai-analysis" className="bg-[#002147] text-white py-5 rounded-2xl font-black text-lg hover:bg-slate-900 transition flex items-center justify-center gap-2 shadow-xl shadow-blue-900/20">
                AI 권리분석 바로가기 <ArrowRight size={20} />
             </Link>
             <Link to="/" className="text-slate-400 font-bold hover:text-[#002147] transition">홈으로 돌아가기</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-32">
      {/* Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 z-[100] bg-[#002147]/90 backdrop-blur-md flex flex-col items-center justify-center text-white text-center p-6">
          <div className="relative mb-8">
            <Loader2 size={64} className="animate-spin text-[#D4AF37]" />
            <ShieldCheck size={24} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" />
          </div>
          <h3 className="text-2xl font-black mb-2">보안 결제 진행 중</h3>
          <p className="opacity-60 font-medium">카드사 및 은행의 승인을 기다리고 있습니다.<br/>잠시만 기다려 주세요.</p>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#002147]/60 backdrop-blur-sm" onClick={() => setShowCheckout(false)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 duration-500">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
               <h3 className="text-xl font-black text-[#002147]">최종 결제 확인</h3>
               <button onClick={() => setShowCheckout(false)} className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-rose-50 hover:text-rose-500 transition"><X size={20}/></button>
            </div>
            <div className="p-8 space-y-6">
               <div className="bg-slate-50 p-6 rounded-2xl space-y-4 border border-slate-100">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm font-bold">주문 상품</span>
                    <span className="font-bold text-[#002147]">{selectedPackage?.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm font-bold">충전 포인트</span>
                    <span className="font-black text-emerald-600">{(selectedPackage!.points + selectedPackage!.bonusPoints).toLocaleString()} P</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm font-bold">결제 수단</span>
                    <span className="font-bold text-[#002147] uppercase">{paymentMethod}</span>
                  </div>
               </div>
               
               <div className="flex justify-between items-end p-2">
                  <span className="font-black text-[#002147] text-lg">최종 결제 금액</span>
                  <span className="text-4xl font-black text-[#D4AF37]">{selectedPackage?.price.toLocaleString()}<span className="text-xl font-medium ml-1">원</span></span>
               </div>

               <button 
                  onClick={executePayment}
                  className="w-full bg-[#002147] text-white py-6 rounded-2xl font-black text-xl hover:bg-slate-900 transition-all flex items-center justify-center gap-2 shadow-2xl shadow-blue-900/10 active:scale-95"
               >
                  결제 승인하기 <ShieldCheck size={24} />
               </button>
               <p className="text-center text-[11px] text-slate-400 font-medium">결제 버튼을 누르시면 이용약관 및 개인정보 처리방침에 동의한 것으로 간주됩니다.</p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-[#002147] pt-24 pb-48 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37] blur-[180px] opacity-10 rounded-full"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-8 border border-white/20">
            <Wallet size={16} className="text-[#D4AF37]" /> JB Digital Wallet
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-8 font-serif leading-tight">포인트 충전소</h1>
          <p className="opacity-60 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            충전된 포인트로 AI 정밀 리포트를 열람하고 <br className="hidden md:block"/> 전문가의 입찰 대행 서비스를 즉시 이용해 보세요.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 -mt-32 grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-20">
        <div className="lg:col-span-2 space-y-12">
          <div className="bg-white/80 backdrop-blur-2xl rounded-[3.5rem] p-10 shadow-2xl border border-white/50">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-black text-[#002147] flex items-center gap-3">
                <BadgePercent className="text-[#D4AF37]" size={28} /> 충전 패키지 선택
              </h2>
              <div className="text-[10px] bg-slate-100 text-slate-400 px-3 py-1.5 rounded-full font-black uppercase tracking-widest">Select Package</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pointPackages.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg)}
                  className={`relative p-8 rounded-[2.5rem] text-left transition-all border-2 flex flex-col justify-between group overflow-hidden ${
                    selectedPackage?.id === pkg.id 
                    ? 'bg-white border-[#D4AF37] shadow-2xl ring-8 ring-[#D4AF37]/5' 
                    : 'bg-slate-50/50 border-transparent hover:border-slate-200 hover:bg-white'
                  }`}
                >
                  {pkg.isPopular && (
                    <div className="absolute top-0 right-0 bg-[#D4AF37] text-[#002147] px-6 py-2 rounded-bl-3xl text-[10px] font-black uppercase tracking-widest shadow-lg">
                      Best Choice
                    </div>
                  )}
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-[11px] font-black uppercase tracking-widest ${selectedPackage?.id === pkg.id ? 'text-[#D4AF37]' : 'text-slate-400'}`}>
                        {pkg.name}
                      </span>
                      {selectedPackage?.id === pkg.id && <CheckCircle2 className="text-[#D4AF37] animate-in zoom-in" size={24} />}
                    </div>
                    
                    <div className="flex items-baseline gap-1">
                      <div className="text-4xl font-black text-[#002147]">
                        {(pkg.points + pkg.bonusPoints).toLocaleString()}
                      </div>
                      <span className="text-sm font-black text-slate-300">P</span>
                    </div>

                    {pkg.bonusPoints > 0 && (
                      <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full text-[11px] font-black mt-3 border border-emerald-100">
                        <Zap size={12} fill="currentColor" /> +{pkg.bonusPoints.toLocaleString()}P FREE
                      </div>
                    )}
                  </div>

                  <div className="mt-10 flex justify-between items-center relative z-10">
                    <div className="text-xs text-slate-400 font-bold group-hover:text-slate-600 transition">{pkg.description}</div>
                    <div className="text-2xl font-black text-[#002147]">{pkg.price.toLocaleString()}원</div>
                  </div>

                  <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full transition-all duration-500 opacity-5 ${selectedPackage?.id === pkg.id ? 'bg-[#D4AF37] scale-150' : 'bg-slate-200'}`}></div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-2xl rounded-[3.5rem] p-10 shadow-2xl border border-white/50">
            <h2 className="text-2xl font-black text-[#002147] mb-10 flex items-center gap-3">
              <CreditCard className="text-[#D4AF37]" size={28} /> 결제 수단 선택
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { id: 'card', name: '신용/체크카드', icon: <CreditCard size={18}/> },
                { id: 'kakao', name: '카카오페이', icon: <Smartphone size={18}/>, color: 'hover:border-[#FEE500] hover:bg-[#FEE500]/5' },
                { id: 'naver', name: '네이버페이', icon: <Smartphone size={18}/>, color: 'hover:border-[#03C75A] hover:bg-[#03C75A]/5' },
                { id: 'bank', name: '무통장입금', icon: <Building size={18}/> }
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id as any)}
                  className={`flex flex-col items-center justify-center gap-3 p-6 rounded-3xl font-black text-sm transition-all border-2 ${
                    paymentMethod === method.id 
                    ? 'bg-[#002147] text-white border-[#002147] shadow-xl shadow-blue-900/10' 
                    : `bg-slate-50/50 text-slate-400 border-transparent ${method.color || 'hover:border-slate-200'}`
                  }`}
                >
                  {method.icon}
                  {method.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="sticky top-28 space-y-6">
            <div className="bg-white rounded-[3.5rem] p-10 border border-slate-100 shadow-2xl">
              <div className="flex items-center gap-3 mb-10 pb-6 border-b border-slate-50">
                 <ReceiptText className="text-[#D4AF37]" size={24} />
                 <h3 className="text-xl font-black text-[#002147]">결제 요약</h3>
              </div>
              
              <div className="space-y-6 mb-10">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-bold text-sm">선택한 패키지</span>
                  <span className="font-black text-[#002147]">{selectedPackage?.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-bold text-sm">기본 적립</span>
                  <span className="font-black">{selectedPackage?.points.toLocaleString()} P</span>
                </div>
                <div className="flex justify-between items-center text-emerald-500">
                  <span className="font-black text-sm">보너스 혜택</span>
                  <span className="font-black">+{selectedPackage?.bonusPoints.toLocaleString()} P</span>
                </div>
                
                <div className="pt-8 border-t border-slate-100">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-lg font-black text-[#002147]">결제 예정 금액</span>
                    <div className="text-[10px] text-slate-400 font-bold mb-1">부가세 포함</div>
                  </div>
                  <div className="text-5xl font-black text-[#D4AF37] text-right">
                    {selectedPackage?.price.toLocaleString()}<span className="text-xl font-medium ml-1">원</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={handleStartPayment}
                  className="w-full bg-[#002147] text-white py-6 rounded-[2rem] font-black text-xl hover:bg-slate-900 transition-all shadow-2xl shadow-blue-900/10 flex items-center justify-center gap-3 active:scale-95 group"
                >
                  결제 서비스 연결 <ChevronRight size={24} className="group-hover:translate-x-1 transition" />
                </button>
              </div>
            </div>

            <div className="bg-[#002147] rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/20 blur-3xl rounded-full group-hover:scale-150 transition-all duration-700"></div>
              <h4 className="font-black text-lg mb-6 flex items-center gap-2 relative z-10">
                <Sparkles size={20} className="text-[#D4AF37]" /> 포인트 멤버십 혜택
              </h4>
              <ul className="space-y-5 relative z-10">
                <li className="flex gap-4">
                  <div className="w-6 h-6 bg-white/10 rounded-lg flex items-center justify-center shrink-0"><Zap size={14} className="text-[#D4AF37]" /></div>
                  <p className="text-xs opacity-70 leading-relaxed font-medium">프리미엄 AI 리포트 분석 비용 <br/> <strong className="text-white">최대 30% 절감 효과</strong></p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
