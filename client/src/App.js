import React, { Component } from 'react';
import { Route, Switch, withRouter} from 'react-router-dom';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import WrapAndCenter from './containers/WrapAndCenter'
import Layout from './layouts/Layout'
import BigAnimatedLogo from './components/BigAnimatedLogo'
import UserProfile from './components/UserProfile/'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Form_Login from './components/Form_Login'
import Form_Signup from './components/Form_Signup'
import Logout from './components/Logout.js'
import muiThemeRoot from './muiThemeRoot'
import NotFound from './components/NotFound'

class App extends Component {
  render() {
    const currentKey = this.props.location.pathname.split('/')[1] || '/';
    return (
      <Layout>
        <TransitionGroup>
          <CSSTransition
            key={currentKey}
            timeout={300}
            classNames="fade"
            appear
            >
            <Switch location={this.props.location} key="switch">
              <Route path="/" exact component={
                // BigAnimatedLogo} />
                WrapAndCenter(BigAnimatedLogo)} />
              <Route path="/login" component={
                // Form_Login} />
                 WrapAndCenter(Form_Login)} /> 
              <Route path="/logout" component={
                // Logout} />
                WrapAndCenter(Logout)} />
              <Route path="/user/:id" component={
                // UserProfile} />
                WrapAndCenter(UserProfile)} />
              <Route path="/directory" component={
                // BigAnimatedLogo} />
                WrapAndCenter(BigAnimatedLogo)} />
              <Route path="/signup" component={
                // Form_Signup} />
                WrapAndCenter(Form_Signup)} />
              <Route component={WrapAndCenter(NotFound)} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>            
      </Layout>
    );
  }
}

export default muiThemeRoot(withRouter(App));
