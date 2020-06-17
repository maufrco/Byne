import React, { useEffect, useRef, useState, createContext, useContext } from 'react'

export type WSSymbol = 'IET'|'N'|'ZHT'|'V'|'ELY'|'TZW'|'FIK'|'T'|'ZQ'|'NP'|'MJ'|'KG'|'OY'|'ITN'|'OB'|'ACM'|'QQ'|'X'|'XLC'|'S';
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
  supportedSymbols?: [WSSymbol]
}

export const initialIStock:IStock = {
  companyName: '',
  catchPhrase: '',
  basePrice: 0
}

const StocksContext = createContext<IStocksContext>({} as IStocksContext)

// eslint-disable-next-line react/prop-types
const WSProvider: React.FC = ({ children }) => {
  const ws = useRef<WebSocket>()

  const [initialConfig, setInitialConfig] = useState<IConfig>()
  const [stockSymbols, setStockSymbols] = useState<WSSymbol[]>([])
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [monitor, setMonitor] = useState(new Map())

  // LifeCycles
  useEffect(() => {
    ws.current = new WebSocket(`${process.env.REACT_APP_PROTOCOL}${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}`, 'json')

    ws.current.onopen = () => {
      try {
        console.log('CONNECTING')
      } catch (error) {
        console.error(error)
      }
    }
    ws.current.onerror = () => {
      try {
        console.error('Connection Error with WebSocket')
        // getModelWebsocketStatus('ERROR')
      } catch (error) {
        console.error(error)
      }
    }
    return () => {
      disconnect()
    }
  },
  [])

  useEffect(() => {
    if (!ws.current) return
    ws.current.onmessage = (e) => {
      try {
        const message = JSON.parse(e.data)
        if (message.event === 'stocks-update') {
          const symbol = (Object.keys(message.stocks)[0]) as WSSymbol
          const value = (Object.values(message.stocks)[0])
          isSubscribed(symbol) && (setMonitor(monitor => new Map(monitor.set(symbol, value))))
        } else if (message.event === 'connected') {
          setIsConnected(true)
          setInitialConfig(message)
        } else {
          console.log(message)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }, [isConnected, stockSymbols])

  // Functions
  function subscribe (newValue:WSSymbol) {
    try {
      if (!ws.current || isSubscribed(newValue)) return
      const msg = {
        event: 'subscribe',
        stocks: [...stockSymbols, ...[newValue]]
      }
      setStockSymbols([...stockSymbols, ...[newValue]])
      ws.current.send(JSON.stringify(msg))
    } catch (error) {
      console.error(error)
    }
  };
  function unsubscribe (newValue:WSSymbol) {
    try {
      if (!ws.current || (!isSubscribed(newValue))) return
      const msg = {
        event: 'unsubscribe',
        stocks: [newValue]
      }
      setStockSymbols(stockSymbols.filter(item => item !== newValue))
      resetMonitor(newValue)
      ws.current.send(JSON.stringify(msg))
    } catch (error) {
      console.error(error)
    }
  };

  const isSubscribed = (symbol:WSSymbol) :boolean => Boolean(stockSymbols.find(element => symbol === element))
  const resetMonitor = (symbol:WSSymbol) => (monitor.delete(symbol))
  const disconnect = () => {
    try {
      if (!ws.current) return
      setIsConnected(false)
      ws.current.close()
    } catch (error) {
      console.error(error)
    }
  }

  // Render
  return (
    <StocksContext.Provider
      value={{
        initialConfig,
        isConnected,
        monitor,
        stockSymbols,
        subscribe,
        isSubscribed,
        unsubscribe
      }}>
      {children}
    </StocksContext.Provider>
  )
}

export interface IStocksContext {
  initialConfig: IConfig|undefined;
  isConnected: boolean;
  stockSymbols: WSSymbol[];
  monitor: Map<string, number>;
  isSubscribed(symbols:WSSymbol):boolean;
  subscribe(symbols:WSSymbol):void;
  unsubscribe(symbols:WSSymbol):void;
}

export function useWs () {
  const context = useContext(StocksContext)
  return context
}
export default WSProvider
