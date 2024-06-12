import { MoehubApiCharacter, MoehubApiCharacters } from '@moehub/common';
import http from './http';

export function getCharacter(id: number): Promise<MoehubApiCharacter> {
  return http.get(`/character/${id}`);
}

export function getCharacters(): Promise<MoehubApiCharacters> {
  return http.get('/character');
}
