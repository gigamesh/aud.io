import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiTheme from './styles_main/MuiTheme'

const theme = createMuiTheme(MuiTheme);

function muiThemeRoot(Component) {
  function MuiThemeRoot(props) {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return MuiThemeRoot;
}

export default muiThemeRoot;
