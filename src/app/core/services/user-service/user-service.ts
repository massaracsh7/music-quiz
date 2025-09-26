import { inject, Injectable, signal, computed, effect } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  updateDoc,
} from '@angular/fire/firestore';
import { catchError, firstValueFrom, from, Observable, of, Subscription, switchMap, tap } from 'rxjs';
import { AuthService } from '../auth-service';
import { AppUser, UserRole } from '../../../models/user.model';
import { ToastService } from '../../../shared/services/toast/toast';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  public firestore = inject(Firestore);
  public auth = inject(AuthService);
  public toast = inject(ToastService);
  public translate = inject(TranslateService);

  public users = signal<(AppUser & { uid: string })[]>([]);

  public currentUser = computed(() => this.auth.currentUser());
  public currentUserData = signal<AppUser | null>(null);
  public loadingUsers = signal<boolean>(true);

  public currentUserRole = computed<UserRole>(() => {
    return this.currentUserData()?.role ?? 'user';
  });

  public canChangeRoles = computed(() => this.isAdmin(this.currentUserRole()));
  public canCreateCategories = computed(() => this.canCreateCategoriesFn(this.currentUserRole()));

  constructor() {
    this.loadUsers();
    effect((onCleanup) => {
      const current = this.currentUser();

      if (!current?.uid) {
        this.currentUserData.set(null);
        return;
      }

      const userDocument = doc(this.firestore, 'users', current.uid);
      const sub = docData(userDocument)
        .pipe(switchMap((user) => of(user as AppUser)))
        .subscribe((user) => this.currentUserData.set(user));

      onCleanup(() => sub.unsubscribe());
    });
  }

  public updateUserRole(uid: string, role: UserRole): Observable<void> {
    const userDocument = doc(this.firestore, 'users', uid);
    return from(updateDoc(userDocument, { role })).pipe(
      tap(() => {
        this.users.update((current) =>
          current.map((user) => (user.uid === uid ? { ...user, role } : user)),
        );
      }),
    );
  }

  public loadUsers(): void {
    this.loadingUsers.set(true)
    const usersCollection = collection(this.firestore, 'users');
    collectionData(usersCollection, { idField: 'uid' })
      .pipe(
        tap((users) =>
          this.users.set(
            (users as (AppUser & { uid: string; role?: UserRole })[]).map((u) => ({
              ...u,
              role: u.role ?? 'user',
            }))
          )
        ),
        catchError((err) => {
          this.toast.show(
            this.translate.instant('TOAST.USERS_LOAD_FAILED', { message: err.message }),
            'error'
          ); return of([]);
        }),
        tap(() => this.loadingUsers.set(false))
      )
      .subscribe();
  }

  public isAdmin(role: UserRole): boolean {
    return role === 'admin';
  }

  public canCreateCategoriesFn(role: UserRole): boolean {
    return role === 'admin' || role === 'super_user';
  }

  public prefetchUsersAsync(): Promise<void> {
    const usersCollection = collection(this.firestore, 'users');
    return firstValueFrom(
      collectionData(usersCollection, { idField: 'uid' }).pipe(
        tap((users) =>
          this.users.set(
            (users as (AppUser & { uid: string; role?: UserRole })[]).map((u) => ({
              ...u,
              role: u.role ?? 'user',
            })),
          ),
        ),
      ),
    ).then(() => { });
  }
}
