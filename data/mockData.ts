
import { AuctionItem, Review, Inquiry, Agent, FAQ, PointPackage } from '../types';

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
  },
  {
    id: '3',
    caseNumber: '2024타경 5510',
    title: '에코시티 데시앙 7블록',
    location: '전북 전주시 덕진구 송천동2가',
    propertyType: '아파트',
    appraisalValue: 580000000,
    minimumBidPrice: 406000000,
    status: '진행',
    auctionDate: '2024-11-12',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop',
    riskLevel: 'safe',
    description: '전주 에코시티 핵심 입지. 호수공원 인접하여 선호도 매우 높음. 실거주 추천.',
    isOccupiedByOwner: true,
    hasPriorityRight: false,
    expectedRepairCost: 8000000,
    expectedEvictionCost: 3000000
  },
  {
    id: '4',
    caseNumber: '2024타경 1290',
    title: '둔산동 타임월드 인근 상가',
    location: '대전광역시 서구 둔산동',
    propertyType: '상가',
    appraisalValue: 1200000000,
    minimumBidPrice: 840000000,
    status: '유찰',
    auctionDate: '2024-12-01',
    imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=800&auto=format&fit=crop',
    riskLevel: 'caution',
    description: '메인 상권 1층 코너 상가. 임대 수익률 6% 이상 기대 가능. 권리금 산정 필요.',
    isOccupiedByOwner: false,
    hasPriorityRight: true,
    expectedRepairCost: 30000000,
    expectedEvictionCost: 0
  }
];

export const mockFAQs: FAQ[] = [
  {
    id: 'f1',
    category: '입찰/보증금',
    question: '입찰 보증금은 언제까지 입금해야 하나요?',
    answer: '입찰 기일 하루 전(D-1) 오후 8시까지 지정된 대리인의 계좌로 입금 완료되어야 합니다. 입금 확인이 되지 않을 경우 입찰 참여가 제한될 수 있습니다.'
  },
  {
    id: 'f2',
    category: '안전/보험',
    question: '사고 발생 시 보상이 가능한가요?',
    answer: '모든 대리인은 공인중개사법에 따라 기본 2억 원 이상의 공제보험(보증보험)에 가입되어 있습니다. JB 하우징은 엄격한 검증을 거친 전문가만 배정하여 사고를 미연에 방지합니다.'
  },
  {
    id: 'f3',
    category: '공동입찰',
    question: '여러 명이 공동으로 입찰할 수 있나요?',
    answer: '네, 가능합니다. 다만 모든 참여자의 "전자본인서명확인서"를 제출해야 하며, 공동입찰 참여 인원에 따라 추가 이용료가 발생할 수 있습니다.'
  },
  {
    id: 'f4',
    category: '이용문의',
    question: '낙찰에 실패할 경우 보증금은 어떻게 되나요?',
    answer: '패찰 시 입찰 보증금은 법원에서 즉시 반환받아 의뢰인님의 계좌로 안전하게 송금해 드립니다. 반환 절차는 당일 즉시 처리됩니다.'
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
    // 사용자가 제공한 이미지를 바탕으로 안경을 쓴 스마트한 인상의 전문가 사진으로 업데이트
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop',
    phone: '010-2787-3456'
  }
];

export const mockReviews: Review[] = [
  { id: '1', author: '김철수님', propertyTitle: '잠실 리센츠 33평형', content: 'JB 하우징 덕분에 권리분석부터 명도까지 정말 편하게 진행했습니다. 시세보다 2억 저렴하게 낙찰받았네요.', rating: 5, date: '2024-01-12', profitAmount: '2.1억원' },
  { id: '2', author: '이영희님', propertyTitle: '반포 자이 24평형', content: '처음 하는 경매라 두려움이 컸는데, 김종필 대표님의 상세한 설명 덕분에 자신감을 얻었습니다. 추천합니다!', rating: 5, date: '2024-02-15', profitAmount: '1.8억원' },
  { id: '3', author: '박지민님', propertyTitle: '마포 래미안 푸르지오', content: '경쟁이 치열한 곳이었지만 JB 하우징의 낙찰가 분석 시스템으로 단독 낙찰에 성공했습니다. 감사합니다.', rating: 5, date: '2024-03-18', profitAmount: '9,500만원' },
  { id: '4', author: '최도윤님', propertyTitle: '용인 수지 단독주택', content: '복잡한 유치권 문제가 얽힌 물건이었으나 전문가들의 법률 검토로 깨끗하게 해결하고 입주했습니다.', rating: 4, date: '2024-04-20', profitAmount: '1.2억원' },
  { id: '5', author: '한예슬님', propertyTitle: '판교 봇들마을 8단지', content: '수익률 계산기로 미리 시뮬레이션해 본 것이 큰 도움이 되었습니다. 실투자금 대비 수익이 아주 좋네요.', rating: 5, date: '2024-05-22', profitAmount: '3.4억원' },
  { id: '6', author: '정우성님', propertyTitle: '해운대 엘시티', content: '지방 물건이라 걱정했는데 전국망 전문가 연결로 현장 임장 보고서까지 꼼꼼하게 받았습니다. 만족스럽네요.', rating: 5, date: '2025-01-25', profitAmount: '4.5억원' }
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
