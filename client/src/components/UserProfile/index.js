import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProfileData } from '../../store/actions';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

class UserProfile extends Component {


  componentDidMount(){
    // this.props.getProfileData('5b1348c4c6119731c85565b9');
  }

  render() {
    let user = this.props.user;
    
    return (  
      <Grid container spacing={8} style={{width: '100%', height: '100%',marginTop: -8}}>
        <Grid item xs={12} sm={4}>
          <img src="/img/avatar.jpg" alt="Profile" style={{width: '100%'}} />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="display3" style={{fontWeight: 500}}>
            {user.userData ? user.userData.profilename : ''}
          </Typography>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  // getProfileData: currentProfileId => dispatch(getProfileData(currentProfileId))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
