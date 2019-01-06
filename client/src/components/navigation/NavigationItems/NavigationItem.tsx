import React from "react";
import { NavLink, withRouter, RouteComponentProps } from "react-router-dom";
import NavButton from "./NavButton";

interface Props {
  active?: boolean;
  disableRipple?: boolean;
  navbuttontype?: string;
  ordercheck?: number;
  isopen?: boolean;
  link?: string;
}

const NavigationItem: React.SFC<Props & RouteComponentProps> = props => {
  return (
    <NavButton
      disableRipple={props.disableRipple ? true : false}
      navbuttontype={props.navbuttontype}
      size="large"
      active={props.active ? props.active.toString() : null}
      ordercheck={props.ordercheck}
      isopen={props.isopen}
    >
      <NavLink
        to={{
          pathname: props.link,
          state: { prevPath: props.location.pathname }
        }}
      >
        {props.children}
      </NavLink>
    </NavButton>
  );
};

export default withRouter(NavigationItem);
