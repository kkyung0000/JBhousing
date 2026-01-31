
import { AuctionItem, Review, Inquiry, Agent, FAQ } from '../types';

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
    description: '강남 중심부 프리미엄 아파트 입지. 명도 난이도 하. 실거주 및 투자 가치 매우 높음.'
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
    description: '한강 조망권 최상위 아파트. 대항력 있는 임차인 존재 확인 필요.'
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
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop',
    phone: '010-2787-3456'
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    author: '김철수님',
    propertyTitle: '잠실 리센츠 33평형',
    content: 'JB 하우징 덕분에 권리분석부터 명도까지 정말 편하게 진행했습니다. 시세보다 2억 저렴하게 낙찰받았네요.',
    rating: 5,
    date: '2024-05-10',
    profitAmount: '2.1억원'
  }
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
