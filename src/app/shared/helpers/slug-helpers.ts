export function slugHelpers(value: string | null | undefined, maxLength: number = 50): string {
  if (!value) {
    return '';
  }

  const slug = value
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replaceAll(/[\u0300-\u036F]/g, '')
    .replaceAll(/[^a-z0-9\s-]/g, '')
    .replaceAll(/\s+/g, '-')
    .replaceAll(/-+/g, '-')
    .replaceAll(/^-+|-+$/g, '');

  return slug.length > maxLength ? slug.slice(0, maxLength).replaceAll(/-+$/, '') : slug;
}
