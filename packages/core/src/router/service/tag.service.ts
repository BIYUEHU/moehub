import { inject, injectable } from 'inversify'
import { Symbols } from '../../container'
import type CharacterService from './character.service'
import type { MoehubDataTag } from '@moehub/common'

@injectable()
export class TagService {
  public constructor(@inject(Symbols.CharacterService) private readonly service: CharacterService) {}

  private readonly counter: Map<string, number> = new Map()

  private setCount(tags: string[]) {
    for (const tag of tags) {
      this.counter.set(tag, (this.counter.get(tag) || 0) + 1)
    }
  }

  public async getAll(): Promise<MoehubDataTag[]> {
    for (const c of await this.service.getAll()) {
      if (c?.tags) this.setCount(c.tags)
    }
    return Array.from(this.counter.entries()).map(([name, characters]) => ({ name, characters }))
  }
}

export default TagService
