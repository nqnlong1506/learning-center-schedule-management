const port = process.env.PORT || '3000';

export const config = {
  carHistory: {
    carHistoryURL: process.env.CAR_HISTORY_URL,
    carHistoryKey: process.env.CARHISTORY_KEY,
    kisaIvKey: process.env.KISA_IV_KEY,
    kisaUserkey: process.env.KISA_USER_KEY,
  },
};
export const carHistoryError = {
  100: '필수항목 입력 누락',
  101: '제휴사코드 없음',
  102: '차량번호 없음',
  103: '차량번호조회 요청시 말소차량 조회불가',
  104: '차대번호조회 요청시 유효차량 조회불가',
  200: '차량번호 형식오류',
  201: '요청자료 복호화 불가',
  400: '접근IP 미등록',
  401: '제휴사 이용 미허용',
  402: '서비스 이용기간 아님',
  403: '말소차량조회요청시 권한 없음',
  404: '기준일자조회요청시 권한 없음',
  405: '차대번호조회요청시 권한 없음',
  406: '해당차량번호 조회권한 없음',
  500: '요청권한 없음',
  507: '허용 rType이 아님',
  800: 'PORT 오류',
  999: '조회오류',
};
