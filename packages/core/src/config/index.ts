import { LoggerLevel } from '@kotori-bot/logger'
import { resolve } from 'node:path'
import dotenv from 'dotenv'
import { existsSync, mkdirSync } from 'node:fs'

dotenv.config()

const PUBLIC = resolve(__dirname, '../../public')

const config = {
  port: Number(process.env.PORT) ?? 5000,
  logLevel: Number(process.env.LOG_LEVEL) ?? LoggerLevel.DEBUG,
  public: PUBLIC,
  uploadDir: resolve(PUBLIC, 'imgs')
}

export default config

if (!existsSync(config.uploadDir)) {
  mkdirSync(config.uploadDir, { recursive: true })
}
