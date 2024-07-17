import type { Response } from 'koa'
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
  type interfaces,
  requestBody,
  requestParam,
  response
} from 'inversify-koa-utils'
import { inject, injectable } from 'inversify'
import { Symbols } from '../../container'
import type CharacterService from '../service/character.service'
import { characterSchema } from '@moehub/common'

@controller('/character')
@injectable()
class CharacterController implements interfaces.Controller {
  public constructor(@inject(Symbols.CharacterService) private readonly service: CharacterService) {}

  @httpGet('/:id')
  async get(@requestParam('id') id: string, @response() res: Response) {
    res.body = await this.service.get(Number(id))
  }

  @httpGet('/')
  async getAll(@response() res: Response) {
    res.body = await this.service.getAll()
  }

  @httpPost('/')
  async post(@requestBody() body: unknown, @response() res: Response) {
    const data = characterSchema.parse(body)
    res.status = await this.service.create(data)
  }

  @httpPut('/:id')
  async put(@requestParam('id') id: string, @requestBody() body: unknown, @response() res: Response) {
    const data = characterSchema.parse(body)
    await this.service.update(Number(id), data)
    res.status = 204
  }

  @httpDelete('/:id')
  async delete(@requestParam('id') id: string, @response() res: Response) {
    await this.service.remove(Number(id))
    res.status = 204
  }
}

export default CharacterController
