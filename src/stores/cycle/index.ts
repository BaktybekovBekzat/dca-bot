import { defineStore } from 'pinia'
import type { ICycleState, ICycle } from './types'
import { $api } from '@/lib/api'
import type { ID } from '@/lib/types'

export const useCycleStore = defineStore('cycle', {
  state: (): ICycleState => ({
    cycles: [],
    cycle: null,
    isLoading: false
  }),
  actions: {
    async get() {
      this.isLoading = true
      const res = await $api.get<ICycle[]>('/640/cycles')

      this.cycles = res.data
      this.isLoading = false
    },
    async getById(id: ID) {
      const res = await $api.get<ICycle>(`/640/cycles/${id}`)

      this.cycle = res.data
    }
  }
})
