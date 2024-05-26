import { BotStatusType, CycleStatusType, ExchangeType, SymbolType, OrderStatusType } from './types'

export const exchangeOptions = [
  { label: ExchangeType.Binance, value: ExchangeType.Binance },
  { label: ExchangeType.Bybit, value: ExchangeType.Bybit },
  { label: ExchangeType.OKX, value: ExchangeType.OKX },
  { label: ExchangeType.Gatio, value: ExchangeType.Gatio },
  { label: ExchangeType.Kraken, value: ExchangeType.Kraken }
]

export const symbolOptions = [
  { label: SymbolType['BTC/USDT'], value: SymbolType['BTC/USDT'] },
  { label: SymbolType['ETH/USDT'], value: SymbolType['ETH/USDT'] }
]

export const statusOptions = [
  { label: 'Запущен', value: BotStatusType.RUNNING },
  { label: 'Остановлен', value: BotStatusType.STOPPED },
  { label: 'Ошибка', value: BotStatusType.ERROR }
]

export const cycleStatusOptions = [
  { label: 'Активный', value: CycleStatusType.ACTIVE },
  { label: 'Закончен', value: CycleStatusType.FINISHED },
  { label: 'Ошибка', value: CycleStatusType.ERROR }
]
export const orderStatusOptions = [
  { label: 'Новый', value: OrderStatusType.NEW },
  { label: 'Заполнен', value: OrderStatusType.FILLED },
  { label: 'Отменен', value: OrderStatusType.CANCELED }
]
