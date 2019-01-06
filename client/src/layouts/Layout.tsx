import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import SideDrawer from "../components/navigation/SideDrawer";
import Header from "./Header";
import styled from "styled-components";

class Layout extends Component<any, any> {
  state = {
    showSideDrawer: false
  };

  toggleDrawer = () => {
    this.setState((prevState: any) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    let currentLocation = this.props.location.pathname.split("/")[1] || "/";

    const MainWrap = styled.div`
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 50px);
      width: calc(96%);
      max-width: 1400px;
      margin: 50px auto 0;
      transition: position 150ms;
    `;
    return (
      <React.Fragment>
        <Header
          history={this.props.history}
          path={currentLocation}
          drawerToggleClicked={() => this.toggleDrawer()}
        />

        <SideDrawer
          path={currentLocation}
          isopen={this.state.showSideDrawer}
          closeHandler={() => this.toggleDrawer()}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={() => this.toggleDrawer()}
            onKeyDown={() => this.toggleDrawer()}
          />
        </SideDrawer>
        <MainWrap>{this.props.children}</MainWrap>
      </React.Fragment>
    );
  }
}

export default withRouter(Layout);
