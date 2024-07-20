import type { Response } from 'koa'
import { controller, httpGet, type interfaces, response, httpPut, requestBody, httpPost } from 'inversify-koa-utils'
import { inject, injectable } from 'inversify'
import { Symbols } from '../../container'
import type SettingsService from '../service/settings.service'
import { UpdateLoginSchema, loginSchema, settingsSchema } from '@moehub/common'
import Auth from '../../utils/auth'
import type { Context } from 'koa'
import Logger from '@kotori-bot/logger'

@controller('/settings')
@injectable()
class SettingsController implements interfaces.Controller {
  public constructor(@inject(Symbols.SettingsService) private readonly service: SettingsService) {}

  @httpGet('/')
  public async get(ctx: Context, nextFn: () => Promise<unknown>) {
    await Auth.middleware()(ctx, nextFn)
    ctx.body = await this.service.get(ctx.status !== 401)
    ctx.response.status = 200
  }

  @httpPut('/', Auth.middleware())
  public async put(@requestBody() body: unknown, @response() res: Response) {
    const data = settingsSchema.parse(body)
    await this.service.update(data)
    res.status = 204
  }

  @httpPost('/login')
  public async loginPost(@requestBody() body: unknown, @response() res: Response) {
    const data = loginSchema.parse(body)
    res.body = await this.service.login(data)
  }

  @httpPut('/login', Auth.middleware())
  public async loginPut(ctx: Context) {
    const data = UpdateLoginSchema.parse(ctx.request.body)
    await this.service.updateLogin(data, ctx.state.user.email)
    ctx.response.status = 204
  }
}

export default SettingsController
