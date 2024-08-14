import I18n from '@kotori-bot/i18n'
import locales from './locales'

const i18n = new I18n()

i18n.use(locales.en_US, 'en_US')
i18n.use(locales.ja_JP, 'ja_JP')
i18n.use(locales.zh_TW, 'zh_TW')
i18n.use(locales.zh_CN, 'zh_CN')

export const t = i18n.t.bind(i18n)

export const f = (locale: string, ...params: string[]) => {
  let result = i18n.locale(locale)
  for (const [index, value] of params.entries()) result = result.replaceAll(`{${index}}`, value)
  return result
}

export default i18n
