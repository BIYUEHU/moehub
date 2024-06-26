export type MoehubGenre = 'ANIME' | 'COMIC' | 'GALGAME' | 'GAME' | 'NOVEL' | 'OTHER';

export interface MoehubDataCharacter {
  id: number;
  name: string;
  alias?: string[];
  url?: string[];
  tags?: string[];
  images?: string[];
  romaji: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  age: null | number;
  description: null | string;
  birthday: null | string;
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

export type MoehubDataCharacterSubmit = Omit<MoehubDataCharacter, 'id' | 'createdAt' | 'birthday'> & {
  birthday?: number;
};

export interface MoehubDataSeries {
  name: string;
  genre: MoehubGenre;
  characters: number;
}

export interface MoehubDataTag {
  name: string;
  characters: number;
}
