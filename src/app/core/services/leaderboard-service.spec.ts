import { TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { of } from 'rxjs';

import { LeaderboardService } from './leaderboard-service';
import { AuthService } from './auth-service';

describe('LeaderboardService', () => {
  let service: LeaderboardService;
  let authService: jasmine.SpyObj<AuthService>;

  const mockAuth = {
    currentUser: Promise.resolve({ uid: 'test-uid' }),
    onAuthStateChanged: () => () => {}
  } as any;

  const mockFirestore = {
    collection: jasmine.createSpy('collection').and.returnValue({})
  } as any;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['currentUser', 'isLoggedIn']);

    TestBed.configureTestingModule({
      providers: [
        LeaderboardService,
        { provide: Auth, useValue: mockAuth },
        { provide: Firestore, useValue: mockFirestore },
        { provide: AuthService, useValue: authService }
      ]
    });

    service = TestBed.inject(LeaderboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
