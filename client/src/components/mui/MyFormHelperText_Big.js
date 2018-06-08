import React from 'react'
import FormHelperText from '@material-ui/core/FormHelperText';

import styled from 'styled-components';

const MyFormHelperTextBig = styled(FormHelperText)`
  position: absolute; 
  left: 0; 
  bottom: 0;
  font-size: 1rem;
`

export default (props) => {
  return (
    <MyFormHelperTextBig {...props}>
      {props.children}
    </MyFormHelperTextBig>
  )
}
