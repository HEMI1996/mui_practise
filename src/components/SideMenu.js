import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  sideMenu: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    left: '0px',
    width: '260px',
    height: '100%',
    backgroundColor: '#253053',
  },
}))

export default function Sidemenu() {
  const classes = useStyles()

  return <div className={classes.sideMenu}></div>
}
