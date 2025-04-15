import { Buffer } from 'buffer';
import { sha1 } from 'js-sha1';
import * as crypto from 'crypto';

export const formatFilesize = (size: number) => {
  if (!size) size = 0;
  const kb = 1024; // Kilobyte
  const mb = 1024 * kb; // Megabyte
  const gb = 1024 * mb; // Gigabyte
  const tb = 1024 * gb; // Megabyte

  if (size < kb) return size.toString() + ' B';
  else if (size < mb)
    return (
      parseFloat((size / kb).toString())
        .toFixed(2)
        .toString() + ' KB'
    );
  else if (size < gb)
    return (
      parseFloat((size / mb).toString())
        .toFixed(2)
        .toString() + ' MB'
    );
  else if (size < tb)
    return (
      parseFloat((size / gb).toString())
        .toFixed(2)
        .toString() + ' GB'
    );
  else
    return (
      parseFloat((size / tb).toString())
        .toFixed(2)
        .toString() + ' TB'
    );
};

export const validEmailAddress = (mail: string) => {
  const user = "[a-zA-Z0-9_\-\.\+\^!#\$%&*+\/\=\?\`\|\{\}~']+";
  const domain = '(?:(?:[a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.?)+';
  const ipv4 = '[0-9]{1,3}(\.[0-9]{1,3}){3}';
  const ipv6 = '[0-9a-fA-F]{1,4}(\:[0-9a-fA-F]{1,4}){7}';
  const regex = `/^${user}@(${domain}|(\[(${ipv4}|${ipv6})\]))$/`;
  return mail.match(regex);
};

// export const exportExcelWithFields = async (
//   fields: any,
//   data: any,
//   valueMapping: Record<string, Record<any, any>> = {},
// ) => {
//   const workbook = new ExcelJS.Workbook();
//   const worksheet = workbook.addWorksheet('Export');

//   worksheet.columns = fields.map((field: any) => {
//     const columnData = data.map((purchase: any) =>
//       getField(purchase, field.key, '-', valueMapping),
//     );

//     const maxLength = Math.max(field.title.length, 10);

//     const maxWidth = 100;
//     const columnWidth = Math.min(maxLength + 2, maxWidth);

//     return {
//       header: field.title,
//       key: field.key,
//       width: field?.style?.width ?? columnWidth,
//     };
//   });

//   const headerRow = worksheet.getRow(1);
//   fields.forEach((field: { style: any }, index: number) => {
//     const cell = headerRow.getCell(index + 1);
//     const style = field.style || {};

//     Object.entries(style).forEach(([key, value]) => {
//       if (value && key in cell) {
//         (cell as any)[key] = value;
//       }
//     });
//   });

//   worksheet.getRow(1).eachCell((cell) => {
//     cell.fill = {
//       type: 'pattern',
//       pattern: 'solid',
//       fgColor: { argb: '0274bf' },
//     };
//     cell.font = {
//       bold: true,
//       color: { argb: 'FFFFFF' },
//     };
//     cell.alignment = { horizontal: 'center' };
//   });

//   data.forEach((data: any) => {
//     const rowData: Record<string, any> = {};
//     fields.forEach((field: any) => {
//       let value = getField(data, field.key, '-', valueMapping);

//       if (typeof value === 'number') {
//         value = value.toLocaleString('en-US');
//       }

//       rowData[field.key] = value;
//     });
//     worksheet.addRow(rowData);
//   });

//   const excelBuffer = await workbook.xlsx.writeBuffer();
//   return Buffer.from(excelBuffer);
// };

// export function passwordCrypt(input: string): string {
//   const innerHash: Buffer = crypto.createHash('sha1').update(input).digest();

//   const outerHash: string = crypto
//     .createHash('sha1')
//     .update(innerHash)
//     .digest('hex')
//     .toUpperCase();

//   return '*' + outerHash;
// }

export function passwordCrypt(input: string): string {
  const cryptData =
    '*' + sha1(new Uint8Array(sha1.arrayBuffer(input))).toUpperCase();
  return cryptData;
}

