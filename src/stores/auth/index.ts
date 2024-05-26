import { defineStore } from 'pinia'
import type { IAuthState, ILoginForm, IRegisterForm, IUser } from './types'
import { $api } from '@/lib/api'
import LocalStorage from '@/plugins/localStorage'
import { AUTH_TOKEN_KEY, USER_KEY } from '@/lib/consts'

export const useAuthStore = defineStore('auth', {
  state: (): IAuthState => ({
    isLoading: false,
    user: null
  }),
  actions: {
    async login(data: ILoginForm) {
      try {
        this.isLoading = true
        const res = await $api.post<{ accessToken: string; user: IUser }>('/login', data)
        LocalStorage.set(AUTH_TOKEN_KEY, res.data.accessToken)
        LocalStorage.set(USER_KEY, res.data.user)
        this.user = res.data.user
      } catch (error) {
        if (error) {
          throw error
        }
      } finally {
        this.isLoading = false
      }
    },
    async register(data: IRegisterForm) {
      try {
        this.isLoading = true
        const res = await $api.post<{ accessToken: string; user: IUser }>('/register', data)
        LocalStorage.set(AUTH_TOKEN_KEY, res.data.accessToken)
        LocalStorage.set(USER_KEY, res.data.user)
        this.user = res.data.user
      } catch (error) {
        if (error) {
          throw error
        }
      } finally {
        this.isLoading = false
      }
    },
    async isAuthorized(): Promise<boolean> {
      try {
        await $api.get('/640/is-authorized')
        const user = LocalStorage.get<IUser>(USER_KEY)
        this.user = user

        return true
      } catch {
        LocalStorage.remove(USER_KEY)
        return false
      }
    }
  }
})
