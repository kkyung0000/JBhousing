
import React, { useState } from 'react';
import { pointPackages } from '../data/mockData';
import { PointPackage } from '../types';
import { CreditCard, Zap, CheckCircle2, ChevronRight, Wallet, BadgePercent, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';

export const PointsPurchase: React.FC = () => {
  // 인덱스 1 (300,000P) 패키지를 기본값으로 설정
  const [selectedPackage, setSelectedPackage] = useState<PointPackage | null>(pointPackages[1]);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'kakao' | 'naver'>('card');

  const handlePayment = () => {
    if (!selectedPackage) return;
    const confirmPay = window.confirm(`${selectedPackage.name} (${selectedPackage.price.toLocaleString()}원) 결제를 진행하시겠습니까?`);
    if (confirmPay) {
      alert('결제가 정상적으로 완료되었습니다. 포인트가 즉시 충전됩니다.');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header */}
      <section className="bg-[#002147] py-16 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
          <Sparkles className="w-full h-full text-white/20" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/20 mb-6">
            <Wallet size={14} className="text-[#D4AF37]" /> Wallet & Credits
          </div>
          <h1 className="text-4xl font-bold mb-4 font-serif">JB 포인트 충전</h1>
          <p className="opacity-70 text-lg">포인트를 사용하여 프리미엄 권리분석 리포트와 대리입찰 서비스를 이용하세요.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Package Selection */}
        <div className="lg:col-span-2 space-y-10">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#002147] flex items-center gap-2">
                <BadgePercent className="text-[#D4AF37]" /> 충전 패키지 선택
              </h2>
              <span className="text-xs text-slate-400 font-medium">* 모든 금액은 부가세(VAT) 포함가입니다.</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pointPackages.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg)}
                  className={`relative p-6 rounded-3xl text-left transition-all border-2 flex flex-col justify-between h-48 ${
                    selectedPackage?.id === pkg.id 
                    ? 'bg-white border-[#D4AF37] shadow-xl ring-4 ring-[#D4AF37]/5' 
                    : 'bg-white border-slate-100 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  {pkg.isPopular && (
                    <span className="absolute -top-3 right-6 bg-[#D4AF37] text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-lg shadow-amber-900/20">
                      가장 인기있는 패키지
                    </span>
                  )}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-400 text-xs uppercase tracking-widest">{pkg.name}</span>
                      {selectedPackage?.id === pkg.id && <CheckCircle2 className="text-[#D4AF37]" size={20} />}
                    </div>
                    <div className="text-3xl font-black text-[#002147]">
                      {(pkg.points + pkg.bonusPoints).toLocaleString()} <span className="text-sm font-medium opacity-40">P</span>
                    </div>
                    {pkg.bonusPoints > 0 && (
                      <div className="text-[10px] font-bold text-emerald-500 mt-1 flex items-center gap-1">
                        <Zap size={10} /> {pkg.bonusPoints.toLocaleString()}P 보너스 적립 포함
                      </div>
                    )}
                  </div>
                  <div className="mt-auto pt-4 border-t border-slate-50 flex justify-between items-end">
                    <span className="text-xs text-slate-400 font-medium">{pkg.description}</span>
                    <span className="text-xl font-bold text-[#D4AF37]">{pkg.price.toLocaleString()}원</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold text-[#002147] mb-8 flex items-center gap-2">
              <CreditCard className="text-[#D4AF37]" /> 결제 수단 선택
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { id: 'card', name: '신용/체크카드' },
                { id: 'kakao', name: '카카오페이' },
                { id: 'naver', name: '네이버페이' },
                { id: 'bank', name: '가상계좌' }
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id as any)}
                  className={`py-4 rounded-2xl font-bold text-sm transition-all border ${
                    paymentMethod === method.id 
                    ? 'bg-[#002147] text-white border-[#002147] shadow-lg shadow-blue-900/20' 
                    : 'bg-slate-50 text-slate-500 border-slate-100 hover:bg-slate-100'
                  }`}
                >
                  {method.name}
                </button>
              ))}
            </div>
            <div className="mt-8 p-4 bg-slate-50 rounded-2xl text-[11px] text-slate-400 leading-relaxed">
              결제 완료 후 즉시 포인트가 지급되며, 마이페이지의 포인트 내역에서 확인하실 수 있습니다. 가상계좌의 경우 입금 확인까지 최대 30분이 소요될 수 있습니다.
            </div>
          </div>
        </div>

        {/* Right: Order Summary Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-2xl sticky top-28">
            <h3 className="text-xl font-black text-[#002147] mb-8 pb-4 border-b border-slate-100">결제 상세 정보</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">선택 상품</span>
                <span className="font-bold text-[#002147]">{selectedPackage?.name}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">충전 포인트</span>
                <span className="font-bold">{selectedPackage?.points.toLocaleString()} P</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-emerald-500 font-bold">보너스 포인트</span>
                <span className="font-bold text-emerald-500">+{selectedPackage?.bonusPoints.toLocaleString()} P</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">결제 수단</span>
                <span className="font-bold capitalize">{paymentMethod === 'card' ? '신용카드' : paymentMethod === 'bank' ? '가상계좌' : paymentMethod + '페이'}</span>
              </div>
              <div className="pt-6 border-t border-slate-100 flex justify-between items-end">
                <span className="text-base font-bold text-[#002147]">최종 결제 금액</span>
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 font-bold mb-1">부가세 10% 포함</div>
                  <div className="text-3xl font-black text-[#D4AF37]">{selectedPackage?.price.toLocaleString()}<span className="text-sm font-medium ml-1">원</span></div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button 
                onClick={handlePayment}
                className="w-full bg-[#002147] text-white py-5 rounded-2xl font-black text-lg hover:bg-slate-900 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 group active:scale-95"
              >
                결제하기 <ChevronRight size={20} className="group-hover:translate-x-1 transition" />
              </button>
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[10px] text-slate-400 justify-center">
                  <ShieldCheck size={14} className="text-emerald-500" /> 모든 결제 정보는 암호화되어 보호됩니다.
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 justify-center text-center leading-tight">
                  <AlertCircle size={14} className="text-amber-500 shrink-0" /> 포인트 충전 후 사용 내역이 없는 경우에 한해 <br/> 7일 이내 환불이 가능합니다.
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/20 blur-3xl rounded-full"></div>
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <Zap size={18} className="text-[#D4AF37]" /> 포인트 활용 팁
            </h4>
            <ul className="space-y-4 text-xs opacity-70">
              <li className="flex gap-2">
                <span className="text-[#D4AF37] font-bold">•</span>
                <span>정밀 권리분석 리포트 1회 열람 (5,000 P)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#D4AF37] font-bold">•</span>
                <span>전문가 대리입찰 수수료 (낙찰가에 따라 차등)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#D4AF37] font-bold">•</span>
                <span>전문가 1:1 전화 상담 서비스 (10,000 P~)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
