import type {
  MoehubApiBase,
  MoehubApiCharacter,
  MoehubApiCharacters,
  MoehubApiSeries,
  MoehubApiSettings,
  MoehubApiTags,
  MoehubDataCharacterSubmit,
  MoehubDataSettingsSubmit
} from '@moehub/common'
import http from './http'

export async function getCharacter(id: number): Promise<MoehubApiCharacter['data']> {
  return (await http.get(`/character/${id}`)).data
}

export async function getCharacters(): Promise<MoehubApiCharacters['data']> {
  return (await http.get('/character')).data
}

export function createCharacter(character: MoehubDataCharacterSubmit): Promise<MoehubApiBase<201>> {
  return http.post('/character', character)
}

export function updateCharacter(id: number, character: MoehubDataCharacterSubmit): Promise<MoehubApiBase<204>> {
  return http.put(`/character/${id}`, character)
}

export function deleteCharacter(id: number): Promise<MoehubApiBase<204>> {
  return http.delete(`/character/${id}`)
}

export function getTags(): Promise<MoehubApiTags> {
  return http.get('/tag')
}

export function getSeries(): Promise<MoehubApiSeries> {
  return http.get('/series')
}

export async function getSettings(): Promise<MoehubApiSettings['data']> {
  return (await http.get('/settings')).data
}

export function updateSettings(settings: MoehubDataSettingsSubmit): Promise<MoehubApiBase<204>> {
  return http.put('/settings', settings)
}
