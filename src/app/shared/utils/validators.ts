import { getAuth, validatePassword } from "@angular/fire/auth";
import { AbstractControl, FormControl, ValidationErrors } from "@angular/forms";
import { from, map, Observable } from "rxjs";

export interface PasswordErrors {
  lowercase?: boolean;
  number?: boolean;
  minLength?: boolean;
}

export function firebasePasswordValidator(): (control: AbstractControl) => Observable<ValidationErrors | null> {
  return (control: AbstractControl) => {
    const password = control.value || '';
    if (!password) return from([null]);

    return from(validatePassword(getAuth(), password)).pipe(
      map(status => {
        if (status.isValid) return null;

        const errors: PasswordErrors = {};
        if (status.containsLowercaseLetter !== true) errors.lowercase = true;
        if (status.containsNumericCharacter !== true) errors.number = true;
        if (status.meetsMinPasswordLength !== true) errors.minLength = true;

        return errors as ValidationErrors;
      })
    );
  }};