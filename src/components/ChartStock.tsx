import React, { useEffect, useState, useRef, useContext, useMemo } from 'react'
import { theme } from '../style/ChartTheme'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Box from '@material-ui/core/Box'
import ByneLogo from './../byne-verde.svg'
// eslint-disable-next-line no-unused-vars
import { GlobalContext } from '../context/Global'
import { MonitorContext } from '../context/Monitor'

Highcharts.setOptions(theme)

const ChartStock: React.FC = () => {
  const { state: { chartSelected } } = useContext(GlobalContext)
  const { ws: { monitor } } = useContext(MonitorContext)
  const [stockHistoy, setStockHistory] = useState<number[]>([])
  const price = useMemo(() => monitor.get(chartSelected!), [monitor, chartSelected])
  const chartRef: any = useRef()

  const allowChartUpdate = true

  useEffect(() => {
    (chartRef.current.chart.series[0].data.length <= 80)
      ? (chartRef.current.chart.series[0].addPoint(price as number, false, false, true))
      : (chartRef.current.chart.series[0].addPoint(price as number, false, false, true))
  }, [price])

  useEffect(() => {
    setStockHistory([])
  }, [chartSelected])

  const options: Highcharts.Options = {
    series: [
      {
        type: 'line',
        data: stockHistoy,
        name: price ? `${chartSelected} - ${Number(price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}` : ''
      }
    ],
    xAxis: {
      labels: {
        enabled: false
      },
      title: {
        text: null
      }
    },
    yAxis: {
      title: {
        text: null
      }
    },
    credits: { enabled: false },
    title: {
      text: ''
    },
    chart: {
      alignTicks: false,
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
        </Box>
      </div>
      <HighchartsReact highcharts={Highcharts} allowChartUpdate={allowChartUpdate} options={options} ref= {chartRef} />
    </>
  )
}
export default ChartStock
