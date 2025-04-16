export interface APIResponse {
  success: boolean;
  data: any;
  message: string;
  attrs?: any;
  benchmark?: any;
}
export interface HpAPIResponse {
  IF_RST_CD: '00' | '99';
  IF_RST_MSG: boolean;
  [key: string]: any;
}

export interface ThirdAPIResponse {
  IF_RST_CD: '00' | '99';
  IF_RST_MSG: string;
  [key: string]: any;
}

export const APIStatus = {
  200: 'OK',
  201: 'Created',
};
