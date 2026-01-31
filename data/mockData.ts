
import { AuctionItem, Review, Inquiry, Agent } from '../types';

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
    imageUrl: 'https://picsum.photos/id/122/800/600',
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
    imageUrl: 'https://picsum.photos/id/107/800/600',
    riskLevel: 'caution',
    description: '한강 조망권 최상위 아파트. 대항력 있는 임차인 존재 확인 필요.'
  },
  {
    id: '3',
    caseNumber: '2024타경 115',
    title: '역삼동 테헤란로 상가 빌딩',
    location: '서울특별시 강남구 역삼동',
    propertyType: '상가',
    appraisalValue: 4500000000,
    minimumBidPrice: 3600000000,
    status: '진행',
    auctionDate: '2024-06-15',
    imageUrl: 'https://picsum.photos/id/183/800/600',
    riskLevel: 'danger',
    description: '테헤란로 초역세권 상가. 유치권 행사 중으로 법리적 분석 필수.'
  },
  {
    id: '4',
    caseNumber: '2023타경 5542',
    title: '분당 정자동 파크뷰 205동',
    location: '경기도 성남시 분당구 정자동',
    propertyType: '아파트',
    appraisalValue: 1800000000,
    minimumBidPrice: 1440000000,
    status: '유찰',
    auctionDate: '2024-06-12',
    imageUrl: 'https://picsum.photos/id/192/800/600',
    riskLevel: 'safe',
    description: '학군 우수 지역. 1회 유찰로 가격 메리트 발생. 입찰 추천.'
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
  },
  {
    id: 'a2',
    name: '이정민',
    region: '서울 서초/강남',
    specialty: ['상가건물', '재개발', '수익률분석'],
    experience: '12년',
    licenseNumber: '제 11650-2021-00124호',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    phone: '010-1234-5678'
  },
  {
    id: 'a3',
    name: '박성훈',
    region: '경기 분당/판교',
    specialty: ['아파트', '학군지투자', '명도대행'],
    experience: '10년',
    licenseNumber: '제 41135-2022-00567호',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop',
    phone: '010-9876-5432'
  },
  {
    id: 'a4',
    name: '최현아',
    region: '전북 군산/익산',
    specialty: ['토지경매', '공장부지', '공매대행'],
    experience: '8년',
    licenseNumber: '제 45130-2024-00022호',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
    phone: '010-5555-4444'
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
  },
  {
    id: '2',
    author: '이영희님',
    propertyTitle: '마포 래미안 푸르지오',
    content: '복잡한 유치권 문제가 있었는데 JB 하우징의 법률 지원으로 깔끔하게 해결되었습니다. 역시 전문가의 손길은 다르네요.',
    rating: 5,
    date: '2024-04-22',
    profitAmount: '1.5억원'
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
