
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
  title: string;
  artist: string;
  cover: string;
}

export interface VoiceNote {
  id: string;
  title: string;
  duration: string;
  date: string;
  transcript: string;
}
