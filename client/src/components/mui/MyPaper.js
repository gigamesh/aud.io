import React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

const theme = createMuiTheme({
  palette: {
    type: 'light'
  }
  
})

const PaperStyled = styled(Paper)`
  margin: 10px;
  padding: ${props => props.padding};
`

const MyPaper = (props)=>{
    return(
      <MuiThemeProvider theme={theme}>
        <PaperStyled padding={props.padding}>
          {props.children}
        </PaperStyled>
      </MuiThemeProvider>
    )
}

export default MyPaper