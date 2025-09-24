import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth-service';
import { firebasePasswordValidator, namePatternValidator } from '../../../shared/utils/validators';
import { getErrorMessage } from '../../../shared/utils/get-error-message';
import { getAuthError } from '../../../shared/utils/get-auth-error';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { InputPassword } from '../input-password/input-password';
import { ToastService } from '../../../shared/services/toast/toast';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InputPassword, TranslatePipe],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterForm {
  public router = inject(Router);
  public auth = inject(AuthService);
  public toast = inject(ToastService);
  public error = signal('');
  public nameFocus = viewChild<ElementRef>('nameInput');
  public form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2), namePatternValidator]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', {
      validators: [Validators.required],
      asyncValidators: [firebasePasswordValidator()],
      updateOn: 'blur',
    }),
  });
  public translate = inject(TranslateService);
  public getErrorMessage = getErrorMessage;
  public destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      const input = this.nameFocus();
      if (input) input.nativeElement.focus();
    });

    const draft = localStorage.getItem('registerFormDraft');
    if (draft) {
      const value = JSON.parse(draft);
      this.form.patchValue({
        name: value.name ?? '',
        email: value.email ?? '',
      });
    }

    this.form.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
        const { name, email } = value;
        if (name || email) {
          localStorage.setItem('registerFormDraft', JSON.stringify({ name, email }));
        } else {
          localStorage.removeItem('registerFormDraft');
        }
      });
  }

  public submit(): void {
    if (this.form.invalid) return;
    this.error.set('');

    const email = this.form.get('email')!.value!;
    const password = this.form.get('password')!.value!;
    const name = this.form.get('name')!.value!;

    this.auth
      .register(email, password, name)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((error) => {
          this.error.set(getAuthError(error));
          this.toast.show(getAuthError(error), 'error');
          return of(null);
        }),
      )
      .subscribe((user) => {
        if (user) {
          this.toast.show(`Welcome, ${user.displayName}!`, 'success');
          localStorage.removeItem('registerFormDraft');
          this.router.navigate(['/']);
        }
      });
  }
}
