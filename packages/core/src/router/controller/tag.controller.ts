import { Response } from 'koa';
import { controller, httpGet, interfaces, response } from 'inversify-koa-utils';
import { inject, injectable } from 'inversify';
import { Symbols } from '../../container';
import TagService from '../service/tag.service';

@controller('/tag')
@injectable()
class TagController implements interfaces.Controller {
  public constructor(@inject(Symbols.TagService) private readonly service: TagService) {}

  @httpGet('/')
  async getAll(@response() res: Response) {
    res.body = await this.service.getAll();
  }
}

export default TagController;
