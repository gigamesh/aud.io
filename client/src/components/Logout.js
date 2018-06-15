import React, { Component } from 'react'
import { connect } from 'react-redux';
import { logoutUser } from '../store/actions';
import { withRouter } from 'react-router-dom';
import Spinner from './UI/Spinner';

class Logout extends Component{
  
  componentDidMount(){
    this.props.logout(400);
    setTimeout(()=>{
      this.props.history.push('/')
    },500)
  }

  render(){
    return <Spinner/> 
  }
}


const mapDispatchToProps = dispatch =>{
  return {
    logout: (timeout) => dispatch(logoutUser(timeout))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Logout))
