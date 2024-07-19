import 'reflect-metadata'
import type Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { inject, injectable } from 'inversify'
import type { InversifyKoaServer } from 'inversify-koa-utils'
import { TsuError } from '@moehub/common'
import container, { Symbols } from '../container'
import type Bot from '../utils/bot'
import type Logger from '../utils/logger'
import HttpError from './error'

@injectable()
export class Application {
  private readonly server: InversifyKoaServer

  private initialize() {
    this.server.setConfig((app) => {
      app.use(bodyParser())
      app.use(async (ctx, next) => {
        ctx.accepts('application/json')
        ctx.set('Access-Control-Allow-Methods', '*')
        ctx.set('Access-Control-Allow-Origin', '*')
        ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        const { method, url, body } = ctx.request
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
    @inject(Symbols.Logger) logger: Logger
  ) {
    this.server = serverFactory(container, undefined, { rootPath: '/api' })
    this.bot = bot
    this.logger = logger

    this.initialize()
    this.instance = this.server.build()
    this.listen = this.instance.listen.bind(this.instance)
  }
}

export function createApplication() {
  if (!container.isBound(Symbols.Application)) container.bind(Symbols.Application).to(Application)
  return container.get<Application>(Symbols.Application)
}

export default createApplication
