import React from 'react'
// eslint-disable-next-line no-unused-vars
import { IStock } from './WSProvider'
import Follows from './Follows'

const StockItem: React.FC = props => {
  // eslint-disable-next-line react/prop-types
  const { symbol, companyName, catchPhrase } = props.children as IStock
  return (
    <>
      <h1>{companyName}</h1>
      <small>{catchPhrase}</small>
      <Follows>{symbol}</Follows>

    </>
  )
}
export default StockItem
