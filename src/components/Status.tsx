import React, { useContext } from 'react'
import { GlobalContext } from '../context/Context'
import { useStyles } from '../style/Style'

const Status: React.FC = () => {
  const classes = useStyles()
  const { state: { isConnected } } = useContext(GlobalContext)

  return (
    <small>
      <span className={classes.status}>[status: </span>{isConnected ? (<span className={classes.connect}>conectado</span>) : (<span className={classes.disconnect}>desconectado</span>) }<span className={classes.status}>]</span>
    </small>)
}
export default Status
