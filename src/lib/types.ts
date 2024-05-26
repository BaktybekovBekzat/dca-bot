export enum ExchangeType {
  Binance = 'Binance',
  Bybit = 'Bybit',
  OKX = 'OKX',
  Gatio = 'Gat.io',
  Kraken = 'Kraken'
}

export enum SymbolType {
  'BTC/USDT' = 'BTC/USDT',
  'ETH/USDT' = 'ETH/USDT'
}

export enum BotStatusType {
  STOPPED = 'STOPPED',
  RUNNING = 'RUNNING',
  ERROR = 'ERROR'
}

export enum SideType {
  BUY = 'BUY',
  SELL = 'SELL'
}

export enum TimeInForceType {
  DayOrder = 'day_order',
  GTC = 'GTC',
  IOC = 'IOC',
  FOK = 'FOK',
  GTD = 'GTD',
  ATO = 'ATO',
  ATC = 'ATC'
}

export enum OrderType {
  LIMIT = 'LIMIT',
  MARKET = 'MARKET'
}

export enum OrderStatusType {
  NEW = 'NEW',
  FILLED = 'FILLED',
  CANCELED = 'CANCELED'
}

export enum CycleStatusType {
  FINISHED = 'FINISHED',
  ERROR = 'ERROR',
  ACTIVE = 'ACTIVE'
}

export type ID = string
