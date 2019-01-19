import React from "react";
import { NavLink, withRouter, RouteComponentProps } from "react-router-dom";
import NavButton from "./NavButton";
import { IObj } from "../../../typeDefs";

const NavigationItem: React.SFC<IObj & RouteComponentProps> = props => {
  return (
    <NavButton
      disableRipple={props.disableRipple ? true : false}
      navbuttontype={props.navbuttontype}
      size="large"
      active={props.active ? props.active.toString() : null}
      ordercheck={props.ordercheck}
      isopen={props.isopen}
      onClick={() => props.handleClick(props.link)}
    >
      {props.children}
    </NavButton>
  );
};

export default withRouter(NavigationItem);
