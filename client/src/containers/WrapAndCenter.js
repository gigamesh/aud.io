import React, { Component } from 'react';
import styled from 'styled-components'

const WrapAndCenter = (WrappedComp) => {
  const FullPageWrapper = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;  
  `
  return class extends Component {
    render(){
      return (
        <FullPageWrapper>
          <WrappedComp {...this.props}/>
        </FullPageWrapper>
      )
    }
  }
};

export default WrapAndCenter;
