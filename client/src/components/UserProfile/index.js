import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import ProfileHeaderCard from './ProfileHeaderCard'
import ProfileTabs from './ProfileTabs'
import Spinner from '../UI/Spinner';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import {profileDataInit} from '../../store/actions'

class UserProfile extends Component {

  componentDidMount(){
    this.pathId = this.props.match.params.id;
    // console.log(userId);
    if(!this.props.currentProfileId || this.props.currentProfileId !== this.pathId){
      this.props.getProfileData(this.pathId);
    }
  }

  render() {
    if(this.props.user.errorMsg){
      return <div>{this.props.user.errorMsg}</div>
    }
    return this.props.loading ? <Spinner/>
    : (
      <React.Fragment>
        <ProfileHeaderCard 
          user={this.props.user}
          pathId={this.pathId}/>
        <ProfileTabs>
        </ProfileTabs>
      </React.Fragment>
    ) 
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  loading: state.user.loading,
  error: state.user.error,
  currentcurrentProfileId: state.user.currentProfileId
})

const mapDispatchToProps = dispatch => ({
  getProfileData: currentProfileId => dispatch(profileDataInit(currentProfileId))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withMobileDialog()(UserProfile)))
