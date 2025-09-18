export function convertToDashId(value: string): string {
  if (!value) return '';
  return value.toLowerCase().trim().replace(/\s+/g, '-');
}
