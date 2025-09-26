import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

export function getErrorMessage(
  control: FormControl,
  fieldNameKey: string,
  translate: TranslateService,
): string | null {
  if (!control.errors) return null;

  const translatedFieldName = translate.instant(fieldNameKey);
  const params = { fieldName: translatedFieldName };

  if (control.errors['required']) {
    return translate.instant('VALIDATION.REQUIRED', params);
  }
  if (control.errors['minlength']) {
    return translate.instant('VALIDATION.MIN_LENGTH', params);
  }
  if (control.errors['email']) {
    return translate.instant('VALIDATION.INVALID_EMAIL', params);
  }
  if (control.errors['lowercase']) {
    return translate.instant('VALIDATION.PASSWORD_LOWERCASE', params);
  }
  if (control.errors['number']) {
    return translate.instant('VALIDATION.PASSWORD_NUMBER', params);
  }
  if (control.errors['minLength']) {
    return translate.instant('VALIDATION.PASSWORD_MIN_LENGTH', params);
  }
  if (control.errors['invalidName']) {
    return translate.instant('VALIDATION.INVALID_NAME', params);
  }

  return null;
}
