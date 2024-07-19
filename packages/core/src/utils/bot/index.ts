import type AdapterCmd from '@kotori-bot/kotori-plugin-adapter-cmd'
import { inject, injectable } from 'inversify'
import { type Core, Symbols as KotoriSymbols } from '@kotori-bot/core'
import { Symbols } from '../../container'
import type Database from '../db'

/* Define config */
const commonConfig = {
  lang: 'en_US' as const,
  'command-prefix': ''
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
  master: 0,
  age: 0,
  'self-id': 0,
  nickname: '',
  sex: 'male' as const
}

@injectable()
export class Bot {
  private ctx: Core

  public constructor(
    @inject(Symbols.Database) pdb: Database,
    @inject(Symbols.BotFactory) botFactory: (
      kotoriConfig: ConstructorParameters<typeof Core>[0],
      pdb: Database,
      botConfig: ConstructorParameters<typeof AdapterCmd>[1],
      identity: string
    ) => Core
  ) {
    this.ctx = botFactory(kotoriConfig, pdb, botConfig, 'line')
    this.register()
  }

  /* Register command */
  public register() {
    this.ctx.command('pwd - 重置密码').action(async (_, session) => {
      session.send('正在重置密码中...')
      const newPassword = await session.prompt('请输入新密码：')
      /* some code to reset password */
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
    // ! FALSE:
    // this.ctx.command('character [name] - 获取角色数据').action(async (_, session) => {
    // * TRUE:
    this.ctx.command('character - 获取角色数据').action(async (_, session) => {
      session.send('正在获取数据中...')
      const characters = (await this.ctx.pdb.character.findMany()).sort((a, b) => a.order - b.order)

      for (const character of characters) {
        let text = ''
        text += `名字: ${character.name}（${character.romaji}）\n`
        text += `作品：${character.series}\n`
        text += `类型: ${character.seriesGenre}\n`
        if (character.gender !== 'FEMALE') text += `性别: ${character.gender}\n`
        if (character.alias) text += `别名: ${character.alias.replaceAll('|', '、')}\n`
        if (character.age) text += `年龄: ${character.age}\n`
        // if (character.images) text += `图片: ${character.images.replaceAll('|', '、')}\n`
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

    this.ctx.midware((next, session) => {
      if (
        Array.from(this.ctx[KotoriSymbols.command] ?? ['pwd', 'data', 'character']).every((cmd) =>
          session.message.startsWith(typeof cmd === 'string' ? cmd : cmd.meta.root)
        )
      )
        return next()
      return session.send('命令不存在！')
    })
  }
}

export default Bot
