import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../store/actions";
import { withRouter } from "react-router-dom";
import WaveformLoader from "./UI/WaveformLoader";

class Logout extends Component<any, any> {
  componentDidMount() {
    this.props.logout(400);
    setTimeout(() => {
      this.props.history.push("/");
    }, 500);
  }

  render() {
    return <WaveformLoader />;
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    logout: (timeout: number) => {
      dispatch(logoutUser(timeout));
    }
  };
};

export default withRouter(connect(
  null,
  mapDispatchToProps
)(Logout) as any);
