import type {
  ExchangeType,
  ID,
  OrderStatusType,
  OrderType,
  SideType,
  SymbolType,
  TimeInForceType
} from '@/lib/types'

export interface IOrderState {
  orders: IOrder[]
  order: IOrder | null
  isLoading: boolean
}

export interface IOrder {
  id: ID
  exchange: ExchangeType
  symbol: SymbolType
  side: SideType
  time_in_force: TimeInForceType
  type: OrderType
  price: number
  amount: number
  quantity: number
  status: OrderStatusType
  number: number
  exchange_order_id: ID
  exchange_order_data: string
  cycle_id: ID
  created_at: Date
  updated_at: Date | null
}
