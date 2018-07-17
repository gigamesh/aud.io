import React from 'react'
import FormControl from '@material-ui/core/FormControl';

import styled from 'styled-components'

const MyFormControl = styled(FormControl)`
  ${props => (props.horizontalcenter ? 
    `justify-content: center;
    align-items: center;
    ` : null)}
`

export default (props) => {
  return (
    <MyFormControl {...props} error={!!props.error}>
      {props.children}
    </MyFormControl>
  )
}
