import { MoehubApiBase, MoehubApiCharacter, MoehubApiCharacters, MoehubDataCharacterSubmit } from '@moehub/common';
import http from './http';

export function getCharacter(id: number): Promise<MoehubApiCharacter> {
  return http.get(`/character/${id}`);
}

export function getCharacters(): Promise<MoehubApiCharacters> {
  return http.get('/character');
}

export function createCharacter(character: MoehubDataCharacterSubmit): Promise<MoehubApiBase<201>> {
  return http.post('/character', character);
}

export function updateCharacter(id: number, character: MoehubDataCharacterSubmit): Promise<MoehubApiBase<204>> {
  return http.put(`/character/${id}`, character);
}

export function deleteCharacter(id: number): Promise<MoehubApiBase<204>> {
  return http.delete(`/character/${id}`);
}
