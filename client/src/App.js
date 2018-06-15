import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import FullWrapAndCenter from './containers/FullWrapAndCenter'
import FullWrap from './containers/FullWrap'
import Layout from './layouts/Layout'
import BigAnimatedLogo from './components/BigAnimatedLogo'
import UserProfile from './components/UserProfile/'
import Directory from './components/Directory/'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Form_Login from './components/Form_Login'
import Form_Signup from './components/Form_Signup'
import Logout from './components/Logout.js'
import { logoutUser } from './store/actions';
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
                FullWrapAndCenter(BigAnimatedLogo)} />
              <Route path="/login" component={
                 FullWrapAndCenter(Form_Login)} /> 
              <Route path="/logout" component={
                FullWrapAndCenter(Logout)} />
              <Route path="/user/:id" component={
                FullWrap(UserProfile)} />
              <Route path="/directory" component={
                FullWrap(Directory)} />
              <Route path="/signup" component={
                FullWrapAndCenter(Form_Signup)} />
              <Route component={FullWrapAndCenter(NotFound)} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>            
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    logout: (timeout) => dispatch(logoutUser(timeout))
  }
}

export default muiThemeRoot(withRouter(connect(null, mapDispatchToProps)(App)));
