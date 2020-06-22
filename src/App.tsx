import React from 'react'
import { GlobalProvider } from './context/Global'
import { MonitorProvider } from './context/Monitor'
import StockList from './components/StockList'
import ChartStock from './components/ChartStock'
import Status from './components/Status'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme, Box, Typography, Container } from '@material-ui/core'
import { teal, orange } from '@material-ui/core/colors'
import WSControl from './components/WSControl'

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
  return (
    <GlobalProvider>

      <ThemeProvider theme={darkTheme}>
        <Typography component="div">
          <MonitorProvider>
            <WSControl></WSControl>
            <ChartStock></ChartStock>
            <Container maxWidth="lg" >
              <StockList></StockList>
            </Container>
          </MonitorProvider>
          <Box position="fixed" bottom="0%" right="0%">
            <Status ></Status>
          </Box>
        </Typography>
      </ThemeProvider>
    </GlobalProvider>
  )
}
export default App