export function checkPassword(
  plainPassword: string,
  userPassword: string,
): boolean {
  return passwordCrypt(plainPassword) === userPassword;
}
export function validatePassword(password: string): boolean {
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[^a-zA-Z\d]/.test(password);

  return hasLetter && hasNumber && hasSpecialChar;
}

export const customSort = (a: any, b: any) => {
  const nameA = a.name;
  const nameB = b.name;

  const isKorean = (char: string) => /[\uAC00-\uD7AF]/.test(char);
  const isUpper = (char: string) => /[A-Z]/.test(char);
  const isLower = (char: string) => /[a-z]/.test(char);
  const isNumber = (char: string) => /[0-9]/.test(char);

  const firstA = nameA[0];
  const firstB = nameB[0];

  if (isKorean(firstA) && !isKorean(firstB)) return -1;
  if (!isKorean(firstA) && isKorean(firstB)) return 1;
  if (isKorean(firstA) && isKorean(firstB)) {
    return new Intl.Collator('ko-KR').compare(nameA, nameB);
  }

  if (isUpper(firstA) && !isUpper(firstB)) return -1;
  if (!isUpper(firstA) && isUpper(firstB)) return 1;
  if (isUpper(firstA) && isUpper(firstB)) {
    return nameA.localeCompare(nameB);
  }

  if (isLower(firstA) && !isLower(firstB)) return -1;
  if (!isLower(firstA) && isLower(firstB)) return 1;
  if (isLower(firstA) && isLower(firstB)) {
    return nameA.localeCompare(nameB);
  }

  if (isNumber(firstA) && !isNumber(firstB)) return 1;
  if (!isNumber(firstA) && isNumber(firstB)) return -1;
  if (isNumber(firstA) && isNumber(firstB)) {
    return nameA.localeCompare(nameB);
  }

  return nameA.localeCompare(nameB);
};


const getField = (
  data: any,
  key: string,
  defaultValue: any,
  valueMapping: Record<string, Record<any, any>> = {},
) => {
  const keys = key.split('.');
  let value = data;

  for (let i = 0; i < keys.length; i++) {
    if (value === undefined || value === null) {
      return defaultValue;
    }
    value = value[keys[i]];
  }

  if (valueMapping[key] && value !== undefined && value !== null) {
    return valueMapping[key][value] || value;
  }

  return value !== undefined && value !== null ? value : defaultValue;
};

export const isJSONString = (value: string): boolean => {
  if (typeof value !== 'string') {
    return false;
  }

  try {
    const parsed = JSON.parse(value);
    return typeof parsed === 'object' && parsed !== null;
  } catch (error) {
    return false;
  }
};

export const convertToCamelCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((item) => {
      const res = convertToCamelCase(item);
      return res;
    });
  }

  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc: Record<string, any>, key: string) => {
      const camelKey = key.replace(/_([a-z])/g, (_, char) =>
        char.toUpperCase(),
      );
      const value = obj[key];

      if (typeof value === 'string') {
        if (isJSONString(value)) {
          const parsedValue = JSON.parse(value);
          if (typeof parsedValue === 'object' && parsedValue !== null) {
            acc[camelKey] = JSON.stringify(convertToCamelCase(parsedValue));
            return acc;
          }
        }
      }

      acc[camelKey] = convertToCamelCase(value);
      return acc;
    }, {});
  }
  return obj;
};

export const convertStringToUnderscore = (data: string): string => {
  if (!data) return '';

  return data
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[- ]+/g, '_')
    .toLowerCase();
};
export const generateMidCode = (): string => {
  let post = '';
  const codeLength = 5;
  const characters = '0000123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < codeLength) {
    post += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }

  return post;
};

const isValidDate = (date: any): boolean => {
  return date instanceof Date && !isNaN(date.getTime());
};

const isISOString = (value: any): boolean => {
  if (value instanceof Date) {
    if (!isValidDate(value)) {
      return false;
    }
    value = value.toISOString();
  }

  if (typeof value === 'object') {
    return false;
  }

  const isoDateRegex =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/;
  return typeof value === 'string' && isoDateRegex.test(value);
};

