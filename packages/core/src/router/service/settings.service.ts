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

    const handle = (value: string | null) =>
      value ? value.split('|').map((str) => str.split(',').slice(0, 2) as [string, string]) : []

    const result: MoehubDataSettingsSubmit = {}
    for (const { key, value } of await this.db.settings.findMany()) {
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
      }
      result[
        key as Exclude<
          keyof MoehubDataSettings,
          'birthdays' | 'smtp_port' | 'site_backgrounds' | 'home_buttons' | 'home_timeline'
        >
      ] = value ?? ''
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
      site_backgrounds: data.site_backgrounds ? data.site_backgrounds.join('|') : undefined,
      home_buttons: data.home_buttons ? data.home_buttons.map((item) => item.join(',')).join('|') : undefined,
      home_timeline: data.home_timeline ? data.home_timeline.map((item) => item.join(',')).join('|') : undefined
    } as Record<keyof typeof data, string | undefined>

    for (const key in handleData) {
      if (handleData[key as keyof typeof handleData] === undefined) continue
      const value = handleData[key as keyof typeof handleData] as unknown as string
      await this.db.settings.updateMany({ where: { key }, data: { key, value } })
    }
  }
}

export default SettingsService
