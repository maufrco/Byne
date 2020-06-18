import React from 'react'
// eslint-disable-next-line no-unused-vars
import { IStock, useWs } from './WSProvider'
import Follows from './Follows'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import { Divider, Box, makeStyles, createStyles, Theme, Hidden, Chip } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    containerItem: {
      borderColor: '#333',
      borderBottom: 1,
      paddingTop: 3,
      paddingBottom: 3
    },
    symbol: {
      color: '#f27a41'
    },
    phrase: {

      fontWeight: 300,
      fontSize: 13,
      color: '#666'
    }
  })
)

const StockItem: React.FC = props => {
  // eslint-disable-next-line react/prop-types
  const { symbol, companyName, catchPhrase } = props.children as IStock
  const { monitor } = useWs()
  const classes = useStyles()

  return (
    <>
      <Box display="flex" alignItems="space-between" alignContent="center" className={classes.containerItem} >

        <Box flexGrow={0}>
          <Box flexGrow={0} >{companyName}</Box>
          <Box flexGrow={0} className={classes.symbol}> {symbol} </Box>

        </Box>

        <Box flexGrow={1} pl={3}className={classes.phrase}>
          <Hidden only={['sm', 'xs']}>    {catchPhrase}</Hidden>
        </Box>

        <Box>
          {monitor.get(symbol!) &&
          (
            <Chip color="primary" icon={<MonetizationOnIcon />} label={Number(monitor.get(symbol!)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
          )
          }

          <Follows>{symbol}</Follows>
        </Box>
      </Box>
      <Divider />
    </>
  )
}
export default StockItem
