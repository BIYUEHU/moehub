import { combineReducers, configureStore } from '@reduxjs/toolkit'
import 'redux-persist/types/storage/index.d.ts'
import storage from 'redux-persist/lib/storage'
import adminReducer from './adminReducer'
import { persistReducer } from 'redux-persist'
import persistStore from 'redux-persist/es/persistStore'
import settingsReducer from './settingsReducer'

const persistedReducer = persistReducer(
  {
    key: 'moehub',
    storage,
    whitelist: ['admin', 'settings']
  },
  combineReducers({
    admin: adminReducer,
    settings: settingsReducer
  })
)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export default store
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
