import { inject, injectable } from 'inversify'
import type AdapterCmd from '@kotori-bot/kotori-plugin-adapter-cmd'
import * as Helper from '@kotori-bot/kotori-plugin-helper'
import { type Core, Symbols as KotoriSymbols, type ModuleExport } from '@kotori-bot/core'
import container, { Symbols } from '../../container'
import type Database from '../db'
import type SettingsService from '../../router/service/settings.service'
import type { MoehubDataSettings } from '@moehub/common'
import { createTransport } from 'nodemailer'
import type Logger from '../logger'
import { resolve } from 'node:path'

interface SendMailCharacterData {
  name: string
  romaji: string
  birthday: Date
}

/* Define config */
const commonConfig = {
  lang: 'zh_CN' as const,
  commandPrefix: ''
}

const kotoriConfig = {
  global: {
    ...commonConfig,
    dirs: [],
    port: 0
  },
  adapter: {},
  plugin: {}
}

const botConfig = {
  ...commonConfig,
  extends: 'cmd',
  'self-nickname': '',
  master: '0',
  'self-id': '0',
  nickname: ''
}

@injectable()
export class Bot {
  private static ctx: Core

  private taskDispose?: () => void

  public ctx: Core

  public constructor(
    @inject(Symbols.Database) pdb: Database,
    @inject(Symbols.BotFactory) botFactory: (
      kotoriConfig: ConstructorParameters<typeof Core>[0],
      pdb: Database,
      botConfig: ConstructorParameters<typeof AdapterCmd>[1],
      identity: string
    ) => Core,
    @inject(Symbols.Logger) private readonly logger: Logger
  ) {
    if (Bot.ctx) {
      this.ctx = Bot.ctx
    } else {
      this.ctx = botFactory(kotoriConfig, pdb, botConfig, 'line')
      this.register()
      Bot.ctx = this.ctx
    }
  }

  private async register() {
    this.ctx.load({
      config: { keywords: [] },
      main: Helper.main as ModuleExport['main']
    })

    this.ctx.i18n.use(resolve(...Helper.lang))

    this.ctx.on('emailSettingsChange', (settings) => this.setTask(settings))

    this.ctx.midware((next, session) => {
      if (Array.from(this.ctx[KotoriSymbols.command]).some((cmd) => session.message.startsWith(cmd.meta.root))) {
        next()
        return
      }
      session.send('命令不存在！')
    })

    this.ctx.command('pwd - 重置密码').action(async (_, session) => {
      session.send('正在重置密码中...')
      const newPassword = (await session.prompt('请输入新密码：')).trim()
      const { encode, salt } = container.get<SettingsService>(Symbols.SettingsService).encodePassword(newPassword)
      await Promise.all([
        this.ctx.pdb.settings.updateMany({
          where: { key: 'admin_password' },
          data: { key: 'admin_password', value: encode }
        }),
        this.ctx.pdb.settings.updateMany({
          where: { key: 'admin_salt' },
          data: { key: 'admin_salt', value: salt }
        })
      ])
      return '密码重置成功'
    })

    this.ctx.command('data - 获取统计数据').action(async (_, session) => {
      session.send('正在获取数据中...')
      const characters = (await this.ctx.pdb.character.findMany()).sort((a, b) => a.order - b.order)
      const series = new Set<string>()
      const tags = new Set<string>()

      for (const character of characters) {
        series.add(character.series)
        if (!character.tags) continue
        for (const tag of character.tags.split('|')) {
          tags.add(tag)
        }
      }

      return `共有 ${characters.length} 位角色，${series.size} 部作品，${tags.size} 种萌点\n作品: ${Array.from(series).join('、')}\n萌点: ${Array.from(tags).join('、')}\n`
    })

    /*
      ? here have a bug: the tsukiko version that kotori (v1.5.3) depends on is lower
      ? than the tsukiko version that @moehub/core depends on, due to two versions of
      ? tsukiko is incompatible, so that a error occurred. However, this issue has
      ? been resolved in the next Kotori minor version (v1.6.0).
    */
    this.ctx.command('character [name] - 获取角色数据').action(async ({ args: [name] }, session) => {
      session.send('正在获取数据中...')
      const characters = (await this.ctx.pdb.character.findMany())
        .sort((a, b) => a.order - b.order)
        .filter((char) => !name || char.name.includes(name) || char.romaji.includes(name))

      if (characters.length === 0) {
        session.send('没能找到任何数据')
        return
      }

      for (const character of characters) {
        let text = ''
        text += `名字: ${character.name}（${character.romaji}）\n`
        text += `作品：${character.series}\n`
        text += `类型: ${character.seriesGenre}\n`
        if (character.gender !== 'FEMALE') text += `性别: ${character.gender}\n`
        if (character.alias) text += `别名: ${character.alias.replaceAll('|', '、')}\n`
        if (character.age) text += `年龄: ${character.age}\n`
        if (character.images) text += `图片: ${character.images.replaceAll('|', '、')}\n`
        if (character.description) text += `描述: ${character.description}\n`
        if (character.comment) text += `评论: ${character.comment}\n`
        if (character.hitokoto) text += `一言: ${character.hitokoto}\n`
        if (character.birthday)
          text += `生日: ${character.birthday.getMonth() + 1} 月 ${character.birthday.getDate()} 日\n`
        if (character.voice) text += `声优: ${character.voice}\n`
        if (character.tags) text += `萌点: ${character.tags.replaceAll('|', '、')}\n`
        if (character.hairColor) text += `头发颜色: ${character.hairColor}\n`
        if (character.eyeColor) text += `眼睛颜色: ${character.eyeColor}\n`
        if (character.bloodType) text += `血型: ${character.bloodType}\n`
        if (character.height) text += `身高: ${character.height}cm\n`
        if (character.weight) text += `体重: ${character.weight}kg\n`
        if (character.bust) text += `胸围: ${character.bust}cm\n`
        if (character.waist) text += `腰围: ${character.waist}cm\n`
        if (character.hip) text += `臀围: ${character.hip}cm\n`
        text += '\n'
        session.send(text)
      }
    })
  }

