import React, { useContext } from 'react'
// eslint-disable-next-line no-unused-vars
import { WSSymbol } from '../model/Model'
import { GlobalContext } from '../context/Context'
import { WSService } from '../service/WSService'

const WSControl : React.FC = () => {
  const { state, dispatch } = useContext(GlobalContext)
  const service = WSService.getInstance()

  service.ws.current.onerror = () => {
    try {
      dispatch({ type: 'SET_CONNECT', payload: false })
      console.error('Connection closing')
      setTimeout(function () {
        console.log('reconect error')
        WSService.init()
        dispatch({ type: 'RECONNECT', payload: true })
      }, 10000)
      return
    } catch (error) {
      console.error(error)
    }
  }

  service.ws.current.onclose = () => {
    try {
      dispatch({ type: 'SET_CONNECT', payload: false })
      console.error('Connection closing')

      setTimeout(function () {
        console.log('reconect')
        WSService.init()
        dispatch({ type: 'SET_RECONNECT', payload: true })
      }, 5000)

      return
    } catch (error) {
      console.error(error)
    }
  }
  service.ws.current.onopen = (e) => {
    try {
      console.log('CONNECTING')
      dispatch({ type: 'SET_CONNECT', payload: true })
    } catch (error) {
      console.error(error)
    }
  }
  service.ws.current.onmessage = (e) => {
    try {
      const message = JSON.parse(e.data)
      if (message.event === 'stocks-update') {
        const symbol = (Object.keys(message.stocks)[0]) as WSSymbol
        const value = (Object.values(message.stocks)[0])
        dispatch({ type: 'SET_MONITOR', payload: [symbol, value] })
        return
      } else if (message.event === 'connected') {
        (state.reconnect)
          ? dispatch({ type: 'RECONNECT', payload: message })
          : dispatch({ type: 'SET_INITIAL', payload: message })
        return
      }
      return
    } catch (error) {
      console.error(error)
    }
  }
  return null
}
export default WSControl
