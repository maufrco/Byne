/* eslint-disable react/prop-types */
import React from 'react'
// eslint-disable-next-line no-unused-vars
import { useWs, WSSymbol } from './WSProvider'
import Switch from '@material-ui/core/Switch'

const Follows: React.FC = props => {
  const { monitor, subscribe, unsubscribe } = useWs()
  const symbol = props.children as WSSymbol

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked ? subscribe(symbol) : unsubscribe(symbol)
  }
  return (
    <>
      <Switch
        onChange={handleChange}
        name={symbol}
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
      <div>{monitor.get(symbol!) && Number(monitor.get(symbol!)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
    </>
  )
}
export default Follows
