import React from 'react'
import { makeStyles, CssBaseline, ThemeProvider } from '@material-ui/core'
import { createTheme } from '@material-ui/core/styles'
import SideMenu from '../components/SideMenu'
import Header from '../components/Header'
import Employees from '../pages/Employees'

const theme = createTheme({
  palette: {
    primary: {
      main: '#333996',
      light: '#3c44b126',
    },
    secondary: {
      main: '#f83245',
      light: '#ffe1e4',
    },
    background: {
      default: '#f4f5fd',
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: 'translateZ(0)',
      },
    },
  },
})

const useStyles = makeStyles((theme) => ({
  appMain: {
    // paddingLeft: '260px',
    width: '100%',
  },
}))

export default function App() {
  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>
      {/* <SideMenu /> */}
      <div className={classes.appMain}>
        <Header />
        <Employees />
      </div>
      <CssBaseline />
    </ThemeProvider>
  )
}
