import { SEED_CBC_Encrypt } from './KISA_SEED_CBC';

function ordUtf8(char: string) {
  // Encode the character as UTF-8
  const utf8Bytes = new TextEncoder().encode(char);
  // Return the first byte value
  return utf8Bytes;
}
function strToHex(data_str: string) {
  let hex = '';
  for (let i = 0; i < data_str.length; i++) {
    let res = ordUtf8(data_str[i]);
    res.forEach((item) => {
      hex = hex + ',' + item.toString(16);
    });
  }
  return hex;
}
function encrypt(bszIV: string, bszUser_key: string, str: string) {
  const planBytes = str.split(',').map((hex) => parseInt(hex, 16));
  const keyBytes = bszUser_key.split(',').map((hex) => parseInt(hex, 16));
  const IVBytes = bszIV.split(',').map((hex) => parseInt(hex, 16));

  if (planBytes.length == 0) {
    return str;
  }
  let ret = '';
  let bszChiperText = null;

  bszChiperText = SEED_CBC_Encrypt(
    keyBytes,
    IVBytes,
    planBytes,
    0,
    planBytes.length,
  );

  const r = bszChiperText.length;

  for (let i = 0; i < r; i++) {
    ret += bszChiperText[i].toString(16).padStart(2, '0').toUpperCase();
  }
  return ret;
}
export const seed_encrypt = (
  bszIV: string,
  bszUser_key: string,
  str: string,
) => {
  str = strToHex(str).substring(1);
  let str_return = encrypt(bszIV, bszUser_key, str)
    .replace(/,/g, '')
    .toLowerCase();
  return str_return;
};
