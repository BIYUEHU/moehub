import { createSlice } from '@reduxjs/toolkit'

export const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    token: ''
  },
  reducers: {
    login: (state, { payload }: { payload: string }) => {
      state.token = payload
    },
    logout: (state) => {
      state.token = ''
    }
  },
  selectors: {
    getToken: (state) => state.token
  }
})

export const { login, logout } = adminSlice.actions

export const { getToken } = adminSlice.selectors

export default adminSlice.reducer
