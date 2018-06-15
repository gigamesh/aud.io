import React from 'react';
import styled, {css} from 'styled-components';
import Button from '@material-ui/core/Button';
import { withTheme } from '@material-ui/core/styles';

const activeStyle = css`
  &:after{
    content: '';
    border-bottom: 6px solid ${props=> props.theme.palette.primary.light};
    position: absolute;
    width: 75%;
    height: 65%;
    z-index: -1;
    opacity: 1;
    top: 7px;
    }`

const NavButton = React.forwardRef((props,ref) => {
  const { theme } = props;
  console.log(ref);
  const NavButtonMain = styled(Button)`
    /* display: ${props => props.display || 'inline-flex'}; */
    a {
      color: inherit;
    }
    min-width: 0px;
    font-size: inherit;
    padding: 8px 14px;
    opacity: 0.9;
    &:hover {
      background: inherit;
      opacity: 1;
    }
    &:after {
      content: '';
      border-bottom: 6px solid ${props => props.theme.palette.primary.light};
      position: absolute;
      width: 70%;
      height: 65%;
      z-index: -1;
      opacity: 0;
      top: 20px;   
    }
    &:hover:after {
      opacity: 1;
      top: 7px;
      transition: all 200ms;
    }
    ${props => props.active ==='true' && activeStyle};
  `
  return (
  <NavButtonMain {...props} disableRipple>
    {props.children}
  </NavButtonMain>
  )
})


export default withTheme()(NavButton)