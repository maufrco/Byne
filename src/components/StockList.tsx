import React from 'react'
// eslint-disable-next-line no-unused-vars
import { useWs, IStock, WSSymbol } from './WSProvider'
import StockItem from './StockItem'

const StockList: React.FC = () => {
  const { initialConfig } = useWs()
  return (
    <>
      {initialConfig?.stocksData.map(
        (stock, index) => {
          return (stock ? (
            <div key={index}>
              <StockItem>{stock as IStock}</StockItem>
            </div>
          ) : null)
        })}
    </>
  )
}

export default StockList
