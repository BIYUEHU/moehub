import { createHash, randomUUID } from 'node:crypto'
import type {
  MoehubDataLogin,
  MoehubDataUpdateLoginSubmit,
  MoehubDataLoginSubmit,
  MoehubDataSettings,
  MoehubDataSettingsSubmit
} from '@moehub/common'
import { inject, injectable } from 'inversify'
import { Symbols } from '../../container'
import type Database from '../../utils/db'
import type Auth from '../../utils/auth'
import type Bot from '../../utils/bot'
import HttpError from '../../app/error'
import { readdirSync } from 'node:fs'
import config from '../../config'
import { extname } from 'node:path'

@injectable()
export class SettingsService {
  private cache?: MoehubDataSettings

  private lastFetchTime?: number

  private readonly cacheDuration = 5 * 60 * 1000

  private isCacheValid() {
    return !!this.cache && !!this.lastFetchTime && Date.now() - this.lastFetchTime < this.cacheDuration
  }

  public encodePassword(password: string, salt = randomUUID().replaceAll('-', '')) {
    return { salt, encode: createHash('sha256').update(`${password}${salt}`).digest('hex') }
  }

  private async getPayload(data: MoehubDataLoginSubmit) {
    const email = (await this.db.settings.findFirst({ where: { key: 'admin_email' } }))?.value
    if (!email || email !== data.email) return null
    const passwordEncode = (await this.db.settings.findFirst({ where: { key: 'admin_password' } }))?.value
    const salt = (await this.db.settings.findFirst({ where: { key: 'admin_salt' } }))?.value
    if (!passwordEncode || !salt || this.encodePassword(data.password, salt).encode !== passwordEncode) return null
    return { email }
  }

  public constructor(
    @inject(Symbols.Bot) private readonly bot: Bot,
    @inject(Symbols.Database) private readonly db: Database,
    @inject(Symbols.Auth) private readonly auth: Auth
  ) {}

  public async get(isVerified: boolean): Promise<MoehubDataSettings> {
    if (this.isCacheValid()) return this.cache as Exclude<typeof this.cache, undefined>

    const handle = (value: string | null) =>
      value ? value.split('|').map((str) => str.split(',').slice(0, 2) as [string, string]) : []

    const result: MoehubDataSettingsSubmit = {}
    for (const { key, value } of await this.db.settings.findMany()) {
      if (['admin_salt', 'admin_password'].includes(key)) continue
      if (
        !isVerified &&
        [
          'admin_email',
          'admin_username',
          'smtp_host',
          'smtp_port',
          'smtp_email',
          'smtp_key',
          'smtp_hours',
          'smtp_target',
          'smtp_template',
          'birthdays'
        ].includes(key)
      )
        continue
      switch (key) {
        case 'birthdays':
          result.birthdays = value === 'on'
          continue
        case 'smtp_port':
          result.smtp_port = Number(value)
          continue
        case 'site_backgrounds':
          result.site_backgrounds = value ? value.split('|') : []
          continue
        case 'home_buttons':
          result.home_buttons = handle(value)
          continue
        case 'home_timeline':
          result.home_timeline = handle(value)
          continue
        case 'smtp_hours':
          result.smtp_hours = Number(value)
          continue
      }
      result[key as 'site_title'] = value ?? ''
    }

    this.cache = result as typeof this.cache
    this.lastFetchTime = Date.now()
    return this.cache as MoehubDataSettings
  }

  public async update(data: MoehubDataSettingsSubmit) {
    if (this.isCacheValid()) {
      this.cache = { ...this.cache, ...data } as MoehubDataSettings
      this.lastFetchTime = Date.now()
    } else {
      this.cache = undefined
      this.lastFetchTime = undefined
    }

    const handleData = {
      ...data,
      birthdays: data.birthdays ? (data.birthdays ? 'on' : 'off') : undefined,
      smtp_port: data.smtp_port ? String(data.smtp_port) : undefined,
      smtp_hours: data.smtp_hours ? String(data.smtp_hours) : undefined,
      site_backgrounds: data.site_backgrounds ? data.site_backgrounds.join('|') : undefined,
      home_buttons: data.home_buttons ? data.home_buttons.map((item) => item.join(',')).join('|') : undefined,
      home_timeline: data.home_timeline ? data.home_timeline.map((item) => item.join(',')).join('|') : undefined
    } as Record<keyof typeof data, string | undefined>

    const tasks: Promise<unknown>[] = []

    for (const key in handleData) {
      if (['admin_salt', 'admin_password'].includes(key)) continue
      if (handleData[key as keyof typeof handleData] === undefined) continue
      const value = handleData[key as keyof typeof handleData] as unknown as string
      tasks.push(this.db.settings.updateMany({ where: { key }, data: { key, value } }))
    }

    await Promise.all(tasks)
    this.bot.ctx.emit('emailSettingsChange', await this.get(true))
  }

  public async login(data: MoehubDataLoginSubmit): Promise<MoehubDataLogin> {
    const payload = await this.getPayload(data)
    if (!payload) throw new HttpError('email or password is incorrect', 401)
    return { token: this.auth.createToken(payload) }
  }

  public async updateLogin(data: MoehubDataUpdateLoginSubmit, email: string) {
    if (!(await this.getPayload({ email, password: data.oldPassword })))
      throw new HttpError('email or password is incorrect', 401)
    const { encode, salt } = this.encodePassword(data.newPassword)
    await Promise.all([
      this.db.settings.updateMany({
        where: { key: 'admin_password' },
        data: { key: 'admin_password', value: encode }
      }),
      this.db.settings.updateMany({
        where: { key: 'admin_salt' },
        data: { key: 'admin_salt', value: salt }
      })
    ])
  }

  public async email(target: string) {
    const { name, romaji, birthday } =
      (await this.db.character.findFirst({ where: { name: target } })) ??
      (await this.db.character.findFirst({ where: { romaji: target } })) ??
      {}
    this.bot.sendMail(
      { name: name ?? '????', romaji: romaji ?? '????', birthday: birthday ?? new Date() },
      await this.get(true)
    )
  }

  public allImages() {
    const files = readdirSync(config.uploadDir)
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp']
    const imageFiles = files.filter((file) => {
      const ext = extname(file).toLowerCase()
      return imageExtensions.includes(ext)
    })
    return imageFiles
  }
}

export default SettingsService
