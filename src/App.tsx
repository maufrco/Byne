import React from 'react'
import WSProvider, { useWs } from './components/WSProvider'
import StockList from './components/StockList'
import ChartStock from './components/ChartStock'
import Status from './components/Status'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core'

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark'
  }
})
const App: React.FC = () => {
  const { initialConfig } = useWs()
  return (
    <WSProvider>
      <ThemeProvider theme={darkTheme}>
        <ChartStock>{initialConfig?.stocksData[0]}</ChartStock>
        <StockList></StockList>
        <Status></Status>
      </ThemeProvider>
    </WSProvider>
  )
}
export default App
