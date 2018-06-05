import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../store/actions';

class UserProfile extends Component {

  componentDidMount(){
    // this.props.dispatch(loginUser)
  }

  render() {
    return (
      <div>
        user profile
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps)(UserProfile)
