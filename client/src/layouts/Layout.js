import React, {Component} from 'react';
// import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import SideDrawer from './../components/navigation/SideDrawer';
import Header from './Header'
import styled from 'styled-components'

const MainWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 64px);
  width: calc(96%);
  max-width: 1400px;
  /* background: lightgreen; */
  margin: 64px auto 0;
`

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  toggleDrawer = () => {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer};
    });
  };

  render() {
    let currentLocation = this.props.location.pathname.split('/')[1] || '/';
    return (
    <React.Fragment>
      <Header
        path={currentLocation}
        drawerToggleClicked={()=> this.toggleDrawer()}/>

      <SideDrawer 
        path={currentLocation}
        isOpen={this.state.showSideDrawer}
        closeHandler={()=> this.toggleDrawer()}>
        <div
          tabIndex={0}
          role="button"
          onClick={()=> this.toggleDrawer()}
          onKeyDown={()=> this.toggleDrawer()}
        >
        </div>
      </SideDrawer>
        <MainWrap path={currentLocation}>
          {this.props.children}
        </MainWrap>
    </React.Fragment>
    );
  }
};

export default withRouter(Layout);
