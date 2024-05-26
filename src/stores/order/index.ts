import { defineStore } from 'pinia'
import type { IOrderState, IOrder } from './types'
import { $api } from '@/lib/api'
import type { ID } from '@/lib/types'

export const useOrderStore = defineStore('order', {
  state: (): IOrderState => ({
    orders: [],
    order: null,
    isLoading: false
  }),
  actions: {
    async get(id: ID) {
      this.isLoading = true
      const res = await $api.get<IOrder[]>(`/640/orders?cycle_id=${id}`)

      this.orders = res.data
      this.isLoading = false
    }
  }
})
