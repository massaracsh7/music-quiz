import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showPassword',
  standalone: true
})
export class ShowPasswordPipe implements PipeTransform {

transform(type: string, show: boolean): string {
    if (type !== 'password') return type;
    return show ? 'text' : 'password';
  }

}
