import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

export function getErrorMessage(
  control: FormControl,
  fieldNameKey: string,
  translate: TranslateService,
): string | null {
  if (!control.errors) return null;

  const translatedFieldName = translate.instant(fieldNameKey);
  const parameters = { fieldName: translatedFieldName };

  if (control.errors['required']) {
    return translate.instant('VALIDATION.REQUIRED', parameters);
  }
  if (control.errors['minlength']) {
    return translate.instant('VALIDATION.MIN_LENGTH', parameters);
  }
  if (control.errors['email']) {
    return translate.instant('VALIDATION.INVALID_EMAIL', parameters);
  }
  if (control.errors['lowercase']) {
    return translate.instant('VALIDATION.PASSWORD_LOWERCASE', parameters);
  }
  if (control.errors['number']) {
    return translate.instant('VALIDATION.PASSWORD_NUMBER', parameters);
  }
  if (control.errors['minLength']) {
    return translate.instant('VALIDATION.PASSWORD_MIN_LENGTH', parameters);
  }
  if (control.errors['invalidName']) {
    return translate.instant('VALIDATION.INVALID_NAME', parameters);
  }

  return null;
}
