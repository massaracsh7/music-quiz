import { TestBed } from '@angular/core/testing';
import { TracksLoader } from './tracks-loader';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { ITunesTrack } from '../../../models/itunes.model';

describe('TracksLoader', () => {
  let service: TracksLoader;
  let firestoreMock: any;
  let collectionSpy: jasmine.Spy;
  let collectionDataSpy: jasmine.Spy;

  const mockTracks: ITunesTrack[] = [
    {
      wrapperType: 'track',
      kind: 'song',
      artistId: 123,
      collectionId: 456,
      trackId: 1,
      artistName: 'Artist 1',
      collectionName: 'Album 1',
      trackName: 'Track 1',
      collectionCensoredName: 'Album 1',
      trackCensoredName: 'Track 1',
      artistViewUrl: 'artist1-url',
      collectionViewUrl: 'collection1-url',
      trackViewUrl: 'track1-url',
      previewUrl: 'url1',
      artworkUrl30: 'art30-1',
      artworkUrl60: 'art60-1',
      artworkUrl100: 'art1',
      collectionPrice: 9.99,
      trackPrice: 0.99,
      releaseDate: '2023-01-01T08:00:00Z',
      collectionExplicitness: 'notExplicit',
      trackExplicitness: 'notExplicit',
      discCount: 1,
      discNumber: 1,
      trackCount: 12,
      trackNumber: 1,
      trackTimeMillis: 240000,
      country: 'USA',
      currency: 'USD',
      primaryGenreName: 'Pop',
      isStreamable: true,
    },
    {
      wrapperType: 'track',
      kind: 'song',
      artistId: 123,
      collectionId: 456,
      trackId: 1,
      artistName: 'Artist 2',
      collectionName: 'Album 2',
      trackName: 'Track 2',
      collectionCensoredName: 'Album 2',
      trackCensoredName: 'Track 2',
      artistViewUrl: 'artist1-url',
      collectionViewUrl: 'collection1-url',
      trackViewUrl: 'track1-url',
      previewUrl: 'url1',
      artworkUrl30: 'art30-2',
      artworkUrl60: 'art60-2',
      artworkUrl100: 'art1',
      collectionPrice: 7.99,
      trackPrice: 0.89,
      releaseDate: '2023-01-01T08:00:00Z',
      collectionExplicitness: 'notExplicit',
      trackExplicitness: 'notExplicit',
      discCount: 1,
      discNumber: 1,
      trackCount: 12,
      trackNumber: 1,
      trackTimeMillis: 240000,
      country: 'USA',
      currency: 'USD',
      primaryGenreName: 'Pop',
      isStreamable: true,
    },
    {
      wrapperType: 'track',
      kind: 'song',
      artistId: 123,
      collectionId: 456,
      trackId: 1,
      artistName: 'Artist 3',
      collectionName: 'Album 3',
      trackName: 'Track 3',
      collectionCensoredName: 'Album 3',
      trackCensoredName: 'Track 3',
      artistViewUrl: 'artist3-url',
      collectionViewUrl: 'collection1-url',
      trackViewUrl: 'track1-url',
      previewUrl: 'url1',
      artworkUrl30: 'art30-3',
      artworkUrl60: 'art60-3',
      artworkUrl100: 'art1',
      collectionPrice: 5.99,
      trackPrice: 0.59,
      releaseDate: '2023-01-01T08:00:00Z',
      collectionExplicitness: 'notExplicit',
      trackExplicitness: 'notExplicit',
      discCount: 1,
      discNumber: 1,
      trackCount: 12,
      trackNumber: 1,
      trackTimeMillis: 240000,
      country: 'USA',
      currency: 'USD',
      primaryGenreName: 'Pop',
      isStreamable: true,
    },
  ];

  const mockTrackDocuments = mockTracks.map((track) => ({ track }));

  beforeEach(() => {
    collectionDataSpy = jasmine.createSpy('collectionData').and.returnValue(of(mockTrackDocuments));

    collectionSpy = jasmine.createSpy('collection').and.returnValue('mockCollection');

    firestoreMock = {
      collection: collectionSpy,
    };

    firestoreMock = {
      collection: collectionSpy,
      collectionData: collectionDataSpy,
    };

    TestBed.configureTestingModule({
      providers: [TracksLoader, { provide: Firestore, useValue: firestoreMock }],
    });

    service = TestBed.inject(TracksLoader);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call Firestore collection with correct parameters', () => {
    const trackIds = [1, 2];
    service.getTracksByIds(trackIds).subscribe();

    expect(collection).toHaveBeenCalledWith(firestoreMock, 'itunesTracks');
  });

  it('should return tracks that match the provided IDs', (done) => {
    const trackIds = [1, 3];
    const expectedTracks = mockTracks.filter((track) => trackIds.includes(track.trackId));

    service.getTracksByIds(trackIds).subscribe((tracks) => {
      expect(tracks.length).toBe(2);
      expect(tracks).toEqual(expectedTracks);
      done();
    });
  });

  it('should return empty array if no tracks match the provided IDs', (done) => {
    const trackIds = [99, 100];

    service.getTracksByIds(trackIds).subscribe((tracks) => {
      expect(tracks).toEqual([]);
      done();
    });
  });

  it('should return empty array if empty array of IDs is provided', (done) => {
    service.getTracksByIds([]).subscribe((tracks) => {
      expect(tracks).toEqual([]);
      done();
    });
  });
});
