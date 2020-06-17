import React from 'react'
import { useWs } from './WSProvider'
const Status: React.FC = () => {
  const { isConnected } = useWs()
  return (
    <small>
 [status: {isConnected ? (<span>conectado</span>) : (<span>desconectado</span>) }]
    </small>)
}
export default Status
