import 'reflect-metadata';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { inject, injectable } from 'inversify';
import { InversifyKoaServer } from 'inversify-koa-utils';
import { TsuError } from 'tsukiko';
import container, { Symbols } from '../container';
import Logger from '../utils/logger';
import HttpError from './error';

@injectable()
export class Application {
  private readonly server: InversifyKoaServer;

  private initialize() {
    this.server.setConfig((app) => {
      app.use(bodyParser());
      app.use(async (ctx, next) => {
        const { method, url, body } = ctx.request;
        this.logger.label(method.toUpperCase()).record(url, /* headers, */ JSON.stringify(body));
        try {
          await next();
        } catch (err) {
          if (err instanceof HttpError) {
            ctx.status = err.status;
            ctx.body = { message: err.message };
          } else if (err instanceof TsuError) {
            ctx.status = 400;
            ctx.body = { message: err.message };
          } else {
            ctx.status = 500;
            ctx.body = { message: 'Internal Server Error' };
          }
          app.emit('error', err);
        }

        // if (!ctx.body) ctx.status = ctx.method.toLocaleUpperCase() === 'POST' ? 201 : 204;
      });
      app.on('error', (err) => {
        this.logger.error(err);
      });
    });
  }

  public readonly logger: Logger;

  public readonly instance: Koa;

  public readonly listen: Koa['listen'];

  public constructor(
    @inject(Symbols.ServerFactory)
    serverFactory: (...args: ConstructorParameters<typeof InversifyKoaServer>) => InversifyKoaServer,
    @inject(Symbols.Logger) logger: Logger
  ) {
    this.server = serverFactory(container, undefined, { rootPath: '/api' });
    this.logger = logger;

    this.initialize();
    this.instance = this.server.build();
    this.listen = this.instance.listen.bind(this.instance);
  }
}

export function createApplication() {
  if (!container.isBound(Symbols.Application)) container.bind(Symbols.Application).to(Application);
  return container.get<Application>(Symbols.Application);
}

export default createApplication;
