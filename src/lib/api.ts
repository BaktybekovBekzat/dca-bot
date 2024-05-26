import axios from 'axios'
import { AUTH_TOKEN_KEY, API_URL } from './consts'
import LocalStorage from '@/plugins/localStorage'

export const $api = axios.create({
  baseURL: API_URL
})

$api.interceptors.request.use((config) => {
  const token = LocalStorage.get(AUTH_TOKEN_KEY) || ''
  config.headers.Authorization = `Bearer ${token}`

  return config
})
