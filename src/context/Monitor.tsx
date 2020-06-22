import React, { createContext, useReducer } from 'react'
import MonitorReducer from '../reducer/Monitor'
// eslint-disable-next-line no-unused-vars
import { Action, INITIAL_MONITOR_STATE } from '../model/Model'

export const MonitorContext = createContext<{ws: typeof INITIAL_MONITOR_STATE,
  wsdispatch:(action:Action) => void}>
    ({
      ws: INITIAL_MONITOR_STATE,
      wsdispatch: () => {}
    })

export const MonitorConsumer = MonitorContext.Consumer

// eslint-disable-next-line react/prop-types
export const MonitorProvider: React.FC = ({ children }) => {
  const [ws, wsdispatch] = useReducer(MonitorReducer, INITIAL_MONITOR_STATE)
  const value = { ws, wsdispatch }

  return (
    <MonitorContext.Provider value={value}>
      {children}
    </MonitorContext.Provider>
  )
}
