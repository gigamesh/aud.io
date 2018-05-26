import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const NavLinkStyled = styled(NavLink)`
  display: ${props => props.display};
`
const NavButton = styled(Button)`
  font-size: inherit;
  padding: 8px 16px;
`

const navigationItem = (props) => (
  <NavLinkStyled
    display={props.display}
    to={props.link}
    exact={props.exact}>
    <NavButton size="large">
      {props.children}
    </NavButton>
  </NavLinkStyled>
);

export default navigationItem;
