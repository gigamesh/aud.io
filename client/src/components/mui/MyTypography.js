import React from 'react'
import Typography from '@material-ui/core/Typography';

export default (props) => {
  return (
    <Typography color='inherit' {...props}>
      {props.children}
    </Typography>
  )
}
