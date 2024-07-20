import type { MoehubDataSettings, MoehubDataSettingsSubmit } from '@moehub/common'
import { createSlice } from '@reduxjs/toolkit'

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {} as MoehubDataSettings & { currentBackground: string },
  reducers: {
    loadSettings: (state, { payload }: { payload: MoehubDataSettingsSubmit }) => {
      for (const key in payload) (state as Record<string, unknown>)[key] = payload[key as keyof MoehubDataSettings]
      if (!state.site_backgrounds) return
      state.currentBackground = state.site_backgrounds[Math.floor(Math.random() * state.site_backgrounds.length)]
    }
  },
  selectors: {
    getSettings: (state) => state,
    getCurrentBackground: (state) => state.currentBackground
  }
})

export const { loadSettings } = settingsSlice.actions

export const { getSettings, getCurrentBackground } = settingsSlice.selectors

export default settingsSlice.reducer
