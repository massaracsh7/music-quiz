import type { FirebaseError } from 'firebase/app';

export function getAuthError(error: FirebaseError): string {
  switch (error.code) {
    case 'auth/email-already-in-use': {
      return 'AUTH.ERRORS.EMAIL_ALREADY_IN_USE';
    }
    case 'auth/invalid-email': {
      return 'AUTH.ERRORS.INVALID_EMAIL';
    }
    case 'auth/invalid-password': {
      return 'AUTH.ERRORS.INVALID_PASSWORD';
    }
    case 'auth/user-not-found':
    case 'auth/invalid-credential': {
      return 'AUTH.ERRORS.INVALID_CREDENTIALS';
    }
    case 'auth/user-disabled': {
      return 'AUTH.ERRORS.USER_DISABLED';
    }
    case 'auth/too-many-requests': {
      return 'AUTH.ERRORS.TOO_MANY_REQUESTS';
    }
    case 'auth/weak-password': {
      return 'AUTH.ERRORS.WEAK_PASSWORD';
    }
    default: {
      return 'AUTH.ERRORS.UNEXPECTED_ERROR';
    }
  }
}
