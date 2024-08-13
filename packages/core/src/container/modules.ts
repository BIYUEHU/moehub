import { ContainerModule } from 'inversify'
import { InversifyKoaServer, TYPE, type interfaces } from 'inversify-koa-utils'
import type { MoehubDataSettings } from '@moehub/common'
import { PrismaClient } from '@prisma/client'
import Logging from '@kotori-bot/logger'
import { Symbols } from './symbols'
import { type AdapterClass, Core, Symbols as KotoriSymbols, Service } from '@kotori-bot/core'
import CmdAdapter, { config as cmdConfig } from '@kotori-bot/kotori-plugin-adapter-cmd'
import Database from '../utils/db'
import Bot from '../utils/bot'
import Auth from '../utils/auth'
import Logger from '../utils/logger'
import CharacterController from '../router/controller/character.controller'
import CharacterService from '../router/service/character.service'
import SeriesController from '../router/controller/series.controller'
import SeriesService from '../router/service/series.service'
import TagController from '../router/controller/tag.controller'
import TagService from '../router/service/tag.service'
import CollectionService from '../router/service/collection.service'
import CollectionController from '../router/controller/collection.controller'
import SettingsController from '../router/controller/settings.controller'
import SettingsService from '../router/service/settings.service'

declare module '@kotori-bot/core' {
  interface Context {
    pdb: Service & Database
  }

  interface EventsMapping {
    emailSettingsChange(settings: MoehubDataSettings): void
  }
}

const commonContainerModule = new ContainerModule((bind) => {
  /* Server Module */
  bind(Symbols.ServerFactory).toFactory(
    () =>
      (...args: ConstructorParameters<typeof InversifyKoaServer>) =>
        new InversifyKoaServer(...args)
  )
  /* Bot Module */
  bind(Symbols.BotFactory).toFactory(
    () =>
      (
        kotoriConfig: ConstructorParameters<typeof Core>[0],
        pdb: Database,
        botConfig: ConstructorParameters<typeof CmdAdapter>[1],
        identity: string
      ) => {
        const kotori = new Core(kotoriConfig)
        kotori[KotoriSymbols.adapter].set('cmd', [CmdAdapter as unknown as AdapterClass, cmdConfig])

        /* Construct kotori service by Proxy and bind Prisma database to Kotori instance */
        kotori.service(
          'pdb',
          new Proxy(new (class extends Service {})(kotori, {}, 'pdb'), {
            get: (target, prop, receiver) => {
              if (!(prop in pdb)) return Reflect.get(target, prop, receiver)
              const value = pdb[prop as keyof Database]
              return typeof value === 'function' ? value.bind(pdb) : value
            }
          })
        )
        kotori.inject('pdb')

        const bot = new CmdAdapter(kotori, botConfig, identity)
        bot.start()

        return kotori
      }
  )
  bind(Symbols.Bot).to(Bot)
  /* Database Module */
  bind(Symbols.DatabaseFactory).toFactory(() => () => new PrismaClient())
  bind(Symbols.Database).to(Database)
  /*  Auth Module */
  bind(Symbols.Auth).to(Auth)
  /* Logger Module */
  bind(Symbols.LoggerFactory).toFactory(
    () =>
      (...args: ConstructorParameters<typeof Logging>) =>
        new Logging(...args)
  )
  bind(Symbols.Logger).to(Logger)
})

const routerContainerModule = new ContainerModule((bind) => {
  /* Character Router */
  bind<interfaces.Controller>(TYPE.Controller).to(CharacterController).whenTargetNamed(Symbols.CharacterController)
  bind(Symbols.CharacterService).to(CharacterService)
  /* Series Router */
  bind<interfaces.Controller>(TYPE.Controller).to(SeriesController).whenTargetNamed(Symbols.SeriesController)
  bind(Symbols.SeriesService).to(SeriesService)
  /* Tag Router */
  bind<interfaces.Controller>(TYPE.Controller).to(TagController).whenTargetNamed(Symbols.TagController)
  bind(Symbols.TagService).to(TagService)
  /* Collection Router */
  bind<interfaces.Controller>(TYPE.Controller).to(CollectionController).whenTargetNamed(Symbols.CollectionController)
  bind(Symbols.CollectionService).to(CollectionService)
  /* Settings Router */
  bind<interfaces.Controller>(TYPE.Controller).to(SettingsController).whenTargetNamed(Symbols.SettingsController)
  bind(Symbols.SettingsService).to(SettingsService)
})

export default [routerContainerModule, commonContainerModule]
