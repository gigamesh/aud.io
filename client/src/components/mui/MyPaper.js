import React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
// import styled from 'styled-components';
import './MyPaper.css'

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  },
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: '#1a1f22',
        border: '1px solid white'
      }
    }
  }
})

const MyPaper = (props)=>{
  let className = `paper${
    props.size_xs ? ' paper--xs' :
    props.size_s ? ' paper--s' :
    props.size_m ? ' paper--m' :
    props.size_xl ? ' paper--xl' :
    props.size_l ? ' paper--l' : ''}`

  className += props.form ? ' form' : '';

  return(
    <MuiThemeProvider theme={theme}>
      <Paper {...props} className={className}>
        {props.children}
      </Paper >
    </MuiThemeProvider> 
  )
}
export default MyPaper