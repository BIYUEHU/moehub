import 'reflect-metadata'
import type Koa from 'koa'
// import bodyParser from 'koa-bodyparser'
import { inject, injectable } from 'inversify'
import type { InversifyKoaServer } from 'inversify-koa-utils'
import { TsuError } from '../../../common/src'
import container, { Symbols } from '../container'
import type Bot from '../utils/bot'
import type Auth from '../utils/auth'
import type Logger from '../utils/logger'
import HttpError from './error'
import type SettingsService from '../router/service/settings.service'
import serve from 'koa-static'
import config from '../config'
import koaBody from 'koa-body'

declare module 'koa' {
  interface Context {
    state: {
      user: {
        email: string
      }
    }
  }
}

@injectable()
export class Application {
  private readonly server: InversifyKoaServer

  private initialize() {
    this.server.setConfig((app) => {
      app.use(koaBody())
      app.use(serve(config.public))
      // app.use(bodyParser())
      app.use(container.get<Auth>(Symbols.Auth).init())
      app.use(async (ctx, next) => {
        ctx.accepts('application/json, multipart/form-data')
        ctx.set('Access-Control-Allow-Methods', '*')
        ctx.set('Access-Control-Allow-Origin', '*')
        ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-requested-with')
        ctx.set('Access-Control-Max-Age', '86400')

        const { method, url, body } = ctx.request
        // console.log(ctx.request)
        if (method === 'OPTIONS') {
          ctx.status = 204
          return
        }

        this.logger.label(method.toUpperCase()).record(url, /* headers, */ JSON.stringify(body))
        try {
          await next()
        } catch (err) {
          if (err instanceof HttpError) {
            ctx.status = err.status
            ctx.body = err.message
          } else if (err instanceof TsuError) {
            ctx.status = 400
            ctx.body = err.message
          } else {
            ctx.status = 500
            ctx.body = 'Internal Server Error'
          }
          app.emit('error', err)
        }

        if (ctx.status === 200) {
          ctx.body = { data: ctx.body }
        } else if ([201, 204].includes(ctx.status)) {
          ctx.body = {}
        } else if (ctx.body) {
          ctx.body = { code: ctx.status, error: ctx.body }
          ctx.state
        }
        if (ctx.body) ctx.body = { code: ctx.status, ...ctx.body }
      })

      app.on('error', (err) => {
        this.logger.error(err)
      })
    })
  }

  public readonly logger: Logger

  public readonly instance: Koa

  public readonly bot: Bot

  public readonly listen: Koa['listen']

  public constructor(
    @inject(Symbols.ServerFactory)
    serverFactory: (...args: ConstructorParameters<typeof InversifyKoaServer>) => InversifyKoaServer,
    @inject(Symbols.Bot) bot: Bot,
    @inject(Symbols.Logger) logger: Logger,
    @inject(Symbols.SettingsService) settingsService: SettingsService
  ) {
    this.server = serverFactory(container, undefined, { rootPath: '/api' })
    this.bot = bot
    this.logger = logger

    this.initialize()
    this.instance = this.server.build()
    this.listen = this.instance.listen.bind(this.instance)
    ;(async () => {
      bot.ctx.emit('emailSettingsChange', await settingsService.get(true))
    })()
  }
}

export function createApplication() {
  if (!container.isBound(Symbols.Application)) container.bind(Symbols.Application).to(Application)
  return container.get<Application>(Symbols.Application)
}

export default createApplication
