import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../store/reducers";
import styled from "styled-components";
import { getUsers } from "../../store/actions";
import WaveformLoader from "../UI/WaveformLoader";
import Grid from "@material-ui/core/Grid";
import UserCard from "./UserCard";
import { IUser } from "../../typeDefs";

interface Props {
  location: any;
  users: Array<IUser>;
  dispatchGetUsers: Function;
  searchBoxTouched: boolean;
  loading: boolean;
}

const MyGrid = styled(Grid)<any>`
  margin-top: -7px;
`;

const Text = styled.p`
  color: #ccc;
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
        <Text>
          Initial load may be delayed to due database interuptions. Thank you
          for your patience. :)
        </Text>
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

const mapStateToProps = (state: RootState) => {
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
