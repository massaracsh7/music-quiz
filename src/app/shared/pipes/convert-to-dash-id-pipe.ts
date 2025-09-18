import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToDashId',
  standalone: true,
})
export class ConvertToDashIdPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value.toLowerCase().trim().replace(/\s+/g, '-');
  }
}
