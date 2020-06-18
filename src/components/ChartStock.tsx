import React, { useEffect, useState, useRef } from 'react'
import { theme } from './ChartTheme'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Box from '@material-ui/core/Box'
import ByneLogo from './../byne-verde.svg'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'

import Select from '@material-ui/core/Select'
// eslint-disable-next-line no-unused-vars
import { useWs, WSSymbol } from './WSProvider'
import { makeStyles, createStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    price: {
      textAlign: 'center',
      fontSize: 28,
      fontWeight: 500,
      color: '#f27a41'

    }
  })
)

Highcharts.setOptions(theme)

const ChartStock: React.FC = (children) => {
  const { monitor, stockSymbols, isSubscribed } = useWs()
  const classes = useStyles()
  const [stockHistoy, setStockHistory] = useState<number[]>([])
  const [symbol, setSymbol] = useState<WSSymbol>()

  const chartRef: any = useRef()
  const allowChartUpdate = true

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    setSymbol(event.target.value as WSSymbol)
    setStockHistory([])
  }

  useEffect(() => {
    (stockHistoy.length <= 150)
      ? (setStockHistory([...stockHistoy, [...[monitor.get(symbol as WSSymbol)]]] as number[]))
      : (chartRef.current.chart.series[0].addPoint(monitor.get(symbol as WSSymbol) as number, true, true))
  }, [monitor.get(symbol as WSSymbol)])

  useEffect(() => {
    if (!(isSubscribed(symbol as WSSymbol))) {
      setStockHistory([])
    }
  },
  [stockSymbols])

  const options: Highcharts.Options = {
    series: [
      {
        type: 'line',
        data: stockHistoy,
        name: symbol as string
      }
    ],
    xAxis: {

      title: {
        text: null
      }
    },
    yAxis: {

      labels: {
        enabled: false
      }
    },
    credits: { enabled: false },
    title: {
      text: ''
    },
    chart: {
      backgroundColor: {
        linearGradient: { x1: 1, x2: 1, y1: 0, y2: 1 },
        stops: [
          [0, 'rgb(33, 49, 75)'],
          [1, 'rgb(42, 46, 54)']
        ]
      },
      animation: false
    }
  }
  return (
    <>
      <div style={{ width: '100%', margin: 0, padding: 0 }}>
        <Box display="flex" m={0} p={0} bgcolor="rgb(33, 49, 75)">
          <Box p={3} flexGrow={1} >
            <img src={ByneLogo} style={{ color: '#FFF' }} alt="BYNE – Comunicação crítica, mais simples e eficiente" />
          </Box>
          <Box p={3} flexGrow={4} className={classes.price} >
            {symbol && (Number(monitor.get(symbol as WSSymbol)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))}
          </Box>
          <Box pr={4} display="row-reverse" justifyContent="flex-end">

            <FormControl disabled = {stockSymbols.length <= 0} >
              <InputLabel id="demo-simple-select-helper-label">Empresas</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={symbol}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {stockSymbols.map((stocksActived, index) => (<MenuItem key={index} value={stocksActived}>{stocksActived}</MenuItem>))}
              </Select>
              <FormHelperText>Selecione uma empresa para exibir no gráfico</FormHelperText>
            </FormControl>

          </Box>
        </Box>
      </div>
      <HighchartsReact highcharts={Highcharts} allowChartUpdate={allowChartUpdate} options={options} ref= {chartRef} />
    </>
  )
}

export default ChartStock
