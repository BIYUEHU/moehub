import type { ParserInfer } from 'tsukiko'
import type { characterSchema, collectionSchema, settingsSchema } from '../schema'

export type UndefinedToNull<T extends Record<string, unknown>> = {
  [K in keyof T]: undefined extends T[K] ? Required<T>[K] | null : T[K]
}

// export type FilterUndefined<T extends Record<string, unknown>> = {
//   [K in keyof T]: undefined extends T[K] ? never : T[K]
// }

export type MoehubDataCharacterSubmit = ParserInfer<typeof characterSchema>

export type MoehubDataCharacter = Omit<UndefinedToNull<MoehubDataCharacterSubmit>, 'collections'> & {
  id: number
  collections: Omit<UndefinedToNull<MoehubDataCollectionSubmit>, 'characters'>[]
}

export type MoehubDataCharacterInCollection = Omit<MoehubDataCharacter, 'collections'>

export type MoehubDataCollectionSubmit = ParserInfer<typeof collectionSchema>

export type MoehubDataCollection = Omit<UndefinedToNull<MoehubDataCollectionSubmit>, 'characters'> & {
  id: number
  characters: MoehubDataCharacterInCollection[]
}

export interface MoehubDataSeries {
  name: string
  genre: MoehubDataCharacter['seriesGenre']
  characters: number
}

export interface MoehubDataTag {
  name: string
  characters: number
}

export type MoehubDataSettingsSubmit = Partial<ParserInfer<typeof settingsSchema>>

export type MoehubDataSettings = Required<MoehubDataSettingsSubmit>
