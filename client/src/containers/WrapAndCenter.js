import React from 'react';

const style = {
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  }
}

const WrapAndCenter = (props) => (
  <div style={style.flexCenter}>
    {props.children}
  </div>
);

export default WrapAndCenter;
