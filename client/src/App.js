import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import FullWrapAndCenter from './containers/FullWrapAndCenter'
import FullWrap from './containers/FullWrap'
import Layout from './layouts/Layout'
import BigAnimatedLogo from './components/BigAnimatedLogo'
import UserProfile from './components/UserProfile/'
import UsersGridLayout from './components/Explore/UsersGridLayout'
import Gear from './components/Gear/'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Form_Login from './components/Form_Login'
import Form_Signup from './components/Form_Signup'
import AccountSettings from './components/AccountSettings/AccountSettings'
import Logout from './components/Logout.js'
import { logoutUser } from './store/actions';
import muiThemeRoot from './muiThemeRoot'
import NotFound from './components/NotFound'
import withWidth from '@material-ui/core/withWidth';

class App extends Component {

  render() {
    
    const { width } = this.props;
    const currentKey = this.props.location.pathname.split('/')[1] || '/';

    return (
      <Layout>
        <TransitionGroup>
          <CSSTransition
            key={currentKey}
            timeout={400}
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
              <Route path="/accountsettings" component={
                FullWrapAndCenter(AccountSettings, width)} />
              <Route path="/user/:id" component={
                FullWrap(UserProfile)} />
              <Route path="/studios" component={
                FullWrap(UsersGridLayout)} />
              <Route path="/musicians" component={
                FullWrap(UsersGridLayout)} />
              <Route path="/gear" component={
                FullWrap(Gear)} />
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

export default muiThemeRoot(withRouter(connect(null, mapDispatchToProps)(withWidth()(App))));
