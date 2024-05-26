import { defineStore } from 'pinia'
import type { IBot, IBotState, ICreateBot, IUpdateBot } from './types'
import { $api } from '@/lib/api'
import { useAuthStore } from '../auth'
import type { ID } from '@/lib/types'

export const useBotStore = defineStore('bot', {
  state: (): IBotState => ({
    bots: [],
    bot: null,
    isLoading: false
  }),
  actions: {
    async get(id?: ID) {
      this.isLoading = true
      const res = await $api.get<IBot[]>(`/640/bots?userId=${id}`)

      this.bots = res.data
      this.isLoading = false
    },
    async getById(id: ID) {
      const res = await $api.get<IBot>(`/640/bots/${id}`)
      this.bot = res.data

      return res.data
    },
    async create(data: ICreateBot): Promise<IBot | null> {
      try {
        this.isLoading = true
        const authStore = useAuthStore()
        if (!authStore.user) return null

        const res = await $api.post<ICreateBot, IBot>('/660/bots', {
          ...data,
          userId: authStore.user.id
        })

        return res
      } catch (error) {
        return null
      } finally {
        this.isLoading = false
      }
    },
    async update(data: IUpdateBot): Promise<IBot | null> {
      try {
        this.isLoading = true
        const res = await $api.put<IUpdateBot, IBot>(`/660/bots/${data.id}`, { ...data })

        return res
      } catch (error) {
        return null
      } finally {
        this.isLoading = false
      }
    }
  }
})
