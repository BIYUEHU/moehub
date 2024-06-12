import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { ParserInfer } from 'tsukiko';
import { Symbols } from '../../container';
import { characterSchema } from '../../router/schema';

@injectable()
export class Database {
  private static client?: PrismaClient;

  public readonly character: PrismaClient['character'];

  public readonly characterWithCollection: PrismaClient['characterWithCollection'];

  public readonly collection: PrismaClient['collection'];

  public constructor(@inject(Symbols.DatabaseFactory) prismaFactory: () => PrismaClient) {
    if (!Database.client) Database.client = prismaFactory();
    const { character, characterWithCollection, collection } = Database.client;
    this.character = character;
    this.characterWithCollection = characterWithCollection;
    this.collection = collection;
  }

  public characterDataParse(
    data: ReturnType<Database['character']['findFirst']> extends Promise<infer T> ? Exclude<T, null> : never
  ) {
    return {
      ...data,
      alias: data.alias?.split('|'),
      url: data.url?.split('|'),
      images: data.images?.split('|'),
      birthday: data.birthday ? data.birthday.toISOString() : undefined,
      tags: data.tags?.split('|')
    };
  }

  public characterDataStringify(data: ParserInfer<typeof characterSchema>) {
    return {
      ...data,
      alias: data.alias?.join('|'),
      url: data.url?.join('|'),
      images: data.images?.join('|'),
      birthday: data.birthday ? new Date(data.birthday) : undefined,
      tags: data.tags?.join('|')
    };
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

export default Database;
