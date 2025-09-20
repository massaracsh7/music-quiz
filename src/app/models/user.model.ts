export type UserRole = 'admin' | 'super_user' | 'user' ;

export interface AppUser {
  email: string;
  displayName: string;
  role: UserRole;
}

export interface UserInfo extends AppUser {
  uid: string;  
}