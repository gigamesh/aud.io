import React from 'react';
import styled, {css} from 'styled-components';
import Button from '@material-ui/core/Button';
import { withTheme } from '@material-ui/core/styles';

const activeStyle = css`
  &:after{
    content: '';
    border-bottom: 6px solid ${props=> props.theme.palette.primary.light};
    position: absolute;
    width: ${props=> props.ordercheck === 0 && !props.isopen 
      ? 'calc(100% - 14px);' : 'calc(100% - 28px)'};
    height: 65%;
    opacity: 1;
    top: 7px;
    }`

const NavButton = props => {
  const { theme } = props;
  const NavButtonMain = styled(Button)`
    display: inline-block;
    a {
      color: inherit;
      z-index: 20;
    }
    min-width: 0px;
    font-size: inherit;
    padding: 8px 18px;
    padding-left: ${props.ordercheck === 0 && !props.isopen ? '0' : '14px'};
    opacity: 0.9;
    &:hover {
      background: inherit;
      opacity: 1;
    }
    a {
      &:after{
        content: '';
        border-bottom: 6px solid ${theme.palette.primary.light};
        position: absolute;
        display: block;
        width: ${props.ordercheck === 0 && !props.isopen ? 'calc(100% - 14px);' 
          : 'calc(100% - 28px)'};
        height: 65%;
        z-index: -10;
        opacity: 0;
        top: 20px;   
      }
      &:hover:after {
        opacity: 1;
        top: 7px;
        transition: all 200ms;
      }
      ${props => props.active ==='true' && activeStyle};
    }
  `

  const NavButtonSecondary = styled(Button)`
    a {
      color: ${theme.palette.text.primary};
    }
    min-width: 0px;
    width: 100%;
    font-size: inherit;
    font-weight: 400;
    padding: 6px 8px;
    opacity: 0.9;
    &:hover {
    background: inherit;
      a {
        color: ${theme.palette.primary.dark};
        opacity: 1;
      }
    }
    `

  return props.navbuttontype === 'secondary' ? (
    <NavButtonSecondary {...props}>
      {props.children}
    </NavButtonSecondary>
    ) : (
    <NavButtonMain {...props} disableRipple>
      {props.children}
    </NavButtonMain>
    )
}

export default withTheme()(NavButton)