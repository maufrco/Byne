import React, { useState } from 'react'
// import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
// eslint-disable-next-line no-unused-vars
import { useWs, WSSymbol } from './WSProvider'

const ChartSelect: React.FC = () => {
  const { stockSymbols } = useWs()
  const [chartSelected, setChartSelected] = useState<WSSymbol>()
  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    setChartSelected(event.target.name)
  }
  // setChartSelected(event.target.value)
  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="symbols-selected">Visualizar gráfico</InputLabel>
      <Select
        native
        value={chartSelected}
        onChange={handleChange}
        inputProps={{
          name: 'stocksActived',
          id: 'symbols-selected'
        }}>
        <option aria-label="None" value="" />
        {stockSymbols.map((stocksActived) => <option value={stocksActived}>{stocksActived}</option>)}
      </Select>
    </FormControl>
  )
}
export default ChartSelect
