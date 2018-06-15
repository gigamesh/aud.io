import React, { Component } from 'react';
import styled from 'styled-components'

const FullWrapAndCenter = (WrappedComp) => {
  const FullPageWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;  
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

export default FullWrapAndCenter;
