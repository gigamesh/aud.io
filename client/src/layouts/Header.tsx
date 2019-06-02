import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { RootState } from "../store/reducers";
import { AppBar, Toolbar } from "@material-ui/core";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Search from "@material-ui/icons/Search";
import NavigationItems from "../components/navigation/NavigationItems/NavigationItems";
import ExploreNavMenu from "../components/navigation/NavigationItems/ExploreNavMenu";
import AccountNavMenu from "../components/navigation/NavigationItems/AccountNavMenu";
import SearchBox from "../components/navigation/SearchBox/SearchBox";
import { IObj } from "../typeDefs";

const styles = (theme: IObj) => {
  return createStyles({
    flex1: {
      flex: 1
    },
    toolbar: {
      [theme.breakpoints.down("xl")]: {
        minHeight: "50px",
        maxHeight: "50px"
      }
    },
    hiddenProfileName: {
      verticalAlign: "top",
      lineHeight: "1.4em"
    },
    searchIcon: {
      position: "relative",
      padding: 0,
      marginLeft: "8px"
    }
  });
};

const AppBarStyled = styled(AppBar)<IObj>`
  background: #fafafa;
  box-shadow: none;
  min-height: 0;
  svg {
    fill: #333;
    transform: scale(1.4);
    &:hover {
      fill: #000;
    }
  }
`;

const ToolbarStyled = styled(Toolbar)<IObj>`
  width: calc(96%);
  padding: 0;
`;

const TextFieldWrap = styled.div`
  min-width: 240px;
  width: 35vw;
  max-width: 400px;
  height: 100%;
  top: -8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type HeaderProps = {
  profilename: string;
  isAuth: boolean;
  drawerToggleClicked: () => void;
  history: IObj;
  path: string;
  classes: IObj;
};

const Header = (props: HeaderProps) => {
  const {
    classes,
    profilename,
    drawerToggleClicked,
    path,
    isAuth,
    history
  } = props;

  const handleClick = (link: string) => {
    props.history.push(link);
  };

  const fontSizeFunc = (size: number) => {
    let exp = profilename.length > 7 ? profilename.length - 7 : 1;
    let multiplier = Math.pow(0.99, exp);
    return (multiplier * size)
      .toFixed(1)
      .toString()
      .concat("vw");
  };

  let accountNavMenu = props.isAuth ? (
    <AccountNavMenu handleClick={handleClick}>Account</AccountNavMenu>
  ) : null;
  return (
    <AppBarStyled position="fixed">
      <ToolbarStyled className={classes.toolbar}>
        <Hidden mdUp>
          <IconButton
            color="inherit"
            aria-label="Menu"
            onClick={drawerToggleClicked}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Hidden smDown>
          <nav className={classes.flex1}>
            <NavigationItems
              handleClick={handleClick}
              path={path}
              isAuth={isAuth}
            />
            {accountNavMenu}
            <ExploreNavMenu handleClick={handleClick}>Explore</ExploreNavMenu>
          </nav>
          <TextFieldWrap>
            <SearchBox history={history} />
            <Search className={classes.searchIcon} />
          </TextFieldWrap>
        </Hidden>
        <Hidden mdUp>
          <div className={classes.flex1} />
          <Typography
            className={classes.hiddenProfileName}
            style={{ fontSize: fontSizeFunc(6.6) }}
          >
            {path === "user" && profilename}
          </Typography>
        </Hidden>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    profilename: state.user.profilename || "",
    isAuth: state.user.isAuth
  };
};

export default connect(mapStateToProps)(withStyles(styles)(Header));
