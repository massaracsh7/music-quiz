import { TestBed } from '@angular/core/testing';
import { ItunesService } from './itunes-service';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';

const mockDoc = (exists: boolean, data: any = {}) => ({
  exists: exists,
  data: () => data,
});

describe('ItunesService', () => {
  let service: ItunesService;
  let getDocSpy: jasmine.Spy;
  let setDocSpy: jasmine.Spy;
  let fetchSpy: jasmine.Spy;

  const mockTrackId = 123456789;
  const mockTrackData = {
    trackId: mockTrackId,
    trackName: 'Test Track',
    artistName: 'Test Artist',
    previewUrl: 'https://example.com/preview.mp3',
    artworkUrl100: 'https://example.com/artwork.jpg',
  };

  const mockFetch = (data: any) =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(data),
    });

  beforeEach(() => {
    const mockDocInstance: any = {
      withConverter: () => mockDocInstance,
      id: 'test-id',
      path: 'test/path',
      parent: null,
      type: 'document',
      firestore: {
        app: {},
        type: 'firestore-lite',
        toJSON: () => ({}),
      },
      get: () => Promise.resolve(mockDoc(false)),
      set: () => Promise.resolve(),
      update: () => Promise.resolve(),
      delete: () => Promise.resolve(),
      onSnapshot: () => () => {},
      collection: () => ({}),
      isEqual: () => true,
    };

    getDocSpy = jasmine.createSpy('getDoc').and.callFake(() => Promise.resolve(mockDoc(false)));
    setDocSpy = jasmine.createSpy('setDoc').and.returnValue(Promise.resolve());
    fetchSpy = spyOn(window, 'fetch').and.callFake(() =>
      Promise.resolve(new Response(JSON.stringify({ results: [mockTrackData] }))),
    );

    spyOn(window, 'fetch').and.returnValue(
      mockFetch({
        resultCount: 1,
        results: [mockTrackData],
      }) as Promise<Response>,
    );

    // Create Firestore spy
    const firestoreSpy = jasmine.createSpyObj('Firestore', ['doc']);
    firestoreSpy.doc.and.returnValue(mockDocInstance);

    // Mock the Firestore functions
    spyOn({ doc }, 'doc').and.callFake(() => mockDocInstance);
    spyOn({ getDoc }, 'getDoc').and.callFake(() => getDocSpy());
    spyOn({ setDoc }, 'setDoc').and.callFake(() => setDocSpy());

    TestBed.configureTestingModule({
      providers: [ItunesService, { provide: Firestore, useValue: firestoreSpy }],
    });

    service = TestBed.inject(ItunesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('cacheTracks', () => {
    it('should fetch and cache track data when not in cache', (done) => {
      service.cacheTracks([mockTrackId]).subscribe(() => {
        expect(fetchSpy).toHaveBeenCalledWith(`https://itunes.apple.com/lookup?id=${mockTrackId}`);
        expect(setDocSpy).toHaveBeenCalled();
        done();
      });
    });

    it('should use cached data when available', (done) => {
      getDocSpy.and.returnValue(Promise.resolve(mockDoc(true, { track: mockTrackData })));

      service.cacheTracks([mockTrackId]).subscribe(() => {
        expect(fetchSpy).not.toHaveBeenCalled();
        expect(setDocSpy).not.toHaveBeenCalled();
        done();
      });
    });

    it('should handle empty track IDs array', (done) => {
      service.cacheTracks([]).subscribe(() => {
        expect(fetchSpy).not.toHaveBeenCalled();
        expect(setDocSpy).not.toHaveBeenCalled();
        done();
      });
    });

    it('should handle multiple track IDs', (done) => {
      const trackIds = [mockTrackId, 987654321];
      service.cacheTracks(trackIds).subscribe(() => {
        expect(fetchSpy).toHaveBeenCalledTimes(2);
        expect(setDocSpy).toHaveBeenCalledTimes(2);
        done();
      });
    });
  });
});
