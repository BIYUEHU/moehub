import type { LocaleType } from '@kotori-bot/i18n'
import { createSlice } from '@reduxjs/toolkit'

function getBrowserLanguage(): LocaleType {
  if (navigator.language.includes('ja')) return 'ja_JP'
  if (['zh-TW', 'zh-HK'].includes(navigator.language)) return 'zh_TW'
  if (navigator.language.includes('zh')) return 'zh_CN'
  return 'en_US'
}

const languageList = ['en_US', 'ja_JP', 'zh_TW', 'zh_CN'] as const

export const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    token: '',
    language: getBrowserLanguage()
  },
  reducers: {
    login: (state, { payload }: { payload: string }) => {
      state.token = payload
    },
    logout: (state) => {
      state.token = ''
    },
    nextLanguage: (state) => {
      state.language = languageList[(languageList.indexOf(state.language as 'en_US') + 1) % languageList.length]
    }
  },
  selectors: {
    getToken: (state) => state.token,
    getLanguage: (state) => state.language
  }
})

export const { login, logout, nextLanguage } = adminSlice.actions

export const { getToken, getLanguage } = adminSlice.selectors

export default adminSlice.reducer
