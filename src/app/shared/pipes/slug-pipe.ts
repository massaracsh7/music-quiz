import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slug',
  standalone: true,
})
export class SlugPipe implements PipeTransform {
  transform(value: string | null | undefined, maxLength: number = 50): string {
    if (!value) {
      return '';
    }

    let slug = value
      .toString()
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');

    return slug.length > maxLength
      ? slug.slice(0, maxLength).replace(/-+$/, '')
      : slug;
  }
}
