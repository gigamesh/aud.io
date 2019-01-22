import React from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography';

const CenterWrap = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Gear = () => {
  return (
    <CenterWrap>
      <Typography align='center' variant='display2' style={{transform: 'translate(0,-100%)'}}>
        Coming soon!
      </Typography>
    </CenterWrap>
  )
}

export default Gear