  private setTask(settings: MoehubDataSettings) {
    const { birthdays, smtp_email, smtp_host, smtp_hours, smtp_key, smtp_port, smtp_target, smtp_template } = settings
    this.taskDispose?.()

    if ((!birthdays && !smtp_email) || !smtp_host || !smtp_key || !smtp_port || !smtp_target || !smtp_template) return
    if (smtp_hours === undefined) return

    this.taskDispose = this.ctx.task(`* ${smtp_hours} * * *`, async () => {
      for (const character of await this.ctx.pdb.character.findMany()) {
        if (!character.birthday) continue
        const today = new Date()
        if (character.birthday.getMonth() === today.getMonth() && character.birthday.getDate() === today.getDate())
          this.sendMail(character as SendMailCharacterData, settings)
      }
    })

    this.logger.info(`Set email notify successfully,will send the mail at ${smtp_hours} o'clock.`)
  }

  public sendMail(
    character: SendMailCharacterData,
    {
      smtp_email: user,
      smtp_host: host,
      smtp_key: pass,
      smtp_port: port,
      smtp_target,
      smtp_template
    }: MoehubDataSettings
  ) {
    const title = `${character.birthday.getMonth() + 1} 月 ${character.birthday.getDate()} 日，${character.name} の誕生日！`
    const message = smtp_template
      .replaceAll('%name%', character.name)
      .replaceAll('%romaji%', character.romaji)
      .replaceAll('%month%', (character.birthday.getMonth() + 1).toString())
      .replaceAll('%day%', character.birthday.getDate().toString())

    return createTransport({ host, port, secure: false, auth: { user, pass } }).sendMail({
      from: user,
      to: smtp_target,
      subject: title,
      html: /* html */ `
      <html>
        <body>
          ${message}
        </body>
      </html>
    `,
      text: message.replace(/<[^>]*>?/gm, '')
    })
  }
}

export default Bot
