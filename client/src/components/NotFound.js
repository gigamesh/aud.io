import React, { Component } from 'react'
// import { Redirect} from 'react-router-dom';

class NotFound extends Component{
  componentDidMount(){
    this.props.history.push('/')
  }

  render(){
    return (
      <div>
        <h1>404 Not found</h1>
      </div>
    )
  }
}

export default NotFound
