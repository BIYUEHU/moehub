import { ContainerModule } from 'inversify';
import { InversifyKoaServer, TYPE, interfaces } from 'inversify-koa-utils';
import { PrismaClient } from '@prisma/client';
import Logging from '@kotori-bot/logger';
import { Symbols } from './symbols';
import database from '../utils/db';
import CharacterController from '../router/controller/character.controller';
import CharacterService from '../router/service/character.service';
import Logger from '../utils/logger';

const commonContainerModule = new ContainerModule((bind) => {
  /* Server Module */
  bind(Symbols.ServerFactory).toFactory(
    () =>
      (...args: ConstructorParameters<typeof InversifyKoaServer>) =>
        new InversifyKoaServer(...args)
  );
  /* Database Module */
  bind(Symbols.DatabaseFactory).toFactory(() => () => new PrismaClient());
  bind(Symbols.Database).to(database);
  /* Logger Module */
  bind(Symbols.LoggerFactory).toFactory(
    () =>
      (...args: ConstructorParameters<typeof Logging>) =>
        new Logging(...args)
  );
  bind(Symbols.Logger).to(Logger);
});

const routerContainerModule = new ContainerModule((bind) => {
  /* Character Router */
  bind<interfaces.Controller>(TYPE.Controller).to(CharacterController).whenTargetNamed(Symbols.CharacterController);
  bind(Symbols.CharacterService).to(CharacterService);
});

export default [routerContainerModule, commonContainerModule];
