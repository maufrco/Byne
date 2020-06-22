import React, { useMemo, useContext } from 'react'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import { WSSymbol } from '../model/Model'
import { Chip } from '@material-ui/core'
import { MonitorContext } from '../context/Monitor'

const Price: React.FC = props => {
  const { children } = props
  const { ws: { monitor } } = useContext(MonitorContext)
  const price = useMemo(() => {
    const value = monitor.get(children as WSSymbol)
    return (!value) ? ('R$ 0,00') : Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }, [children, monitor])

  return (price
    ? (<Chip color="primary" icon={<MonetizationOnIcon />} label={price} />)
    : (<Chip color="primary" icon={<MonetizationOnIcon />} label="R$ 0,00" />)
  )
}
export default Price
