
export type PhotoCategory = 'Childhood' | 'Growing Years' | 'Present Her' | 'Our Journey';

export interface Photo {
  url: string;
  category: PhotoCategory;
  caption: string;
  secretMessage?: string;
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
  spotifyUrl?: string;
}

export interface Voucher {
  id: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
}

export interface VoiceNote {
  id: string;
  title: string;
  date: string;
  duration: string;
  transcript: string;
}

export interface Dream {
  id: string;
  text: string;
  isAchieved: boolean;
  createdAt: number;
}
