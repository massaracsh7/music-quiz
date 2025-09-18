export type ITunesTrack = {
  trackId: number;
  trackName: string;
  artistName: string;
  collectionName: string;
  artworkUrl60: string;
  kind: string;
  isSelected?: boolean;
};

export type ITunesResponse = {
  resultCount: number;
  results: ITunesTrack[];
};
