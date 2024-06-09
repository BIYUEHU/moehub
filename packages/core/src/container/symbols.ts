export const Symbols = {
  Application: Symbol.for('Application'),
  /* Common Modules */
  ServerFactory: Symbol.for('Factory<Server>'),
  DatabaseFactory: Symbol.for('Factory<Database>'),
  Database: Symbol.for('Database'),
  LoggerFactory: Symbol.for('Factory<Logger>'),
  Logger: Symbol.for('Logger'),
  AuthFactory: Symbol.for('Factory<Auth>'),
  Auth: Symbol.for('Auth'),
  /* Router Modules */
  CharacterController: 'CharacterController',
  CharacterService: Symbol.for('CharacterService')
};

export default Symbols;
