
export type PhotoCategory = 'Childhood' | 'Growing Years' | 'Present Her' | 'Our Journey';

export interface Photo {
  url: string;
  category: PhotoCategory;
  caption: string;
  secretMessage?: string; // Optional easter egg message
}

export interface Moment {
  id: string;
  date: string;
  title: string;
  description: string;
  icon: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  cover: string;
  spotifyUrl?: string; // The link to embed
}

export interface VoiceNote {
  id: string;
  title: string;
  duration: string;
  date: string;
  transcript: string;
}
