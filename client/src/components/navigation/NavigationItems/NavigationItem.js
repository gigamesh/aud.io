import React from 'react';
import { NavLink } from 'react-router-dom';
import NavButton from './NavButton';
// import { withTheme } from '@material-ui/core/styles';
// import { withStyles } from '@material-ui/core/styles';

const NavigationItem = (props) => {

  return (
    <NavButton 
      size="large" 
      active={props.active.toString()}
      >
      <NavLink 
        to={props.link}>
        {props.children}
      </NavLink>
    </NavButton>
  )
};


export default NavigationItem;
