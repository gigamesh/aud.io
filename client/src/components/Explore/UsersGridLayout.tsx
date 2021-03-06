import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../store/reducers";
import styled from "styled-components";
import { getUsers } from "../../store/actions";
import WaveformLoader from "../UI/WaveformLoader";
import Grid from "@material-ui/core/Grid";
import UserCard from "./UserCard";
import { IUser, IObj } from "../../typeDefs";

interface Props {
  location: IObj;
  users: Array<IUser>;
  dispatchGetUsers: Function;
  searchBoxTouched: boolean;
  loading: boolean;
}

const MyGrid = styled(Grid)<IObj>`
  margin-top: -7px;
`;

class UsersGridLayout extends React.Component<Props> {
  state = {
    loaded: false
  };

  componentDidMount() {
    setTimeout(() => this.setState({ loaded: true }), 0);
    let path = this.props.location.pathname;
    let role = path === "/musicians" ? "musician" : "/studios" ? "studio" : "";
    if (path !== "/search") {
      this.props.dispatchGetUsers(role);
    }
  }

  shouldComponentUpdate() {
    if (this.props.searchBoxTouched) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    let { users, loading } = this.props;
    let cards = users.map((user, idx) => (
      <Grid item xs={12} md={6} lg={4} key={idx}>
        <UserCard user={user} />
      </Grid>
    ));

    const message =
      "Initial load may be delayed to due database interuptions. Thank you for your patience. :)";

    return loading ? (
      <WaveformLoader message={message} loaded={this.state.loaded} />
    ) : (
      <div style={{ padding: "0 3px" }}>
        <MyGrid container spacing={16} justify="center">
          {cards}
        </MyGrid>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    users: state.search.users,
    loading: state.search.loading,
    searchBoxTouched: state.search.searchBoxTouched
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    dispatchGetUsers: (role: String) => {
      return dispatch(getUsers(role));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersGridLayout);
