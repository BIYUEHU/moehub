import { inject, injectable } from 'inversify';
import { Symbols } from '../../container';
import CharacterService from './character.service';

@injectable()
export class TagService {
  public constructor(@inject(Symbols.CharacterService) private readonly service: CharacterService) {}

  private readonly counter: Map<string, number> = new Map();

  private setCount(tag: string[]) {
    tag.forEach((tag) => this.counter.set(tag, (this.counter.get(tag) || 0) + 1));
  }

  public async getAll() {
    (await this.service.getAll()).forEach((c) => c?.tags && this.setCount(c.tags));
    return Array.from(this.counter.entries()).map(([name, characters]) => ({ name, characters }));
  }
}

export default TagService;
