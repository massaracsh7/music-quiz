import { TestBed } from '@angular/core/testing';
import { UserService } from './user-service';
import { Firestore } from '@angular/fire/firestore';
import { AuthService } from '../auth-service';
import { ToastService } from '../../../shared/services/toast/toast';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AppUser, UserRole } from '../../../models/user.model';

describe('UserService', () => {
  let service: UserService;
  let firestoreSpy: jasmine.SpyObj<Firestore> & {
    doc: jasmine.Spy;
    collection: jasmine.Spy;
  };

  const mockUser: AppUser & { uid: string } = {
    uid: '123',
    email: 'test@example.com',
    displayName: 'Test User',
    role: 'user' as UserRole,
  };

  const mockUsers = [
    { ...mockUser, uid: '1', role: 'user' as UserRole },
    { ...mockUser, uid: '2', role: 'admin' as UserRole },
    { ...mockUser, uid: '3', role: 'super_user' as UserRole },
  ];

  let authServiceSpy = jasmine.createSpyObj('AuthService', [], {
    user$: of(mockUser),
    user: mockUser,
  });
  let toastServiceSpy: jasmine.SpyObj<ToastService>;
  let translateServiceSpy: jasmine.SpyObj<TranslateService>;

  beforeEach(() => {
    const mockDoc = (data: any) => ({
      data: jasmine.createSpy('data').and.returnValue(data),
      exists: true,
      id: '1',
    });

    const mockCollection = (collectionName: string) => {
      return {
        valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of(mockUsers)),
        doc: (id: string) => ({
          get: jasmine
            .createSpy('get')
            .and.returnValue(Promise.resolve(mockDoc(mockUsers.find((u) => u.uid === id) || {}))),
          update: jasmine.createSpy('update').and.returnValue(Promise.resolve()),
          set: jasmine.createSpy('set').and.returnValue(Promise.resolve()),
        }),
        add: jasmine.createSpy('add').and.returnValue(Promise.resolve({ id: 'new-id' })),
      };
    };

    firestoreSpy = {
      collection: jasmine.createSpy('collection').and.callFake(mockCollection),
      doc: jasmine.createSpy('doc').and.callFake((path) => ({
        get: jasmine.createSpy('get').and.returnValue(Promise.resolve(mockDoc(mockUser))),
        update: jasmine.createSpy('update').and.returnValue(Promise.resolve()),
      })),
    } as any;

    authServiceSpy = jasmine.createSpyObj('AuthService', ['user$', 'user']);
    authServiceSpy.user$ = of(mockUser);
    authServiceSpy.user = mockUser;

    toastServiceSpy = jasmine.createSpyObj('ToastService', ['success', 'error']);
    translateServiceSpy = jasmine.createSpyObj('TranslateService', ['instant']);

    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        UserService,
        { provide: Firestore, useValue: firestoreSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ToastService, useValue: toastServiceSpy },
        { provide: TranslateService, useValue: translateServiceSpy },
      ],
    });

    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadUsers', () => {
    it('should load users and update users signal', (done) => {
      service.loadUsers();

      setTimeout(() => {
        expect(service.users().length).toBe(3);
        expect(service.loadingUsers()).toBeFalse();
        done();
      }, 0);
    });
  });

  describe('updateUserRole', () => {
    it('should update user role', (done) => {
      const newRole: UserRole = 'admin';
      service.updateUserRole('1', newRole).subscribe(() => {
        expect(firestoreSpy.doc).toHaveBeenCalledWith(jasmine.anything(), 'users/1');
        done();
      });
    });
  });

  describe('isAdmin', () => {
    it('should return true for admin role', () => {
      expect(service.isAdmin('admin' as UserRole)).toBeTrue();
    });

    it('should return false for non-admin roles', () => {
      expect(service.isAdmin('user' as UserRole)).toBeFalse();
      expect(service.isAdmin('super_user' as UserRole)).toBeFalse();
    });
  });

  describe('canCreateCategoriesFn', () => {
    it('should return true for admin and super_user roles', () => {
      expect(service.canCreateCategoriesFn('admin' as UserRole)).toBeTrue();
      expect(service.canCreateCategoriesFn('super_user' as UserRole)).toBeTrue();
    });

    it('should return false for user role', () => {
      expect(service.canCreateCategoriesFn('user' as UserRole)).toBeFalse();
    });
  });

  describe('prefetchUsersAsync', () => {
    it('should prefetch users asynchronously', async () => {
      await service.prefetchUsersAsync();
      expect(service.users().length).toBe(3);
    });
  });

  describe('computed properties', () => {
    it('should compute currentUserRole', () => {
      service.currentUserData.set({ ...mockUser, role: 'admin' });
      expect(service.currentUserRole()).toBe('admin');
    });

    it('should compute canChangeRoles', () => {
      service.currentUserData.set({ ...mockUser, role: 'admin' });
      expect(service.canChangeRoles()).toBeTrue();

      service.currentUserData.set({ ...mockUser, role: 'user' });
      expect(service.canChangeRoles()).toBeFalse();
    });

    it('should compute canCreateCategories', () => {
      service.currentUserData.set({ ...mockUser, role: 'admin' });
      expect(service.canCreateCategories()).toBeTrue();

      service.currentUserData.set({ ...mockUser, role: 'super_user' });
      expect(service.canCreateCategories()).toBeTrue();

      service.currentUserData.set({ ...mockUser, role: 'user' });
      expect(service.canCreateCategories()).toBeFalse();
    });
  });
});
