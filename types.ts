
export type AuctionStatus = '신건' | '진행' | '낙찰' | '유찰';
export type PropertyType = '아파트' | '빌라' | '상가' | '토지';

export interface AuctionItem {
  id: string;
  caseNumber: string;
  title: string;
  location: string;
  propertyType: PropertyType;
  appraisalValue: number;
  minimumBidPrice: number;
  status: AuctionStatus;
  auctionDate: string;
  imageUrl: string;
  riskLevel: 'safe' | 'caution' | 'danger';
  description: string;
  // 추가된 필드
  isOccupiedByOwner: boolean; // 소유자 점유 여부
  hasPriorityRight: boolean; // 대항력 있는 임차인 유무
  expectedRepairCost: number; // 예상 수리비
  expectedEvictionCost: number; // 예상 명도비
}

export interface FAQ {
  id: string;
  category: '이용문의' | '입찰/보증금' | '공동입찰' | '안전/보험';
  question: string;
  answer: string;
}

export interface Agent {
  id: string;
  name: string;
  region: string;
  specialty: string[];
  experience: string;
  licenseNumber: string;
  imageUrl: string;
  phone: string;
}

export interface Review {
  id: string;
  author: string;
  propertyTitle: string;
  content: string;
  rating: number;
  date: string;
  profitAmount?: string;
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  message: string;
  date: string;
  status: 'pending' | 'completed';
}
