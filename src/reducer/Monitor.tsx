
// eslint-disable-next-line no-unused-vars
import { Action, IMonitorContext } from '../model/Model'

const MonitorReducer = (state:IMonitorContext, action: Action) => {
  switch (action.type) {
    case 'SET_MONITOR': {
      const newState = { ...state }
      newState.monitor = new Map(newState.monitor.set(action.payload[0], action.payload[1]))
      return newState
    }
    case 'GET_MONITOR': {
      const newState = { ...state }
      return newState
    }
    default: return state
  }
}
export default MonitorReducer
