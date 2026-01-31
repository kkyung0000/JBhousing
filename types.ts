
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
  isOccupiedByOwner: boolean;
  hasPriorityRight: boolean;
  expectedRepairCost: number;
  expectedEvictionCost: number;
}

export interface PointPackage {
  id: string;
  name: string;
  points: number;
  bonusPoints: number;
  price: number;
  isPopular?: boolean;
  description: string;
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
