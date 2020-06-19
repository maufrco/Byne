import React, { createContext, useReducer } from 'react'
// eslint-disable-next-line no-unused-vars
import WSReducer, { Action, INITIAL_STATE } from '../reducer/Reducer'

export interface IStocksContext {
  initialConfig: IConfig;
  isConnected: boolean;
  monitor: Map<string, number>;
  subscribe: WSSymbol[];
  follows: WSSymbol[];
  chartSelected?:WSSymbol;
}

export type WSSymbol = ''|'IET'|'N'|'ZHT'|'V'|'ELY'|'TZW'|'FIK'|'T'|'ZQ'|'NP'|'MJ'|'KG'|'OY'|'ITN'|'OB'|'ACM'|'QQ'|'X'|'XLC'|'S';
type WSErrorEvent = 'invalid stock symbol'| 'invalid message' | 'message too long'
type WSEvent = 'subscribe'|'unsubscribe'|'disconnecting'|'connected'|'error'|'stocks-update'|'disconected'

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

export const GlobalContext = createContext<{state: typeof INITIAL_STATE,
  dispatch:(action:Action) => void}>
    ({
      state: INITIAL_STATE,
      dispatch: () => {}
    })

export const GlobalConsumer = GlobalContext.Consumer

// eslint-disable-next-line react/prop-types
export const WSProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(WSReducer, INITIAL_STATE)
  const value = { state, dispatch }

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  )
}
