import { makeStyles, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    top: theme.spacing(10),
  },
}))

export default function Notification(props) {
  const classes = useStyles()
  const { notify, setNotify } = props

  const handleClose = (event, reason) => {
    if (reason == 'clickaway') return

    setNotify({
      ...notify,
      isOpen: false,
    })
  }
  return (
    <Snackbar
      open={notify.isOpen}
      autoHideDuration={3000}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      onClose={handleClose}
      className={classes.root}
    >
      <Alert severity={notify.type} onClose={handleClose}>
        {notify.message}
      </Alert>
    </Snackbar>
  )
}
