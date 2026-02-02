
import { AuctionItem, Review, Inquiry, Agent, FAQ, PointPackage, BiddingRequest } from '../types';

export const mockAiSampleReport = `
# [AI 정밀 권리분석 리포트] 2024타경 10245
## 서초동 아크로비스타 101동 15xx호

---

### 1. 사건 개요 및 물건 현황
- **사건번호**: 2024타경 10245
- **물건종류**: 아파트 (전용 84.98㎡)
- **감정가**: 2,450,000,000원
- **최저가**: 1,960,000,000원 (80%)
- **분석시점**: 2025년 2월 14일

### 2. 등기부등본상 권리 관계 분석
- **말소기준권리**: 2018-05-21 근저당권 (신한은행, 채권최고액 12억 원)
- **권리 분석 결과**: 
  - 본 물건의 말소기준권리는 2018년 5월 21일 설정된 신한은행의 근저당권입니다.
  - 이후 설정된 모든 가압류(2건), 근저당(1건) 및 가등기(1건)는 매각으로 인해 **모두 소멸**되는 것으로 판단됩니다.
  - 등기부상 매수인이 추가로 인수해야 할 금전적 채무나 권리는 발견되지 않은 **[우수]** 등급 물건입니다.

### 3. 임차인 대항력 및 배당 관계 예측
- **점유 현황**: 소유주 가족 직접 점유 중 (전입세대 확인서 기준)
- **대항력 분석**: 
  - 현재 대항력을 갖춘 임차인은 존재하지 않습니다. 
  - 소유주 점유 물건은 인도명령 대상자로, 명도 난이도가 상대적으로 매우 낮습니다.
- **예상 배당**: 모든 경매 비용 및 1순위 근저당권이 우선 배당되며, 후순위 채권자들에게는 일부 배당이 돌아가지 않을 수 있으나 매수인과는 무관합니다.

### 4. 예상 낙찰가 및 투자 가이드라인
- **인근 실거래 시세**: 최근 6개월 평균 23.8억 원
- **낙찰가율 시뮬레이션**: 
  - 강남구 평균 낙찰가율(92%) 적용 시: 약 22.5억 원
  - 보수적 입찰 시: 21.8억 원 내외
- **투자 소견**: 시세 대비 약 15~20% 저렴한 구간에서 낙찰 가능성이 높으며, 서초동 입지 특성상 환금성이 매우 뛰어난 물건입니다.

### 5. 종합 투자 위험도 평가
- **최종 등급**: 🟢 **SAFE (안전)**
- **결론**: 본 물건은 등기부 및 점유 관계에서 치명적인 리스크가 발견되지 않았습니다. 실거주 및 투자 목적 모두에 적합하며, 입찰 전 현장 미납 관리비 여부만 최종 확인하시면 됩니다.

---
*본 리포트는 입찰파트너 AI 엔진이 생성한 참고용 분석입니다. 실제 입찰 시에는 전문가의 현장 조사를 포함한 정밀 컨설팅을 반드시 병행하시기 바랍니다.*
`;

export const mockBiddingRequests: BiddingRequest[] = [
  {
    id: 'bid-001',
    customerId: 'user-123',
    customerName: '홍길동',
    caseNumber: '2024타경 10245',
    propertyTitle: '서초동 아크로비스타 101동',
    status: 'REVIEWING',
    submittedAt: '2025-02-14 10:30',
    documents: [
      { type: 'id_card', status: 'uploaded' },
      { type: 'seal_certificate', status: 'uploaded' },
      { type: 'power_of_attorney', status: 'missing' }
    ]
  },
  {
    id: 'bid-002',
    customerId: 'user-456',
    customerName: '김성실',
    caseNumber: '2024타경 8820',
    propertyTitle: '성수동 트리마제 102동',
    status: 'VERIFIED',
    submittedAt: '2025-02-13 14:20',
    documents: [
      { type: 'id_card', status: 'uploaded' },
      { type: 'seal_certificate', status: 'uploaded' },
      { type: 'power_of_attorney', status: 'uploaded' }
    ],
    aiReportContent: '권리분석 결과 깨끗한 물건으로 판명되었습니다. 낙찰 후 명도 절차 역시 소유주 직접 점유로 난이도가 낮을 것으로 예상됩니다.',
    agentNotes: '서류 일체 확인 완료. 보증금 입금 확인됨.'
  }
];

