import { inject, injectable } from 'inversify';
import { Symbols } from '../../container';
import Database from '../../utils/db';
import { characterSchema } from '../schema';
import HttpError from '../../app/error';

@injectable()
export class CharacterService {
  // Everything is for typescript's type infer
  private getOrigin(id: number) {
    return this.db.character.findFirst({
      where: { id },
      include: { collections: true, tags: true, series: true, actor: true }
    });
  }

  private async getDataHandle(data: ReturnType<CharacterService['getOrigin']> extends Promise<infer T> ? T : never) {
    if (!data) return null;
    return {
      id: data.id,
      name: data.name,
      romaji: data.romaji,
      gender: data.gender,
      description: data.description,
      comment: data.comment,
      hitokoto: data.hitokoto,
      hairColor: data.hairColor,
      eyeColor: data.eyeColor,
      bloodType: data.bloodType,
      height: data.height,
      bust: data.bust,
      waist: data.waist,
      hip: data.hip,
      alias: data.alias?.split('|'),
      url: data.url?.split('|'),
      images: data.images?.split('|'),
      birthday: data.birthday ? data.birthday.toISOString() : undefined,
      series: data.series,
      actor: data.actor,
      collections: (
        await Promise.all(
          data.collections.map((collection) => this.db.collection.findFirst({ where: { id: collection.collectionId } }))
        )
      ).filter((collection) => collection),
      tags: (await Promise.all(data.tags.map((tag) => this.db.tag.findFirst({ where: { id: tag.tagId } })!))).filter(
        (tag) => tag
      )
    };
  }

  public constructor(@inject(Symbols.Database) private readonly db: Database) {}

  public async get(id: number) {
    return this.getDataHandle(await this.getOrigin(id));
  }

  public async getAll() {
    // Get all characters with their collections and tags
    return Promise.all(
      (
        await this.db.character.findMany({
          include: {
            collections: true,
            tags: true,
            series: true,
            actor: true
          }
        })
      )?.map((data) => this.getDataHandle(data))
    );
  }

  public async create(body: unknown) {
    const data = characterSchema.parse(body);

    /* Check if character with same name already exists */
    if (await this.db.character.findFirst({ where: { name: data.name } }))
      throw new HttpError('Character with same name already exists');

    /* Check if collections exists */
    const collectionsId = await Promise.all(
      data.collections.map(async (collection) => {
        const result = await this.db.collection.findFirst({ where: { id: collection } });
        if (!result) throw new HttpError(`Collection with id ${collection} does not exist`);
        return result.id;
      })
    );

    /* Check if series exists */
    const seriesId = data.series ? (await this.db.series.findFirst({ where: { id: data.series } }))?.id : undefined;
    if (data.series && !seriesId) throw new HttpError(`Series with id ${data.series} does not exist`);

    /* Get actor id and auto create */
    const actorId = data.actor
      ? (await this.db.actor.findFirst({ where: { name: data.actor } }))?.id ??
        (await this.db.actor.create({ data: { name: data.actor } })).id
      : undefined;

    /* Create character */
    const { id: characterId } = await this.db.character.create({
      data: {
        name: data.name,
        romaji: data.romaji,
        gender: data.gender,
        description: data.description,
        comment: data.comment,
        hitokoto: data.hitokoto,
        hairColor: data.hairColor,
        eyeColor: data.eyeColor,
        bloodType: data.bloodType,
        height: data.height,
        bust: data.bust,
        waist: data.waist,
        hip: data.hip,
        alias: data.alias?.join('|'),
        url: data.url?.join('|'),
        images: data.images?.join('|'),
        birthday: data.birthday ? new Date(data.birthday) : undefined,
        series: seriesId ? { connect: { id: seriesId } } : undefined,
        actor: actorId ? { connect: { id: actorId } } : undefined
      }
    });

    /* Connect character with collections */
    collectionsId.forEach((collectionId) =>
      this.db.characterWithCollection.create({ data: { collectionId, characterId } })
    );

    /* Auto create tags and connect character with series */
    data.tags.forEach(async (name) => {
      const tagId =
        (await this.db.tag.findFirst({ where: { name } }))?.id ?? (await this.db.tag.create({ data: { name } })).id;
      this.db.characterWithTag.create({ data: { characterId, tagId: await tagId } });
    });

    return 201;
  }
}

export default CharacterService;
