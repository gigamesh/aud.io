import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import NavButton from './NavButton';
// import { withTheme } from '@material-ui/core/styles';
// import { withStyles } from '@material-ui/core/styles';

const NavigationItem = (props) => {

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
        to={{pathname: props.link, state: { prevPath: props.location.pathname }}}>
        {props.children}
      </NavLink>
    </NavButton>
  )
};


export default withRouter(NavigationItem);
