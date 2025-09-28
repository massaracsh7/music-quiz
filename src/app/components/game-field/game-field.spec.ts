import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameField } from './game-field';
import { of } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';
import { CategoryService } from '../../core/services/сategory-service/сategory-service';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from '../../shared/services/toast/toast';
import { ItunesService } from '../../core/services/itunes-service';

const createFirestoreMock = () => ({
  collection: jasmine.createSpy('collection').and.returnValue({
    doc: jasmine.createSpy('doc').and.returnValue({
      get: jasmine.createSpy('get').and.returnValue(Promise.resolve({ exists: false })),
      set: jasmine.createSpy('set').and.returnValue(Promise.resolve()),
      delete: jasmine.createSpy('delete').and.returnValue(Promise.resolve()),
    }),
    valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of([])),
    snapshotChanges: jasmine.createSpy('snapshotChanges').and.returnValue(of([])),
    add: jasmine.createSpy('add').and.returnValue(Promise.resolve({ id: 'mock-id' })),
  }),
  doc: jasmine.createSpy('doc').and.returnValue({
    get: jasmine.createSpy('get').and.returnValue(Promise.resolve({ exists: false })),
    set: jasmine.createSpy('set').and.returnValue(Promise.resolve()),
    update: jasmine.createSpy('update').and.returnValue(Promise.resolve()),
    delete: jasmine.createSpy('delete').and.returnValue(Promise.resolve()),
  }),
});

describe('GameField', () => {
  let component: GameField;
  let fixture: ComponentFixture<GameField>;

  let mockFirestore: any;
  let mockTranslateService: any;
  let mockCategoryService: any;
  let mockToastService: any;
  let mockItunesService: any;

  beforeEach(async () => {
    mockFirestore = createFirestoreMock();

    mockTranslateService = {
      instant: (key: string) => key,
      get: (key: string) => of(key),
    };

    mockToastService = {
      show: jasmine.createSpy('show'),
    };

    mockItunesService = {
      searchTracks: jasmine.createSpy('searchTracks').and.returnValue(of([])),
    };

    mockCategoryService = {
      categories: of([]),
      getCategoryById: jasmine.createSpy('getCategoryById').and.returnValue(of(null)),
      getTracksByCategoryId: jasmine.createSpy('getTracksByCategoryId').and.returnValue(of([])),
      firestore: mockFirestore,
    };

    await TestBed.configureTestingModule({
      imports: [GameField],
      providers: [
        { provide: Firestore, useValue: mockFirestore },
        { provide: CategoryService, useValue: mockCategoryService },
        { provide: TranslateService, useValue: mockTranslateService },
        { provide: ToastService, useValue: mockToastService },
        { provide: ItunesService, useValue: mockItunesService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GameField);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
