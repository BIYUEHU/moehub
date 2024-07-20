import type { Response } from 'koa'
import { controller, httpGet, type interfaces, response } from 'inversify-koa-utils'
import { inject, injectable } from 'inversify'
import { Symbols } from '../../container'
import type TagService from '../service/tag.service'

@controller('/tag')
@injectable()
class TagController implements interfaces.Controller {
  public constructor(@inject(Symbols.TagService) private readonly service: TagService) {}

  @httpGet('/')
  public async getAll(@response() res: Response) {
    res.body = await this.service.getAll()
  }
}

export default TagController
