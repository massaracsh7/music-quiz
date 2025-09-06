import { Auth, getAuth, validatePassword } from "@angular/fire/auth";
import { AbstractControl, FormControl, ValidationErrors } from "@angular/forms";
import { from, map, Observable } from "rxjs";

export interface PasswordErrors {
  lowercase?: boolean;
  number?: boolean;
  minLength?: boolean;
}

export function firebasePasswordValidator(auth: Auth) {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const password = control.value || '';
    if (!password) return from([null]);

    return from(validatePassword(auth, password)).pipe(
      map(status => {
        if (status.isValid) return null;

        const errors: any = {};
        if (!status.containsLowercaseLetter) errors.lowercase = true;
        if (!status.containsNumericCharacter) errors.number = true;
        if (!status.meetsMinPasswordLength) errors.minLength = true;

        return errors;
      })
    );
  };
}
