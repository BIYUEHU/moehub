import { LoggerLevel } from '@kotori-bot/logger'
import { resolve } from 'node:path'
import dotenv from 'dotenv'
import { existsSync, mkdirSync } from 'node:fs'

const isExists = existsSync(resolve(__dirname, '../../public'))

// dotenv.config({'DOTENV_KEY': ''})
dotenv.config({ path: resolve(isExists ? '../../' : '../', '.env.development') })

const PUBLIC = resolve(__dirname, isExists ? '../../public' : '../public')
const PORT = Number(process.env.PORT)

const config = {
  port: PORT && !Number.isNaN(PORT) ? PORT : 50200,
  logLevel: Number(process.env.LOG_LEVEL) ?? LoggerLevel.DEBUG,
  public: PUBLIC,
  uploadDir: resolve(PUBLIC, 'imgs')
}

export default config

if (!existsSync(config.uploadDir)) {
  mkdirSync(config.uploadDir, { recursive: true })
}
