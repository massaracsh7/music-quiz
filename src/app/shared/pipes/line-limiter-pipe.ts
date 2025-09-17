import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lineLimiter',
  standalone: true,
})
export class LineLimiterPipe implements PipeTransform {
  transform(value: string | null | undefined, limit: number): string {
    if (!value) return '';

    if (value.length <= limit) {
      return value;
    }

    return value.substring(0, limit) + '...';
  }
}
