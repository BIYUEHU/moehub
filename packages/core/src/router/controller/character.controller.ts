import { Response } from 'koa';
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
  interfaces,
  requestBody,
  requestParam,
  response
} from 'inversify-koa-utils';
import { inject, injectable } from 'inversify';
import { Symbols } from '../../container';
import CharacterService from '../service/character.service';

@controller('/character')
@injectable()
class CharacterController implements interfaces.Controller {
  public constructor(@inject(Symbols.CharacterService) private readonly service: CharacterService) {}

  @httpGet('/:id')
  async get(@requestParam('id') id: string, @response() res: Response) {
    res.body = await this.service.get(Number(id));
  }

  @httpGet('/')
  async getAll(@response() res: Response) {
    res.body = await this.service.getAll();
  }

  @httpPost('/')
  async post(@requestBody() body: unknown, @response() res: Response) {
    res.status = await this.service.create(body);
  }

  @httpPut('/:id')
  async put(@requestParam('id') id: string, @requestBody() body: unknown, @response() res: Response) {
    await this.service.update(Number(id), body);
    res.status = 204;
  }

  @httpDelete('/:id')
  async delete(@requestParam('id') id: string, @response() res: Response) {
    await this.service.remove(Number(id));
    res.status = 204;
  }
}

export default CharacterController;
