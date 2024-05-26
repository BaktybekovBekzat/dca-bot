import type { CycleStatusType, ExchangeType, ID, SymbolType } from '@/lib/types'

export interface ICycleState {
  cycles: ICycle[]
  cycle: ICycle | null
  isLoading: boolean
}

export interface ICycle {
  id: ID
  exchange: ExchangeType
  symbol: SymbolType
  amount: number
  grid_length: number
  first_order_offset: number
  num_orders: number
  price: number
  partial_num_orders: number
  next_order_volume: number
  profit_percentage: number
  price_change_percentage: number
  status: CycleStatusType
  log_coefficient: number
  created_at: Date
  updated_at: Date | null
  profit_capitalization: number
}
