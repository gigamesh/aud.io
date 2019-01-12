import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { logoutUser } from "../store/actions";
import { withRouter, RouteComponentProps } from "react-router-dom";
import WaveformLoader from "./UI/WaveformLoader";

type LogoutProps = RouteComponentProps & ReturnType<typeof mapDispatchToProps>;

class Logout extends Component<LogoutProps, {}> {
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

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    logout: (timeout: number) => {
      dispatch(logoutUser(timeout));
    }
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Logout)
);
