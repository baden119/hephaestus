export interface PbsTrack {
  id: number;
  artist: string;
  title: string;
}

export interface PbsEpisode {
  trackListURL?: string;
  trackList?: PbsTrack[] | null;
  date: string;
}
