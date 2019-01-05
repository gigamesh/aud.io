import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getUsers } from "../../store/actions";
import WaveformLoader from "../UI/WaveformLoader";
import Grid from "@material-ui/core/Grid";
import UserCard from "./UserCard";
import { User } from "../../typeDefs";

interface Props {
  location: any;
  users: Array<User>;
  dispatchGetUsers: Function;
  searchBoxTouched: boolean;
  loading: boolean;
}

const MyGrid = styled(Grid)`
  margin-top: -7px;
`;

class UsersGridLayout extends React.Component<Props> {
  public componentDidMount() {
    let path = this.props.location.pathname;
    let role = path === "/musicians" ? "musician" : "/studios" ? "studio" : "";
    if (path !== "/search") {
      this.props.dispatchGetUsers(role);
    }
  }

  public shouldComponentUpdate() {
    if (this.props.searchBoxTouched) {
      return false;
    } else {
      return true;
    }
  }

  public render() {
    let { users, loading } = this.props;
    let cards = users.map((user, idx) => (
      <Grid item xs={12} md={6} lg={4} key={idx}>
        <UserCard user={user} />
      </Grid>
    ));

    const loadingMessage = () => (
      <React.Fragment>
        <p>
          Initial load may take 10-20 seconds due to database host limitations.
        </p>
        <p>Thank you for your patience. :)</p>
      </React.Fragment>
    );

    return loading ? (
      <WaveformLoader message={loadingMessage} />
    ) : (
      <div style={{ padding: "0 3px" }}>
        <MyGrid container spacing={16} justify="center">
          {cards}
        </MyGrid>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    users: state.search.users,
    loading: state.search.loading,
    searchBoxTouched: state.search.searchBoxTouched
  };
};

const mapDispatchToProps = (dispatch: any) => {
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
