import { ContainerModule } from 'inversify'
import { InversifyKoaServer, TYPE, type interfaces } from 'inversify-koa-utils'
import { PrismaClient } from '@prisma/client'
import Logging from '@kotori-bot/logger'
import { Symbols } from './symbols'
import database from '../utils/db'
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

const commonContainerModule = new ContainerModule((bind) => {
  /* Server Module */
  bind(Symbols.ServerFactory).toFactory(
    () =>
      (...args: ConstructorParameters<typeof InversifyKoaServer>) =>
        new InversifyKoaServer(...args)
  )
  /* Database Module */
  bind(Symbols.DatabaseFactory).toFactory(() => () => new PrismaClient())
  bind(Symbols.Database).to(database)
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
