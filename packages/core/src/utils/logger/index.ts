import Logging, { ConsoleTransport, LoggerLevel } from '@kotori-bot/logger';
import { inject, injectable } from 'inversify';
import { Symbols } from '../../container';

const LoggerConfig = {
  transports: new ConsoleTransport({
    template: '<magentaBright>%time%</magentaBright> %level% (<bold>%pid%</bold>) %labels%: %msg%',
    label: '[<greenBright>%name%</greenBright>]',
    time: 'M/D H:m:s',
    useColor: true,
    levels: {
      FATAL: ['<redBright><bold>FATAL</bold></redBright> ', 'redBright'],
      ERROR: ['<red>ERROR</red>', 'red'],
      WARN: ['<yellow>WARN</yellow>', 'yellowBright'],
      INFO: ['<blueBright>INFO</blueBright>'],
      RECORD: ['<cyan>LOG</cyan>'],
      DEBUG: ['<magenta>DEBUG</magenta>', 'magentaBright'],
      TRACE: ['<gray>TRACE</gray>', 'gray']
    },
    indent: 2
  }),
  /* TODO: set logger level from env */
  level: LoggerLevel.DEBUG
};

@injectable()
export class Logger {
  public readonly logging: Logging;

  public readonly error: Logging['error'];

  public readonly info: Logging['info'];

  public readonly debug: Logging['debug'];

  public readonly warn: Logging['warn'];

  public readonly trace: Logging['trace'];

  public readonly fatal: Logging['fatal'];

  public readonly record: Logging['record'];

  public readonly label: Logging['label'];

  constructor(
    @inject(Symbols.LoggerFactory) loggerFactory: (...args: ConstructorParameters<typeof Logging>) => Logging
  ) {
    this.logging = loggerFactory(LoggerConfig);
    const { error, info, debug, warn, trace, fatal, record, label } = this.logging;
    this.error = error.bind(this.logging);
    this.info = info.bind(this.logging);
    this.debug = debug.bind(this.logging);
    this.warn = warn.bind(this.logging);
    this.trace = trace.bind(this.logging);
    this.fatal = fatal.bind(this.logging);
    this.record = record.bind(this.logging);
    this.label = label.bind(this.logging);
  }
}

export default Logger;
