import { inject, injectable } from 'inversify';
import { Symbols } from '../../container';
import CharacterService from './character.service';

@injectable()
export class SeriesService {
  private readonly counter: Map<string, number> = new Map();

  private setCount(c: { series: string; seriesGenre: string }) {
    const key = `${c.series}-${c.seriesGenre}`;
    this.counter.set(key, (this.counter.get(key) || 0) + 1);
  }

  public constructor(@inject(Symbols.CharacterService) private readonly service: CharacterService) {}

  public async getAll() {
    (await this.service.getAll()).forEach((c) => this.setCount(c!));
    return Array.from(this.counter.entries()).map(([key, characters]) => ({
      name: key.split('-')[0],
      genre: key.split('-')[1],
      characters
    }));
  }
}

export default SeriesService;
