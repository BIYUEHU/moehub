import type { Response } from 'koa'
import { controller, httpGet, type interfaces, response, httpPut, requestBody } from 'inversify-koa-utils'
import { inject, injectable } from 'inversify'
import { Symbols } from '../../container'
import type SettingsService from '../service/settings.service'
import { settingsSchema } from '@moehub/common'

@controller('/settings')
@injectable()
class SettingsController implements interfaces.Controller {
  public constructor(@inject(Symbols.SettingsService) private readonly service: SettingsService) {}

  @httpGet('/')
  async get(@response() res: Response) {
    res.body = await this.service.get()
  }

  @httpPut('/')
  async put(@requestBody() body: unknown, @response() res: Response) {
    const data = settingsSchema.parse(body)
    await this.service.update(data)
    res.status = 204
  }
}

export default SettingsController
