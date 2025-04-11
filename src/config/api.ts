export interface APIResponse {
  success: boolean;
  data: any;
  message: string;
  attrs?: any;
  benchmark?: any;
}

export const SuccessStatus = {
  200: 'OK',
  201: 'Created',
};
