import { MoehubApiBase, MoehubApiCharacter, MoehubApiCharacters, MoehubDataCharacter } from '@moehub/common';
import http from './http';

export function getCharacter(id: number): Promise<MoehubApiCharacter> {
  return http.get(`/character/${id}`);
}

export function getCharacters(): Promise<MoehubApiCharacters> {
  return http.get('/character');
}

export function createCharacter(character: MoehubDataCharacter): Promise<MoehubApiBase<201>> {
  return http.post('/character', character);
}

export function updateCharacter(id: number, character: MoehubDataCharacter): Promise<MoehubApiBase<204>> {
  return http.put(`/character/${id}`, character);
}

export function deleteCharacter(id: number): Promise<MoehubApiBase<204>> {
  return http.delete(`/character/${id}`);
}
