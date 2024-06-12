import { Response } from 'koa';
import { controller, httpGet, interfaces, response } from 'inversify-koa-utils';
import { inject, injectable } from 'inversify';
import { Symbols } from '../../container';
import SeriesService from '../service/series.service';

@controller('/series')
@injectable()
class SeriesController implements interfaces.Controller {
  public constructor(@inject(Symbols.SeriesService) private readonly service: SeriesService) {}

  @httpGet('/')
  async getAll(@response() res: Response) {
    res.body = await this.service.getAll();
  }
}

export default SeriesController;
