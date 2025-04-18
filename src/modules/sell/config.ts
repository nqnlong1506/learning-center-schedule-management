export function formatNumber(n: number): string {
  const s: string = n.toString();
  if (s.length >= 6) {
    return s;
  }
  const paddingLength: number = 6 - s.length;
  const padding: string = '0'.repeat(paddingLength);
  return padding + s;
}
