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
        {}
        <img src="/logo.gif" alt="Logo Animation" />
      </LogoWrap>
    );
  }
}

export default BigAnimatedLogo;
