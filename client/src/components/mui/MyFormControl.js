import React from 'react'
import FormControl from '@material-ui/core/FormControl';

export default (props) => {
  return (
    <FormControl {...props} error={!!props.error}>
      {props.children}
    </FormControl>
  )
}
