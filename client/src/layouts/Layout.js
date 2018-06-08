import React, {Component} from 'react';
// import { connect } from 'react-redux';
import SideDrawer from './../components/navigation/SideDrawer';
import Header from './Header'
import styled from 'styled-components'

const MainWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 64px);
  width: calc(100% - 40px);
  max-width: 1400px;
  /* background: lightgreen; */
  margin: 64px auto;
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

    return (
    <React.Fragment>
      <Header
        drawerToggleClicked={()=> this.toggleDrawer()}/>

      <SideDrawer 
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
        <MainWrap>
          {this.props.children}
        </MainWrap>
    </React.Fragment>
    );
  }
};

export default Layout;
