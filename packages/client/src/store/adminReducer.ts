import { createSlice } from '@reduxjs/toolkit'

export const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    isLoggedIn: false
  },
  reducers: {
    login: (state) => {
      state.isLoggedIn = true
    },
    logout: (state) => {
      state.isLoggedIn = false
    }
  },
  selectors: {
    isLoggedIn: (state) => state.isLoggedIn
  }
})

export const { login, logout } = adminSlice.actions

export const { isLoggedIn } = adminSlice.selectors

export default adminSlice.reducer
