
import { AuctionItem, Review, Inquiry, Agent, FAQ, PointPackage, BiddingRequest } from '../types';

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
    name: 'Starter 패키지',
    points: 200000,
    bonusPoints: 0,
    price: 220000,
    description: '기본 권리분석 및 상담 입문용'
  },
  {
    id: 'p2',
    name: 'Basic 패키지',
    points: 300000,
    bonusPoints: 15000,
    price: 330000,
    isPopular: true,
    description: '가장 많은 고객님이 선택하는 표준 패키지'
  },
  {
    id: 'p3',
    name: 'Pro 패키지',
    points: 1000000,
    bonusPoints: 100000,
    price: 1100000,
    description: '전문 투자자를 위한 고효율 적립 패키지'
  },
  {
    id: 'p4',
    name: 'VIP 패키지',
    points: 2000000,
    bonusPoints: 300000,
    price: 2200000,
    description: '대규모 자산 운용 및 연간 컨설팅용'
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
  { id: '1', author: '김철수님', propertyTitle: '잠실 리센츠 33평형', content: 'JB 하우징 덕분에 권리분석부터 명도까지 정말 편하게 진행했습니다. 시세보다 2억 저렴하게 낙찰받았네요.', rating: 5, date: '2024-01-12', profitAmount: '2.1억원' }
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
