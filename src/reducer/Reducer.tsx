
// eslint-disable-next-line no-unused-vars
import { WSSymbol, IStocksContext } from '../context/Context'
import { WSService } from '../service/WSService'

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
  follows: []
}
export type Action = {type: 'RECONNECT'|'FOLLOW'|'UNFOLLOW'|'SET_CHART'|'SET_INITIAL'|'SET_CONNECT'| 'SET_MONITOR'| 'SUBSCRIBE'| 'UNSUBSCRIBE' ; payload: any}

const isSubscribed = (symbol:WSSymbol, subscribe:WSSymbol[]) :boolean => Boolean(subscribe.find(element => symbol === element))

const WSReducer = (state: IStocksContext, action: Action) => {
  const service = WSService.getInstance()

  switch (action.type) {
    case 'SET_INITIAL': {
      const newState = { ...state }

      newState.initialConfig = action.payload
      newState.subscribe = [action.payload.supportedSymbols[0]]
      newState.chartSelected = action.payload.supportedSymbols[0]
      newState.follows = [action.payload.supportedSymbols[0]]

      service.ws.current.send(JSON.stringify({ event: 'subscribe', stocks: newState.subscribe }))

      return newState
    }
    case 'SET_CONNECT': {
      const newState = { ...state }
      newState.isConnected = action.payload
      return newState
    }
    case 'SET_CHART': {
      const newState = { ...state }
      newState.chartSelected = action.payload
      return newState
    }

    case 'SET_MONITOR': {
      const newState = { ...state }
      newState.monitor = new Map(newState.monitor.set(action.payload[0], action.payload[1]))
      return newState
    }
    case 'FOLLOW': {
      const newState = { ...state }
      newState.follows = [...newState.follows, ...[action.payload]]
      return newState
    }
    case 'UNFOLLOW': {
      const newState = { ...state }
      const index = newState.follows.indexOf(action.payload);
      (index > -1) && newState.follows.splice(index, 1)

      return newState
    }
    case 'RECONNECT': {
      const newState = { ...state }
      const msg = {
        event: 'subscribe',
        stocks: [newState.subscribe]
      }
      service.ws.current.send(JSON.stringify(msg))
      return newState
    }
    case 'SUBSCRIBE': {
      const newState = { ...state }
      const msg = {
        event: 'subscribe',
        stocks: [action.payload]
      }
      newState.subscribe = [...newState.subscribe, ...[action.payload]]
      service.ws.current.send(JSON.stringify(msg))
      return newState
    }
    case 'UNSUBSCRIBE': {
      const newState = { ...state }
      const msg = {
        event: 'unsubscribe',
        stocks: [action.payload]
      }

      const index = newState.subscribe.indexOf(action.payload);
      (index > -1) && newState.subscribe.splice(index, 1)

      service.ws.current.send(JSON.stringify(msg))

      return newState
    }
    default: return state
  }
}
export default WSReducer
