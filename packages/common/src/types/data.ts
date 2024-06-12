export type MoehubGenre = 'ANIME' | 'COMIC' | 'GALGAME' | 'GAME' | 'NOVEL';

export interface MoehubDataCharacter {
  id: number;
  name: string;
  alias?: string[];
  url?: string[];
  images?: string[];
  romaji: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  age: null | number;
  description: null | string;
  comment: null | string;
  hitokoto: null | string;
  voice: null | string;
  series: string;
  seriesGenre: MoehubGenre;
  hairColor: null | string;
  eyeColor: null | string;
  bloodType: null | 'A' | 'B' | 'AB' | 'O';
  height: null | number;
  bust: null | number;
  waist: null | number;
  hip: null | number;
  createdAt: string;
  collections: {
    id: number;
    name: string;
    description: string;
  }[];
}

export interface MoehubDataSeries {
  name: string;
  genre: MoehubGenre;
  characters: number;
}

export interface MoehubDataTag {
  name: string;
  characters: number;
}
