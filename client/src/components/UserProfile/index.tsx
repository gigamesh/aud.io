import * as React from "react";
import { withRouter } from "react-router-dom";
import { RootState } from "../../store/reducers";
import { connect } from "react-redux";
import ProfileHeaderCard from "./ProfileHeaderCard";
import ProfileTabs from "./ProfileTabs";
import WaveformLoader from "../UI/WaveformLoader";
import { profileDataInit } from "../../store/actions";

class UserProfile extends React.Component<any, any> {
  pathId: string | undefined;

  componentDidMount() {
    this.pathId = this.props.match.params.id;
    // prevents geting profile data again if user just signedup or logged in
    let prevPath = this.props.location.state
      ? this.props.location.state.prevPath
      : undefined;
    if (prevPath === "/login" || prevPath === "/signup") {
      return null;
    }

    //the line below checks to see if the user is coming from the login path
    if (this.props.getUserLogger < 2) {
      return null;
    }

    if (
      !this.props.currentProfileId ||
      this.props.currentProfileId !== this.pathId
    ) {
      this.props.getProfileData(this.pathId);
    }
  }

  render() {
    if (this.props.user.errorMsg) {
      return <div>{this.props.user.errorMsg}</div>;
    }
    return (
      <React.Fragment>
        <ProfileHeaderCard pathId={this.pathId} />
        <ProfileTabs />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  user: state.user,
  loading: state.user.loading,
  error: state.user.error,
  currentProfileId: state.user.currentProfileId,
  getUserLogger: state.user.getUserLogger
});

const mapDispatchToProps = (dispatch: any) => ({
  getProfileData: (id: string) => dispatch(profileDataInit(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserProfile));
