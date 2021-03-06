import React, { Component } from "react";
import styled from "styled-components";

const LogoWrap = styled.div`
  user-select: none;
  margin: 0;
  position: relative;
  top: -32px;
  width: 100%;
  max-width: 1100px;
  min-width: 320px;
  background: url("/logo-fallback.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  img {
    width: 100%;
    height: auto;
  }
  @media (min-width: 500px) and (max-width: 1400px) {
    max-width: 75vw;
  }
`;

class BigAnimatedLogo extends Component {
  state = {
    logoAnim: new Image(),
    animLoaded: false
  };
  componentDidMount() {
    const { logoAnim } = this.state;
    logoAnim.src = "/logo.gif";
    logoAnim.onload = this.handleAnimLoaded;
  }

  handleAnimLoaded = () => {
    this.setState({ animLoaded: true });
  };

  render() {
    return (
      <LogoWrap>
        {this.state.animLoaded ? (
          <img src="/logo.gif" alt="Logo Animation" />
        ) : null}
        {!this.state.animLoaded ? (
          <img src="/logo-fallback.png" alt="Logo" />
        ) : null}
      </LogoWrap>
    );
  }
}

export default BigAnimatedLogo;
