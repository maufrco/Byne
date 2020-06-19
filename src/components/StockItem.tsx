import React, { useContext, useMemo } from 'react'

import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import { Divider, Box, Hidden, Chip, FormControlLabel, Tooltip } from '@material-ui/core'

import Switch from '@material-ui/core/Switch'
import IconButton from '@material-ui/core/IconButton'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import DeleteIcon from '@material-ui/icons/Delete'
import { useStyles } from '../style/Style'
// eslint-disable-next-line no-unused-vars
import { IStock, WSSymbol } from '../model/Model'
import { GlobalContext } from '../context/Context'

const StockItem: React.FC = props => {
  // eslint-disable-next-line react/prop-types
  const symbol = props.children as WSSymbol
  const { state: { monitor, initialConfig, chartSelected }, dispatch } = useContext(GlobalContext)
  const price = useMemo(() => monitor.get(symbol), [monitor, symbol])
  const classes = useStyles()
  const [open, setOpen] = React.useState(true)

  const getStock = (symbol:WSSymbol):IStock => (
    initialConfig.stocksData.find((el:IStock) => el.symbol === symbol) as IStock
  )
  const stock = useMemo(() => getStock(symbol), [initialConfig, symbol])

  const handleDelete = () => {
    dispatch({ type: 'UNSUBSCRIBE', payload: symbol })
    dispatch({ type: 'UNFOLLOW', payload: symbol })
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked
      ? dispatch({ type: 'SUBSCRIBE', payload: symbol })
      : dispatch({ type: 'UNSUBSCRIBE', payload: symbol })

    setOpen(!open)
  }

  const handleClick = () => {
    dispatch({ type: 'SET_CHART', payload: symbol })
  }

  const { companyName, catchPhrase } = stock
  return (
    <>
      <Box display="flex" alignItems="space-between" alignContent="center" className={classes.containerItem} >
        <Box flexGrow={0}>
          <Box flexGrow={0} >{companyName}</Box>
          <Box flexGrow={0} className={classes.symbol}> {symbol} </Box>
        </Box>
        <Box flexGrow={1} pl={3}className={classes.phrase}>
          <Hidden only={['sm', 'xs']}>{catchPhrase}</Hidden>
        </Box>
        <Box>
          {price &&
          (
            <Chip color="primary" icon={<MonetizationOnIcon />}
              label={Number(price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
          )
          }
          <Tooltip arrow title={open ? 'Deixar de acompanhar' : 'Começar acompanhar'} aria-label="follow">
            <span>
              <FormControlLabel
                labelPlacement="top"
                control={<Switch checked={open} color="primary" onChange={handleChange} name={symbol}/>}
                label="Follow"
              />
            </span>
          </Tooltip>

          <Tooltip arrow title="Visualizar no gráfico" aria-label="chart">
            <span><IconButton color="primary" value={symbol} disabled={(symbol === chartSelected)} onClick={handleClick} aria-label="Subscribe">
              <TrendingUpIcon />
            </IconButton>
            </span>
          </Tooltip>

          <Tooltip arrow title="Remover da lista" aria-label="chart">
            <IconButton aria-label="delete" onClick={handleDelete}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>

        </Box>
      </Box>
      <Divider />
    </>
  )
}
export default StockItem
