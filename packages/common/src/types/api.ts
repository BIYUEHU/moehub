import type {
  MoehubDataCharacter,
  MoehubDataCollection,
  MoehubDataLogin,
  MoehubDataSeries,
  MoehubDataSettings,
  MoehubDataTag
} from './data'

// biome-ignore lint:
export type MoehubApiBase<Code extends number = number, Body = any> = Code extends 200
  ? { code: Code; data: Body }
  : Code extends 201 | 204
    ? { code: Code }
    : { code: Code; error: Body }

export type MoehubApiCharacter = MoehubApiBase<200, MoehubDataCharacter>

export type MoehubApiCharacters = MoehubApiBase<200, MoehubDataCharacter[]>

export type MoehubApiCollection = MoehubApiBase<200, MoehubDataCollection>

export type MoehubApiCollections = MoehubApiBase<200, MoehubDataCollection[]>

export type MoehubApiTags = MoehubApiBase<200, MoehubDataTag[]>

export type MoehubApiSeries = MoehubApiBase<200, MoehubDataSeries[]>

export type MoehubApiSettings = MoehubApiBase<200, MoehubDataSettings>

export type MoehubApiLogin = MoehubApiBase<200, MoehubDataLogin>
