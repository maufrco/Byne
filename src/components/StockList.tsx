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
      minWidth: '70%',
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

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}
const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder'
]

function getStyles (name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  }
}
const StockList: React.FC = () => {
  const classes = useStyles()
  const theme = useTheme()
  const [personName, setPersonName] = React.useState<string[]>([])
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPersonName(event.target.value as string[])
  }

  const { initialConfig } = useWs()
  return (
    <div style={{ width: '100%' }}>

      <Box boxShadow={3} p={4} m={2}>

        <FormControl className={classes.formControl}>
          <Select
            labelId="demo-mutiple-chip-label"
            id="demo-mutiple-chip"
            multiple
            value={personName}
            autoWidth={true}
            fullWidth={true}
            onChange={handleChange}
            input={<Input id="select-multiple-chip" />}
            renderValue={(selected) => (
              <div className={classes.chips}>
                {(selected as string[]).map((value) => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                {name}
              </MenuItem>
            ))}
          </Select>
          <Fab color="secondary" aria-label="add" variant="extended">
            <AddIcon className={classes.extendedIcon} />
            Adicionar
          </Fab>
        </FormControl>

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
