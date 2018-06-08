import React, { Component } from 'react';
import Spinner from '../components/UI/Spinner';
import { auth } from '../store/actions';
import { connect } from 'react-redux';

export default function(ComposedClass, reload){
  class Auth extends Component {

    // state = {
    //   loading: true
    // }

    componentWillMount(){
      this.props.dispatch(auth())
    }

    componentWillReceiveProps(nextProps){
      // this.setState({loading:false});

      if(!nextProps.user.isAuth){
        if(reload){
        this.props.history.push('/login');
        }
      } else {
        if(reload === false){
          let id = nextProps.user.userData._id
        this.props.history.push(`/user/${id}`);
        }
      }
    }

    render(){
      if(this.props.loading){
        return <Spinner/>
      }
      return(
        <ComposedClass {...this.props} user={this.props.user}/>
      )
    }
  }

  function mapStateToProps(state){
    return {
      user: state.user,
      loading: state.user.loading
    }
  }
  return connect(mapStateToProps)(Auth)
}
