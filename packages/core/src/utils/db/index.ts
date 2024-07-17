import type { PrismaClient } from '@prisma/client'
import { inject, injectable } from 'inversify'
import type { MoehubDataCharacterInCollection, MoehubDataCharacterSubmit } from '@moehub/common'
import { Symbols } from '../../container'

@injectable()
export class Database {
  private static client?: PrismaClient

  public readonly character: PrismaClient['character']

  public readonly characterWithCollection: PrismaClient['characterWithCollection']

  public readonly collection: PrismaClient['collection']

  public readonly settings: PrismaClient['settings']

  public constructor(@inject(Symbols.DatabaseFactory) prismaFactory: () => PrismaClient) {
    if (!Database.client) Database.client = prismaFactory()
    this.character = Database.client.character
    this.characterWithCollection = Database.client.characterWithCollection
    this.collection = Database.client.collection
    this.settings = Database.client.settings
  }

  public characterDataParse(
    data: ReturnType<Database['character']['findFirst']> extends Promise<infer T> ? Exclude<T, null> : never
  ): MoehubDataCharacterInCollection {
    return {
      ...data,
      alias: data.alias?.split('|'),
      url: data.url?.split('|'),
      images: data.images?.split('|'),
      birthday: data.birthday ? data.birthday.getTime() : undefined,
      tags: data.tags?.split('|')
    }
  }

  public characterDataStringify(data: MoehubDataCharacterSubmit) {
    return {
      ...data,
      alias: data.alias?.join('|'),
      url: data.url?.join('|'),
      images: data.images?.join('|'),
      birthday: data.birthday ? new Date(data.birthday) : undefined,
      tags: data.tags?.join('|')
    }
  }
  /* 
  public cleanFromCharacter(characterId: number, collectionId: number) {
    return Database.client.characterWithCollection.deleteMany({
      where: {
        characterId_collectionId: {
          characterId,
          collectionId
        } 
  } */
}

export default Database
