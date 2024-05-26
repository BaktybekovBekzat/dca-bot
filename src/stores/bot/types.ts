import type { BotStatusType, ExchangeType, ID, SymbolType } from '@/lib/types'

export interface IBotState {
  bots: IBot[]
  bot: IBot | null
  isLoading: boolean
}

export interface IBot {
  id: ID
  name: string
  exchange: ExchangeType
  symbol: SymbolType
  amount: number
  grid_length: number
  first_order_offset: number
  num_orders: number
  partial_num_orders: number
  next_order_volume: number
  profit_percentage: number
  price_change_percentage: number
  log_coefficient: number
  profit_capitalization: number
  upper_price_limit: number
  status: BotStatusType
  is_active: boolean
  userId: ID
  exchange_key_id: ID
  created_at: Date
  updated_at: Date | null
}

export type ICreateBot = Omit<IBot, 'id' | 'created_at' | 'updated_at'>

export type IUpdateBot = Omit<IBot, 'updated_at'>
