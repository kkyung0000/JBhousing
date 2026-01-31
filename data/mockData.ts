
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
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop',
    phone: '010-2787-3456'
  }
];

export const mockReviews: Review[] = [
  { id: '1', author: '김철수님', propertyTitle: '잠실 리센츠 33평형', content: 'JB 하우징 덕분에 권리분석부터 명도까지 정말 편하게 진행했습니다. 시세보다 2억 저렴하게 낙찰받았네요.', rating: 5, date: '2024-01-12', profitAmount: '2.1억원' },
  { id: '2', author: '이영희님', propertyTitle: '반포 자이 24평형', content: '처음 하는 경매라 두려움이 컸는데, 김종필 대표님의 상세한 설명 덕분에 자신감을 얻었습니다. 추천합니다!', rating: 5, date: '2024-02-15', profitAmount: '1.8억원' },
  { id: '3', author: '박지민님', propertyTitle: '마포 래미안 푸르지오', content: '경쟁이 치열한 곳이었지만 JB 하우징의 낙찰가 분석 시스템으로 단독 낙찰에 성공했습니다. 감사합니다.', rating: 5, date: '2024-03-18', profitAmount: '9,500만원' },
  { id: '4', author: '최도윤님', propertyTitle: '용인 수지 단독주택', content: '복잡한 유치권 문제가 얽힌 물건이었으나 전문가들의 법률 검토로 깨끗하게 해결하고 입주했습니다.', rating: 4, date: '2024-04-20', profitAmount: '1.2억원' },
  { id: '5', author: '한예슬님', propertyTitle: '판교 봇들마을 8단지', content: '수익률 계산기로 미리 시뮬레이션해 본 것이 큰 도움이 되었습니다. 실투자금 대비 수익이 아주 좋네요.', rating: 5, date: '2024-05-22', profitAmount: '3.4억원' },
  { id: '6', author: '정우성님', propertyTitle: '해운대 엘시티', content: '지방 물건이라 걱정했는데 전국망 전문가 연결로 현장 임장 보고서까지 꼼꼼하게 받았습니다. 만족스럽네요.', rating: 5, date: '2024-06-25', profitAmount: '4.5억원' },
  { id: '7', author: '윤아름님', propertyTitle: '광교 중흥S클래스', content: '낙찰 이후 인테리어 팀과의 협업으로 매물 가치를 한층 더 높일 수 있었습니다. 전세도 금방 나갔어요!', rating: 5, date: '2024-08-28', profitAmount: '1.5억원' },
  { id: '8', author: '강민호님', propertyTitle: '세종시 새뜸마을 10단지', content: '대리입찰 당일 법원 분위기를 실시간으로 중계해주셔서 현장에 있는 것 같은 느낌이었습니다. 신뢰가 가네요.', rating: 4, date: '2024-09-30', profitAmount: '8,000만원' },
  { id: '9', author: '송혜교님', propertyTitle: '강남구 대치동 은마아파트', content: '미래 가치를 보고 투자했는데 분석 보고서대로 정확한 타이밍에 입찰하여 좋은 결과를 얻었습니다.', rating: 5, date: '2024-11-01', profitAmount: '5.2억원' },
  { id: '10', author: '이지은님', propertyTitle: '인천 송도 더샵 퍼스트월드', content: '매수신청대리 서비스의 편리함을 확실히 느꼈습니다. 바쁜 직장인에게 경매는 전문가와 함께가 답이네요.', rating: 5, date: '2024-12-02', profitAmount: '1.1억원' },
  { id: '11', author: '김태리님', propertyTitle: '분당 파크뷰', content: '관리비 체납 문제와 점유자 명도 문제까지 일사천리로 해결해주셔서 고생 없이 투자 완료했습니다.', rating: 5, date: '2024-12-15', profitAmount: '2.3억원' },
  { id: '12', author: '박서준님', propertyTitle: '여의도 시범아파트', content: '재건축 호재를 보고 들어갔는데, JB의 정밀 권리분석이 없었다면 놓쳤을 기회였습니다. 정말 고맙습니다.', rating: 5, date: '2025-01-04', profitAmount: '6.7억원' },
  { id: '13', author: '유재석님', propertyTitle: '상암동 월드컵파크', content: '투명한 수수료 체계와 성실한 답변에 감동받았습니다. 주변 지인들에게도 적극 추천하고 있어요.', rating: 5, date: '2025-01-25', profitAmount: '7,200만원' },
  { id: '14', author: '공유님', propertyTitle: '한남 더 힐', content: '하이엔드 물건일수록 디테일한 분석이 필요한데 JB 하우징은 기대를 저버리지 않는 최고의 리포트를 제공했습니다.', rating: 5, date: '2025-02-12', profitAmount: '12억원' },
  { id: '15', author: '손예진님', propertyTitle: '동탄 린스트라우스', content: '분양가보다 저렴한 급매물 수준으로 낙찰받아 대만족입니다. 명도 이후 인테리어까지 한 번에 끝냈어요.', rating: 5, date: '2025-03-07', profitAmount: '1.4억원' },
  { id: '16', author: '현빈님', propertyTitle: '옥수동 래미안 리버젠', content: '직주근접 최상의 위치를 제안해주셔서 감사합니다. 실거주 목적으로 낙찰받았는데 너무 행복합니다.', rating: 5, date: '2025-04-18', profitAmount: '1.9억원' },
  { id: '17', author: '조인성님', propertyTitle: '위례신도시 송파 푸르지오', content: '입찰 전략 수립 단계에서 보여주신 전문성이 낙찰의 결정적 요인이었습니다. 수고 많으셨습니다.', rating: 4, date: '2025-05-09', profitAmount: '1.6억원' },
  { id: '18', author: '이정재님', propertyTitle: '청담동 피엔폴루스', content: '전문적인 명도 서비스 덕분에 점유자와의 마찰 없이 깔끔하게 인도받았습니다. 역시 전문가답네요.', rating: 5, date: '2025-06-10', profitAmount: '3.8억원' },
  { id: '19', author: '정해인님', propertyTitle: '흑석 아크로 리버하임', content: '경매는 운이 아니라 과학이라는 걸 깨닫게 해준 JB 하우징 분석 시스템! 다음 투자도 함께하겠습니다.', rating: 5, date: '2025-07-11', profitAmount: '2.5억원' },
  { id: '20', author: '박보검님', propertyTitle: '다산신도시 아이파크', content: '소액 투자라 조심스러웠는데 적은 자본으로도 가능한 최적의 물건을 찾아주셔서 낙찰까지 성공했습니다.', rating: 5, date: '2025-08-22', profitAmount: '6,500만원' },
  { id: '21', author: '수지님', propertyTitle: '성수동 아크로 서울포레스트', content: '고급 주거 경매의 트렌드를 가장 잘 알고 있는 곳입니다. 섬세한 서비스에 매번 감탄합니다.', rating: 5, date: '2025-09-13', profitAmount: '9.8억원' },
  { id: '22', author: '남주혁님', propertyTitle: '별내신도시 효성해링턴', content: '첫 낙찰의 기쁨을 JB 하우징과 함께해서 영광입니다. 초보자 맞춤 교육 서비스도 아주 좋았어요.', rating: 4, date: '2025-10-14', profitAmount: '7,400만원' },
  { id: '23', author: '김선호님', propertyTitle: '동성로 복합상가', content: '수익형 부동산인 상가 낙찰 후 임차인 구성까지 컨설팅해주셔서 안정적인 월세를 받고 있습니다.', rating: 5, date: '2025-11-15', profitAmount: '2.2억원' },
  { id: '24', author: '한소희님', propertyTitle: '홍대 연남동 빌라', content: '리모델링 후 가치가 급상승할 물건을 기막히게 골라주셨습니다. 현재 에어비앤비로 높은 수익 중입니다.', rating: 5, date: '2025-12-16', profitAmount: '1.7억원' },
  { id: '25', author: '마동석님', propertyTitle: '일산 킨텍스 원시티', content: '말도 많고 탈도 많은 경매 바닥에서 이렇게 정직하고 화끈하게 일해주는 곳은 처음 봅니다. 강력 추천!', rating: 5, date: '2025-12-28', profitAmount: '1.3억원' }
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