export const recursiveParseJson = (data: any) => {
  if (typeof data === 'string' && isJSONString(data)) {
    try {
      if (isISOString(data)) {
        return data;
      }
      const parsed = JSON.parse(data);
      return recursiveParseJson(parsed);
    } catch (error) {
      console.log(error);
      return data;
    }
  } else if (Array.isArray(data)) {
    return data.map(recursiveParseJson);
  } else if (data && typeof data === 'object') {
    if (isISOString(data)) {
      return data;
    }
    return Object.keys(data).reduce((acc, key) => {
      if (data) {
        acc[key] = recursiveParseJson(data[key]);
      }
      return acc;
    }, {});
  }

  return data;
};

export const maskString = (input: string): string => {
  if (!input || input.length <= 2) {
    return input;
  }

  const firstChar = input[0];
  const lastChar = input[input.length - 1];
  const maskedPart = '*'.repeat(input.length - 2);

  return `${firstChar}${maskedPart}${lastChar}`;
};
export const maskPhoneString = (input: string): string => {
  if (!input || input.length <= 10) {
    return input;
  }

  const firstFourChar = input.substring(0, 3);
  const lastFourChar = input.substring(input.length - 4);
  const maskedPart = '*'.repeat(input.length - 7);

  return `${firstFourChar}${maskedPart}${lastFourChar}`;
};
export const encryptPhoneNumber = (phoneNumber: string): string => {
  // Mã hóa số điện thoại
  const encryptedPhoneNumber = Buffer.from(phoneNumber).toString('base64');
  return encryptedPhoneNumber;
};

export const decryptPhoneNumber = (encryptedPhoneNumber: string): string => {
  // Giải mã số điện thoại
  const phoneNumber = Buffer.from(encryptedPhoneNumber, 'base64').toString(
    'utf8',
  );
  return phoneNumber;
};

export const createBrowserFingerprint = (req: any): string => {
  const userAgent = req.headers['user-agent'] || '';
  const acceptLanguage = req.headers['accept-language'] || '';
  const secChUa = req.headers['sec-ch-ua'] || '';
  const secChUaMobile = req.headers['sec-ch-ua-mobile'] || '';
  const secChUaPlatform = req.headers['sec-ch-ua-platform'] || '';
  const secChUaFullVersion = req.headers['sec-ch-ua-full-version'] || '';

  const fingerprintData = `${userAgent}|${acceptLanguage}|${secChUa}|${secChUaMobile}|${secChUaPlatform}|${secChUaFullVersion}`;

  return crypto.createHash('sha256').update(fingerprintData).digest('hex');
};

export const langOrg = (key: string) => {
  const model = {
    male: 'Male',
    female: 'Female',
    userconfig_manager: 'Dept. Manager',
    user_receive_person: 'Dept. receptionist',
    delete_data: 'Delete data',
    create_data: 'Create data',
    history_mod_passwd: 'Change password',
    default: undefined,
  };

  return model[key] || model.default;
};

export const formatBirthday = (birthday: string) => {
  if (birthday.length || birthday === '0') return '';
  const year = birthday.substring(0, 4);
  const month = birthday.substring(4, 6);
  const day = birthday.substring(6);
  const dateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  const y = dateObj.getFullYear();
  const m = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const d = dateObj.getDate().toString().padStart(2, '0');
  return `${y}-${m}-${d}`;
};

export const isValidJSONString = (data: string): boolean => {
  try {
    JSON.parse(data);
    return true;
  } catch (e) {
    return false;
  }
};
export const numberWithCommas = (value: any) =>
  `${value || 0}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const convertToKoreanTime = (dateTime: string | Date) => {
  const date = new Date(dateTime);

  if (isNaN(date.getTime())) {
    return 'Invalid date format';
  }
  date.setHours(date.getHours() + 9);
  return date.toISOString().replace('Z', '+09:00');
};
