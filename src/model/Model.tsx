
export type Action = {type: 'SET_RECONNECT'|'RECONNECT'|'FOLLOW'|'UNFOLLOW'|'SET_CHART'|'SET_INITIAL'|'SET_CONNECT'| 'SET_MONITOR'| 'SUBSCRIBE'| 'UNSUBSCRIBE' ; payload: any}
export type WSSymbol = ''|'IET'|'N'|'ZHT'|'V'|'ELY'|'TZW'|'FIK'|'T'|'ZQ'|'NP'|'MJ'|'KG'|'OY'|'ITN'|'OB'|'ACM'|'QQ'|'X'|'XLC'|'S';
export type WSErrorEvent = 'invalid stock symbol'| 'invalid message' | 'message too long'
export type WSEvent = 'subscribe'|'unsubscribe'|'disconnecting'|'connected'|'error'|'stocks-update'|'disconected'

export interface IStocksContext {
    initialConfig: IConfig;
    isConnected: boolean;
    monitor: Map<string, number>;
    subscribe: WSSymbol[];
    follows: WSSymbol[];
    chartSelected?:WSSymbol;
    reconnect:boolean;
  }
export type IStock = {
    symbol?: WSSymbol;
    companyName?: string;
    catchPhrase?: string;
    basePrice?: number;
  }
export interface IConfig {
    event: WSEvent;
    message: string;
    stocksData:[IStock];
    supportedSymbols: [WSSymbol]
  }

export const INITIAL_STATE: IStocksContext = {
  initialConfig: {
    event: 'disconected',
    message: '',
    supportedSymbols: [''],
    stocksData: [{
      symbol: '',
      companyName: '',
      catchPhrase: '',
      basePrice: 0
    }]
  },
  isConnected: false,
  subscribe: [''],
  monitor: new Map(),
  follows: [],
  reconnect: false
}
