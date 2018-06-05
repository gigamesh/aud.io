import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect} from 'react-router-dom';
import WrapAndCenter from './containers/WrapAndCenter'
import Layout from './layouts/Layout'
import BigAnimatedLogo from './components/BigAnimatedLogo'
import UserProfile from './components/UserProfile'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Form_Login from './components/Form_Login'
import Form_Signup from './components/Form_Signup'
import muiThemeRoot from './muiThemeRoot'


class App extends Component {
  render() {
    // const theme = createMuiTheme(MuiTheme);
 
    return (
  //  <MuiThemeProvider theme={theme}>
  //    <CssBaseline/>
      <Layout>
        <Route render={({ location })=> (   
            <TransitionGroup>
              <CSSTransition
                key={location.key}
                timeout={300}
                classNames="fade">
                <Switch location={location}>
                  <Route path="/" exact component={WrapAndCenter(BigAnimatedLogo)} />
                  <Route path="/login" exact component={WrapAndCenter(Form_Login)} />
                  <Route path="/user/:id" exact component={WrapAndCenter(UserProfile)} />
                  <Route path="/signup" exact component={WrapAndCenter(Form_Signup)} />
                  <Redirect to='/'/>
                </Switch>
              </CSSTransition>
            </TransitionGroup>            
        )}/>
      </Layout>
  //  </MuiThemeProvider>
    );
  }
}

export default muiThemeRoot(withRouter(App));
