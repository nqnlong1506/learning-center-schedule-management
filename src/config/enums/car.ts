export enum CarFeatEnum {
  FEMALE_DRIVER = '01', //여성운전
  NON_SMOKER = '02', //비흡연 운전자
  SINGLE_OWNER = '03', //한 사람 소유
  FREE_REPAIR_PERIOD = '04', //무상수리 기간
  LESS_THAN_10000KM = '05', //10000km 미만
  GOOD_CONDITION = '06', //양호
  SHOWROOM_TEST_DRIVE = '07', //전시장 시승
  TAX_INVOICE = '08', //세금계산서
  LOWEST_PRICE = '09', //최저가
  URGENT_SALE = '10', //급매
  PRICE_NEGOTIABLE = '11', //가격 절충
  HOT = '12', //HOT
  COOL = '13', //COOL
}

export const productVehicleFeature: Record<string, string> = {
  FEMALE_DRIVER: '여성운전',
  NON_SMOKER: '비흡연 운전자',
  SINGLE_OWNER: '한 사람 소유',
  FREE_REPAIR_PERIOD: '무상수리 기간',
  LESS_THAN_10000KM: '10000km 미만',
  GOOD_CONDITION: '양호',
  SHOWROOM_TEST_DRIVE: '전시장 시승',
  TAX_INVOICE: '세금계산서',
  LOWEST_PRICE: '최저가',
  URGENT_SALE: '급매',
  PRICE_NEGOTIABLE: '가격 절충',
  HOT: 'HOT',
  COOL: 'COOL',
};
export enum CarLisTyp {
  GENERAL = '01', //일반
  HOT_DEAL = '02', //핫딜
  WEAKLY_SPECIAL = '03', //위클리 특가
}

export enum CarSummary {
  BRAND_CER = 'B', //브랜드인증중고
  RENT_AVAILABLE = 'R', //렌트가능
  LEASE_TRANSFER = 'L', //리스승계
  WEAKLY_DEAL = '03', //위클리 특가
}
