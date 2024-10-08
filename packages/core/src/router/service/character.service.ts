import { inject, injectable } from 'inversify'
import { Symbols } from '../../container'
import type Database from '../../utils/db'
import type { MoehubDataCharacter, MoehubDataCharacterSubmit } from '../../../../common/src'
import HttpError from '../../app/error'

@injectable()
export class CharacterService {
  // Everything is for typescript's type infer
  private getOrigin(id: number) {
    return this.db.character.findFirst({
      where: { id },
      include: { collections: true }
    })
  }

  public async getDataHandle(
    data: ReturnType<CharacterService['getOrigin']> extends Promise<infer T> ? T : never
  ): Promise<MoehubDataCharacter | null> {
    if (!data) return null
    return {
      ...this.db.characterDataParse(data),
      collections: (
        await Promise.all(data.collections.map((c) => this.db.collection.findFirst({ where: { id: c.collectionId } })))
      ).filter((c) => c !== null)
    }
  }

  public constructor(@inject(Symbols.Database) private readonly db: Database) {}

  public async get(id: number): Promise<MoehubDataCharacter> {
    const result = await this.getDataHandle(await this.getOrigin(id))
    if (!result) throw new HttpError('Character not found', 404)
    return result
  }

  public async getAll(): Promise<MoehubDataCharacter[]> {
    // Get all characters with its collections
    return (
      await Promise.all(
        (await this.db.character.findMany({ include: { collections: true } }))?.map((data) => this.getDataHandle(data))
      )
    ).filter((data) => data !== null)
  }

  public async create(data: MoehubDataCharacterSubmit) {
    /* Check if character with same name already exists */
    if (await this.db.character.findFirst({ where: { name: data.name } }))
      throw new HttpError('Character with same name already exists')

    /* Check if collections exists */
    const collectionsId = data.collections
      ? await Promise.all(
          data.collections.map(async (collection) => {
            const result = await this.db.collection.findFirst({ where: { id: collection } })
            if (!result) throw new HttpError(`Collection with id ${collection} does not exist`)
            return result.id
          })
        )
      : []

    /* Create character */
    const { id: characterId } = await this.db.character.create({
      data: { ...this.db.characterDataStringify(data), collections: undefined }
    })

    /* Connect character with collections */
    for (const collectionId of collectionsId) {
      this.db.characterWithCollection.create({ data: { collectionId, characterId } })
    }

    return 201
  }

  public async update(id: number, data: MoehubDataCharacterSubmit) {
    /* Check if character exists */
    if (!(await this.db.character.findFirst({ where: { id } }))) throw new HttpError('Character not found', 404)

    /* Check if character with same name already exists */
    if (await this.db.character.findFirst({ where: { name: data.name, id: { not: id } } }))
      throw new HttpError('Character with same name already exists')

    // biome-ignore lint:
    delete data.collections
    await this.db.character.update({
      where: { id },
      data: {
        ...(this.db.characterDataStringify(data) as Omit<ReturnType<Database['characterDataStringify']>, 'collections'>)
      }
    })
  }

  public async remove(id: number) {
    if (!(await this.db.character.findFirst({ where: { id } }))) throw new HttpError('Character not found', 404)
    await this.db.character.delete({ where: { id } })
  }
}

export default CharacterService
