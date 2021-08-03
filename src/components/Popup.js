import {
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  Typography,
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import Controls from './controls/Controls'

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    position: 'absolute',
    padding: theme.spacing(2),
    top: theme.spacing(2),
  },
}))

export default function Popup(props) {
  const { title, children, openPopup, onClickClose } = props
  const classes = useStyles()

  return (
    <Dialog open={openPopup} classes={{ paper: classes.dialogWrapper }} maxWidth="sm">
      <DialogTitle>
        <div style={{ display: 'flex' }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Controls.ActionButton color="secondary" onClick={onClickClose}>
            <Close />
          </Controls.ActionButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  )
}
