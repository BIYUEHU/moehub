import axios from 'axios'
import { notification } from 'antd'
import config from './config.js'
import { getToken } from '@/store/adminReducer.js'
import store from '@/store/'

function axiosCreator() {
  const http = axios.create({
    baseURL: config.url,
    timeout: 20000
  })

  http.interceptors.request.use(
    (config) => {
      const token = getToken(store.getState())
      if (token) config.headers.Authorization = `Bearer ${token}`
      return config
    },
    (err) => Promise.reject(err)
  )

  http.interceptors.response.use((response) => {
    if (response.data) response.config.headers['Content-Type'] = 'application/json'
    return response.data
  })

  return http
}

const http = axiosCreator()

http.interceptors.response.use(undefined, (err) => {
  notification.error({
    message: 'Http request error',
    description: err instanceof Error ? err.message : err || 'Unknown error',
    placement: 'topRight'
  })
  return Promise.reject(err)
})

export const httpNoCatcher = axiosCreator()

export default http
