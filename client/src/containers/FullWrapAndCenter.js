import React, { Component } from 'react';
import styled from 'styled-components'

const FullWrapAndCenter = (WrappedComp, currentwidth) => {
  const FullPageWrapper = styled.div.attrs({
    currentwidth: currentwidth
  })`
    position: absolute;
    top: 0;
    left: 0;
    display: ${props => props.currentwidth !== 'xs' ? 'flex' : ''};
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
