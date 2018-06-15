import React, { Component } from 'react';
import styled from 'styled-components';

const LogoWrap = styled.div`
    user-select: none;
    margin: 0;
    position: relative;
    top: -32px;
    width: 100%;
    /* transform: scale(.2); */

       /* &.size { */
      max-width: 1300px;
      min-width: 320px;
    /* } */

    > svg {
      font-family: 'Comfortaa', cursive;
      width: 100%;
      height: auto;
      font-size: 140px;
      text-transform: lowercase;
      letter-spacing: -10px;
      filter: brightness(120%);

    > .img-layer {
        fill: url(#p-img);
      }

    > .gradient-layer {
        fill: url(#gr-overlay);
      }
    }
  }
`

class BigAnimatedLogo extends Component {
  render(){
    return (
      <LogoWrap>
        <svg viewBox="0 0 500 130">
          <pattern
            id="p-img"
            viewBox="0 0 220 100"
            patternUnits="userSpaceOnUse"
            width="200%" height="200%"
            x="-50%" y="-10%">
            <image xlinkHref="https://i.giphy.com/media/Clqg5UYRiei6Q/giphy.webp" width="300" height="130"/>
          </pattern>
          <text textAnchor="middle"
            x="50%"
            y="50%"
            dy=".35em"
            className="img-layer">
            aud.io
          </text>
          <linearGradient id="gr-overlay" x1="0" y1="0" x2="100%" y2="100%">
            <stop stopColor="hsla(50, 100%, 70%, 0.2)" offset="10%"/>
            <stop stopColor="hsla(200, 100%, 60%, .5)" offset="50%"/>
            <stop stopColor="hsla(320, 100%, 50%, .5)" offset="90%"/>
          </linearGradient>
          <text textAnchor="middle"
            x="50%"
            y="50%"
            dy=".35em"
            className="gradient-layer">
            aud.io
          </text>
        </svg>
      </LogoWrap>
    )
  }
};

export default BigAnimatedLogo;
