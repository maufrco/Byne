import React, { useContext } from 'react'
import { WSProvider, GlobalContext } from './context/Context'
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
  const { state: { isConnected } } = useContext(GlobalContext)

  return (
    <WSProvider>
      <WSControl></WSControl>
      <ThemeProvider theme={darkTheme}>
        <Typography component="div">

          <Box>
            <ChartStock></ChartStock>
          </Box>
          <Container maxWidth="lg" >

            <StockList></StockList>

          </Container>
          <Box position="fixed"
            bottom="0%"
            right="0%"><Status ></Status></Box>
        </Typography>
      </ThemeProvider>
    </WSProvider>
  )
}
export default App
