import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import './MyPaper.css'

const styles = theme => ({
  palette: {
    type: 'dark'
  }
});

const MyPaper = (props)=>{
  let className = `paper${
    props.size_xs ? ' paper--xs' :
    props.size_s ? ' paper--s' :
    props.size_m ? ' paper--m' :
    props.size_xl ? ' paper--xl' :
    props.size_l ? ' paper--l' : ''}`

  className += props.form ? ' form' : '';

  return(
      <Paper className={className}>
        {props.children}
      </Paper >
  )
}
export default withStyles(styles)(MyPaper)