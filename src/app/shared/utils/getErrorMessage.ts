import { FormControl } from "@angular/forms";

export function getErrorMessage(control: FormControl, fieldName: string): string | null {
  if (!control.errors) return null;

  if (control.errors['required']) return `${fieldName} is required`;
  if (control.errors['minlength'])
    return `${fieldName} must be at least ${control.errors['minlength'].requiredLength} characters`;
  if (control.errors['email']) return 'Email is invalid';
  if (control.errors['lowercase']) return 'Password must contain a lowercase letter';
  if (control.errors['number']) return 'Password must contain a number';
  if (control.errors['minLength']) return 'Password must be at least 6 characters';

  return null;
}