export const pointPackages: PointPackage[] = [
  {
    id: 'p1',
    name: 'Basic',
    points: 300000,
    bonusPoints: 0,
    price: 330000,
    description: '개별 물건 30회 분석 및 기초 컨설팅 패키지'
  },
  {
    id: 'p2',
    name: 'Essential',
    points: 500000,
    bonusPoints: 25000,
    price: 550000,
    description: '집중적인 권리 분석과 실시간 상담이 필요한 투자자'
  },
  {
    id: 'p3',
    name: 'Pro Investor',
    points: 1000000,
    bonusPoints: 100000,
    price: 1100000,
    isPopular: true,
    description: '가장 많은 회원이 선택하는 핵심 투자 패키지 (10% 보너스)'
  },
  {
    id: 'p4',
    name: 'Expert',
    points: 2000000,
    bonusPoints: 300000,
    price: 2200000,
    description: '연간 다수 입찰 및 전용 에이전트 관리가 필요한 전문가'
  },
  {
    id: 'p5',
    name: 'VIP Master',
    points: 3000000,
    bonusPoints: 600000,
    price: 3300000,
    description: '법인 및 대규모 자산가 전용 최상위 리워드 패키지 (20% 보너스)'
  }
];

export const mockAuctions: AuctionItem[] = [
  {
    id: '1',
    caseNumber: '2023타경 10245',
    title: '서초동 아크로비스타 101동',
    location: '서울특별시 서초구 서초동',
    propertyType: '아파트',
    appraisalValue: 2450000000,
    minimumBidPrice: 1960000000,
    status: '진행',
    auctionDate: '2024-06-20',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop',
    riskLevel: 'safe',
    description: '강남 중심부 프리미엄 아파트 입지. 명도 난이도 하. 실거주 및 투자 가치 매우 높음.',
    isOccupiedByOwner: true,
    hasPriorityRight: false,
    expectedRepairCost: 15000000,
    expectedEvictionCost: 5000000
  },
  {
    id: '2',
    caseNumber: '2023타경 8820',
    title: '성수동 트리마제 102동',
    location: '서울특별시 성동구 성수동1가',
    propertyType: '아파트',
    appraisalValue: 3200000000,
    minimumBidPrice: 3200000000,
    status: '신건',
    auctionDate: '2024-07-05',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop',
    riskLevel: 'caution',
    description: '한강 조망권 최상위 아파트. 대항력 있는 임차인 존재 확인 필요.',
    isOccupiedByOwner: false,
    hasPriorityRight: true,
    expectedRepairCost: 20000000,
    expectedEvictionCost: 10000000
  }
];

export const mockFAQs: FAQ[] = [
  {
    id: 'f1',
    category: '입찰/보증금',
    question: '입찰 보증금은 언제까지 입금해야 하나요?',
    answer: '입찰 기일 하루 전(D-1) 오후 8시까지 지정된 대리인의 계좌로 입금 완료되어야 합니다. 입금 확인이 되지 않을 경우 입찰 참여가 제한될 수 있습니다.'
  }
];

export const mockAgents: Agent[] = [
  {
    id: 'a1',
    name: '김종필',
    region: '전북 전주/완산',
    specialty: ['법원경매', '권리분석', '인테리어'],
    experience: '15년',
    licenseNumber: '제 45111-2023-00001호',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop',
    phone: '010-2787-3456'
  }
];

export const mockReviews: Review[] = [
  { id: '1', author: '김철수님', propertyTitle: '잠실 리센츠 33평형', content: '입찰파트너 덕분에 권리분석부터 명도까지 정말 편하게 진행했습니다. 시세보다 2억 저렴하게 낙찰받았네요.', rating: 5, date: '2024-01-12', profitAmount: '2.1억원' }
];

export const mockInquiries: Inquiry[] = [
  {
    id: '1',
    name: '홍길동',
    phone: '010-1234-5678',
    message: '서초동 아크로비스타 건에 대해 상담받고 싶습니다.',
    date: '2024-06-01',
    status: 'pending'
  }
];
