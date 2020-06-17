import React, { useEffect, useState, useRef } from 'react'
import { theme } from './ChartTheme'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Box from '@material-ui/core/Box'

import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'

import Select from '@material-ui/core/Select'
// eslint-disable-next-line no-unused-vars
import { useWs, WSSymbol } from './WSProvider'

Highcharts.setOptions(theme)

const ChartStock: React.FC = (children) => {
  const { monitor, stockSymbols, isSubscribed } = useWs()

  const [stockHistoy, setStockHistory] = useState<number[]>([])
  const [symbol, setSymbol] = useState<WSSymbol>()

  const chartRef: any = useRef()
  const allowChartUpdate = true

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    setSymbol(event.target.value as WSSymbol)
  }

  useEffect(() => {
    (stockHistoy.length <= 100)
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

      labels: {
        enabled: false
      }
    },
    chart: {
      animation: false,
      backgroundColor: {
        linearGradient: { x1: 0, x2: 0, y1: 1, y2: 0 },
        stops: [
          [0, 'rgb(0, 0, 0)'],
          [0.3, 'rgb(12, 12, 13)'],

          [1, 'rgb(33, 49, 75)']
        ]
      }

    },
    credits: { enabled: false },
    title: {
      text: ''
    }
  }
  return (
    <>
      <div style={{ width: '100%', margin: 0, padding: 0 }}>
        <Box display="flex" justifyContent="flex-end" m={0} p={0} bgcolor="rgb(33, 49, 75)">
          <Box display="row-reverse" justifyContent="flex-end">
            {stockSymbols.length > 0 && (
              <FormControl >
                <InputLabel id="demo-simple-select-helper-label">None</InputLabel>
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
            )}
          </Box>
        </Box>
      </div>
      <HighchartsReact highcharts={Highcharts} allowChartUpdate={allowChartUpdate} options={options} ref= {chartRef} />
    </>
  )
}

export default ChartStock
