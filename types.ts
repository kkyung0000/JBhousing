
export type AuctionStatus = '신건' | '진행' | '낙찰' | '유찰';
export type PropertyType = '아파트' | '빌라' | '상가' | '토지';

export interface AuctionItem {
  id: string;
  caseNumber: string; // 사건번호
  title: string;
  location: string;
  propertyType: PropertyType;
  appraisalValue: number; // 감정가
  minimumBidPrice: number; // 최저매각가격
  status: AuctionStatus;
  auctionDate: string;
  imageUrl: string;
  riskLevel: 'safe' | 'caution' | 'danger';
  description: string;
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
