import { Track } from './track.type';

export type ITunesResponse = {
  resultCount: number;
  results: Track[];
};
