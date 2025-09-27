import { TestBed } from '@angular/core/testing';
import { UserService } from './user-service';
import { Firestore } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from '../../../shared/services/toast/toast';

describe('UserService', () => {
  let service: UserService;

  const mockFirestore = jasmine.createSpyObj('Firestore', ['collection']);
  const mockAuth = jasmine.createSpyObj('Auth', ['currentUser']);
  const mockToastService = jasmine.createSpyObj('ToastService', ['showSuccess', 'showError']);
  const mockTranslateService = jasmine.createSpyObj('TranslateService', ['instant']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: Firestore, useValue: mockFirestore },
        { provide: Auth, useValue: mockAuth },
        { provide: ToastService, useValue: mockToastService },
        { provide: TranslateService, useValue: mockTranslateService },
      ],
    });

    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
