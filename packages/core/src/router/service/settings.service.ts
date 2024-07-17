import { inject, injectable } from 'inversify'
import { Symbols } from '../../container'
import type Database from '../../utils/db'
import type { MoehubDataSettings, MoehubDataSettingsSubmit } from '@moehub/common'

@injectable()
export class SettingsService {
  private cache?: MoehubDataSettings

  private lastFetchTime?: number

  private readonly cacheDuration = 5 * 60 * 1000

  private isCacheValid() {
    return !!this.cache && !!this.lastFetchTime && Date.now() - this.lastFetchTime < this.cacheDuration
  }

  public constructor(@inject(Symbols.Database) private readonly db: Database) {}

  public async get(): Promise<MoehubDataSettings> {
    if (this.isCacheValid()) return this.cache as Exclude<typeof this.cache, undefined>

    const result: MoehubDataSettingsSubmit = {}
    for (const { key, value } of await this.db.settings.findMany()) {
      if (key === 'birthdays') {
        result.birthdays = value === 'on'
        continue
      }
      if (key === 'smtp_port') {
        result.smtp_port = Number(value)
        continue
      }
      if (key === 'site_backgrounds') {
        result.site_backgrounds = value.split('|')
        continue
      }
      result[key as Exclude<keyof MoehubDataSettings, 'birthdays' | 'smtp_port' | 'site_backgrounds'>] = value
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
      site_backgrounds: data.site_backgrounds ? data.site_backgrounds.join('|') : undefined
    } as Record<keyof typeof data, string | undefined>

    for (const key in data) {
      if (data[key as keyof typeof handleData] === undefined) continue

      const id = (
        await this.db.settings.findFirst({
          where: {
            key
          }
        })
      )?.id
      if (!id) continue

      const value = data[key as keyof typeof handleData] as unknown as string
      this.db.settings.update({ where: { id }, data: { key, value } })
    }
  }
}

export default SettingsService
