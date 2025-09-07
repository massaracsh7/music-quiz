import type { FirebaseError } from 'firebase/app';

export function getAuthError(error: FirebaseError): string {
  switch (error.code) {
    case 'auth/email-already-in-use': {
      return 'This email is already in use';
    }
    case 'auth/invalid-email': {
      return 'Invalid email address';
    }
    case 'auth/invalid-password': {
      return 'Password must be at least 6 characters';
    }
    case 'auth/user-not-found':
    case 'auth/invalid-credential': {
      return 'Incorrect email or password';
    }
    case 'auth/user-disabled': {
      return 'Your account has been disabled';
    }
    case 'auth/too-many-requests': {
      return 'Too many attempts. Please try again later';
    }
    default: {
      return 'An unexpected error occurred. Please try again';
    }
  }
}
