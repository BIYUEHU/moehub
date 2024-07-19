import type { MoehubDataSettings, MoehubDataSettingsSubmit } from '@moehub/common'
import { createSlice } from '@reduxjs/toolkit'

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {} as MoehubDataSettings,
  reducers: {
    loadSettings: (state, { payload }: { payload: MoehubDataSettingsSubmit }) => {
      for (const key in payload) {
        ;(state as Record<string, unknown>)[key] = payload[key as keyof MoehubDataSettings]
      }
    }
  },
  selectors: {
    getSettings: (state) => state
  }
})

export const { loadSettings } = settingsSlice.actions

export const { getSettings } = settingsSlice.selectors

export default settingsSlice.reducer
