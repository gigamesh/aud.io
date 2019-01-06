import React, { Component } from "react";
import styled, { StyledFunction } from "styled-components";

const FullWrapAndCenter = (WrappedComp: any, currentwidth?: string) => {
  const fullPageWrapper: StyledFunction<any & React.HTMLProps<HTMLElement>> =
    styled.div;

  const FullPageWrapper = fullPageWrapper`
    position: absolute;
    top: 0;
    left: 0;
    display: ${({ currentwidth }) => (currentwidth !== "xs" ? "flex" : "")};
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  `;
  return class extends Component {
    render() {
      return (
        <FullPageWrapper currentwidth={currentwidth}>
          <WrappedComp {...this.props} />
        </FullPageWrapper>
      );
    }
  };
};

export default FullWrapAndCenter;
