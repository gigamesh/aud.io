import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../store/actions";
import { withRouter } from "react-router-dom";
import WaveformLoader from "./UI/WaveformLoader";

class Logout extends Component {
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

const mapDispatchToProps = dispatch => {
  return {
    logout: timeout => {
      dispatch(logoutUser(timeout));
      //add a dispach that clears the search data
    }
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Logout)
);
