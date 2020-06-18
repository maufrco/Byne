import React from 'react'
import WSProvider, { useWs } from './components/WSProvider'
import StockList from './components/StockList'
import ChartStock from './components/ChartStock'
import Status from './components/Status'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme, Box, Typography, Container } from '@material-ui/core'
import { teal, orange } from '@material-ui/core/colors'

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: teal,
    secondary: orange,
    background: {
      paper: '#2a2f39'
    }
  },
  typography: {
    fontFamily: ' Helvetica Now, Arial'
  }
})
const App: React.FC = () => {
  const { initialConfig } = useWs()
  return (
    <WSProvider>
      <ThemeProvider theme={darkTheme}>
        <Typography component="div">
          <Box >
            <ChartStock>{initialConfig?.stocksData[0]}</ChartStock>
          </Box>
          <Container maxWidth="lg">
            <StockList></StockList>
            <Status></Status>
          </Container>
        </Typography>
      </ThemeProvider>
    </WSProvider>
  )
}
export default App
