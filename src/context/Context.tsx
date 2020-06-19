import React, { createContext, useReducer } from 'react'
import WSReducer from '../reducer/Reducer'
// eslint-disable-next-line no-unused-vars
import { Action, INITIAL_STATE } from '../model/Model'

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
