import { makeStyles, Button as MuiButton } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
  },
  label: {
    textTransform: 'none',
  },
}))

export default function Button(props) {
  const { text, size, variant, color, onClick, ...rest } = props
  const classes = useStyles()

  return (
    <MuiButton
      variant={variant || 'contained'}
      size={size || 'large'}
      color={color || 'primary'}
      onClick={onClick}
      classes={{ root: classes.root, label: classes.label }}
      {...rest}
    >
      {text}
    </MuiButton>
  )
}
