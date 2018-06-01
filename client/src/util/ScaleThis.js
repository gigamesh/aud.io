import React, { Component } from 'react'

function ScaleThis(WrappedComp, options){
  
  return class extends Component {
    render() {
      return  <WrappedComp {...this.props} />;
    }
  }
}

export default ScaleThis