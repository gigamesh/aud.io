import React, { Component } from "react";
import styled from "styled-components";

const FullWrap = (WrappedComp: any) => {
  const FullPageWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  `;
  return class extends Component {
    render() {
      return (
        <FullPageWrapper>
          <WrappedComp {...this.props} />
        </FullPageWrapper>
      );
    }
  };
};

export default FullWrap;
