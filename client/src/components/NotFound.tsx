import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";

class NotFound extends Component<RouteComponentProps, {}> {
  componentDidMount() {
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <h1>404 Not found</h1>
      </div>
    );
  }
}

export default NotFound;
