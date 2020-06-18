import React from 'react'
// eslint-disable-next-line no-unused-vars
import { useWs, IStock, WSSymbol } from './WSProvider'

import StockItem from './StockItem'
import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles'
import { Box, Fab, FormControl, InputLabel, Select, MenuItem, Input, Chip } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper
    },
    headerList: {
      textAlign: 'right',
      color: '#4cc3c4',
      borderColor: '#4cc3c4'
    },
    addButtom: {
      textAlign: 'right'
    },
    extendedIcon: {
      marginRight: theme.spacing(1)
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: '66%',
      textAlign: 'right'

    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    chip: {
      margin: 2
    },
    noLabel: {
      marginTop: theme.spacing(3)
    }
  })
)

const StockList: React.FC = () => {
  const classes = useStyles()
  const { initialConfig } = useWs()
  const [follows, setFollows] = React.useState<string[]>([])
  const [open, setOpen] = React.useState(false)

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFollows([event.target.value] as string[])
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <div style={{ width: '100%' }}>

      <Box boxShadow={3} p={4} m={2}>

        <FormControl className={classes.formControl}>
          <InputLabel id="controlled-open-select-label">Adicionar
          </InputLabel>
          <Select
            labelId="controlled-open-select-label"
            id="controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={follows}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {initialConfig?.stocksData.map(
        (stock, index) => {
          return (stock ? (
            <MenuItem key={index} value={stock.symbol}>{stock.companyName}</MenuItem>
          ) : null)
        })}
          </Select>
        </FormControl>
        <Fab size="small" color="secondary" aria-label="add" variant="round" onClick={handleOpen}>
          <AddIcon />

        </Fab>

        <Box borderBottom={2} mb={3} mt={1} component="div" display="block" className={classes.headerList}>
          Empresas
        </Box>
        {initialConfig?.stocksData.map(
        (stock, index) => {
          return (stock ? (
            <div key={index}>
              <StockItem>{stock as IStock}</StockItem>
            </div>
          ) : null)
        })}

      </Box>
    </div>
  )
}

export default StockList
