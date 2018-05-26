import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Layout from './layouts/Layout'
import WrapAndCenter from './containers/WrapAndCenter'
import BigAnimatedLogo from './components/BigAnimatedLogo'
import Form_Login from './components/Form_Login'
// import Footer from './components/layouts/Footer'
// import axios from 'axios';

class App extends Component {
  render() {
    const theme = createMuiTheme({
      breakpoints: {
        values: {
          sm: 730
        }
      },
      typography: {
        fontWeightLight: 100,
        fontWeightRegular: 300,
        fontWeightMedium: 500,
        fontFamily: "Lato",
        button: {
          fontWeight: 300
        }
      },
      palette: {
        type: 'dark',
        primary: {
          main: '#1a1f22',
        },
        secondary: {
          main: '#bbdefb',
        },
        error: {
          main: '#f44336',
        },
        background: {
          paper: '#1a1f22',
          default: '#1a1f22'
        }
      },
      overrides: {
        MuiPaper: {
          root: {
            color: 'white',
          }
        },
        MuiInput: {
          root: {
            color: 'inherit'
          }
        },
        MuiInputLabel: {
          root: {
            // color: '#626f7e'
          }
        }
      }
    });
 
    let routes = (
      <WrapAndCenter>
        <Switch>
          <Route path="/" exact component={BigAnimatedLogo} />
          <Route path="/login" exact component={Form_Login} />

        {/* this redirects if any other route is manually entered. ex: /:anything */}
          <Redirect to='/'/>
        </Switch>
      </WrapAndCenter>
    );
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline/>
        <Layout>
          {routes}
        </Layout>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(App);
