import { LoggerLevel } from '@kotori-bot/logger'
import dotenv from 'dotenv'

dotenv.config()

export default {
  port: Number(process.env.PORT) ?? 5000,
  logLevel: Number(process.env.LOG_LEVEL) ?? LoggerLevel.DEBUG
}
