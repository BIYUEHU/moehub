import { inject, injectable } from 'inversify';
import { Symbols } from '../../container';
import Database from '../../utils/db';
import { collectionSchema } from '../schema';
import HttpError from '../../app/error';

@injectable()
export class CollectionService {
  // Everything is for typescript's type infer
  private getOrigin(id: number) {
    return this.db.collection.findFirst({
      where: { id },
      include: { characters: true }
    });
  }

  public async getDataHandle(data: ReturnType<CollectionService['getOrigin']> extends Promise<infer T> ? T : never) {
    if (!data) return null;
    return {
      ...data,
      characters: (
        await Promise.all(
          data.characters.map(async (c) =>
            this.db.characterDataParse((await this.db.character.findFirst({ where: { id: c.characterId } }))!)
          )
        )
      ).filter((c) => c)
    };
  }

  public constructor(@inject(Symbols.Database) private readonly db: Database) {}

  public async get(id: number) {
    const result = await this.getDataHandle(await this.getOrigin(id));
    if (!result) throw new HttpError('Collection not found', 404);
    return result;
  }

  public async getAll() {
    // Get all collections with its collections
    return Promise.all(
      (await this.db.collection.findMany({ include: { characters: true } }))?.map((data) => this.getDataHandle(data))
    );
  }

  public async create(body: unknown) {
    const data = collectionSchema.parse(body);

    /* Check if collection with same name already exists */
    if (await this.db.collection.findFirst({ where: { name: data.name } }))
      throw new HttpError('Collection with same name already exists');

    /* Create collection */
    await this.db.collection.create({ data: { ...data, characters: undefined } });

    return 201;
  }

  public async update(id: number, body: unknown) {
    const data = collectionSchema.parse(body);

    /* Check if collection exists */
    if (!(await this.db.collection.findFirst({ where: { id } }))) throw new HttpError('Collection not found', 404);

    /* Check if collection with same name already exists */
    if (await this.db.collection.findFirst({ where: { name: data.name, id: { not: id } } }))
      throw new HttpError('Collection with same name already exists');

    /* Update characters connected to collection */
    if (data.characters) {
      this.db.characterWithCollection.deleteMany({ where: { collectionId: id } });
      data.characters.forEach(async (characterId) => {
        const character = await this.db.character.findFirst({ where: { id: characterId } });
        if (!character) return;
        await this.db.characterWithCollection.create({ data: { characterId, collectionId: id } });
        this.db.collection.update({
          where: { id },
          data: {}
        });
      });
    }

    /* Update collection */
    delete data.characters;
    await this.db.collection.update({ where: { id }, data: data as Omit<typeof data, 'characters'> });
  }

  public async remove(id: number) {
    if (!(await this.db.collection.findFirst({ where: { id } }))) throw new HttpError('Collection not found', 404);
    await this.db.collection.delete({ where: { id } });
  }
}

export default CollectionService;
