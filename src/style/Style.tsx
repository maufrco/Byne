// eslint-disable-next-line no-unused-vars
import { makeStyles, createStyles, Theme } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    price: {
      textAlign: 'center',
      fontSize: 28,
      fontWeight: 500,
      color: '#f27a41'

    },
    containerItem: {
      borderColor: '#333',
      borderBottom: 1,
      paddingTop: 3,
      paddingBottom: 3
    },
    symbol: {
      color: '#f27a41'
    },
    phrase: {

      fontWeight: 300,
      fontSize: 13,
      color: '#666'
    },
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper
    },
    headerList: {
      textAlign: 'right',
      color: '#4cc3c4',
      borderColor: '#4cc3c4'
    },
    status: {
      color: 'rgba(255, 255, 255, 0.5)'
    },
    connect: {
      color: theme.palette.primary.dark
    },
    disconnect: {
      color: theme.palette.error.dark
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
