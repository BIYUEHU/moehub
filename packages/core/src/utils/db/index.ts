import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { Symbols } from '../../container';

@injectable()
export class Database {
  public readonly client: PrismaClient;

  public readonly character: PrismaClient['character'];

  public readonly characterWithCollection: PrismaClient['characterWithCollection'];

  public readonly characterWithTag: PrismaClient['characterWithTag'];

  public readonly collection: PrismaClient['collection'];

  public readonly tag: PrismaClient['tag'];

  public readonly actor: PrismaClient['actor'];

  public readonly series: PrismaClient['series'];

  public constructor(@inject(Symbols.DatabaseFactory) prismaFactory: () => PrismaClient) {
    this.client = prismaFactory();
    const { character, characterWithCollection, characterWithTag, collection, tag, actor, series } = this.client;
    this.character = character;
    this.characterWithCollection = characterWithCollection;
    this.characterWithTag = characterWithTag;
    this.collection = collection;
    this.tag = tag;
    this.actor = actor;
    this.series = series;
  }
}

export default Database;
