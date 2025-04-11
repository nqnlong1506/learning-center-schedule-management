import { sha1 } from 'js-sha1';

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
