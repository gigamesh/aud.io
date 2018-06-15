import React from 'react';
import styled from 'styled-components';
import NavigationItems from './NavigationItems/NavigationItems';
import Drawer from '@material-ui/core/Drawer';

const DrawerStyled = styled(Drawer)`
  ul {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 2em;
    span {
      padding: 15px;
    }
  }
`

const SideDrawer = (props) => {
  return (
    <DrawerStyled
      onClick={props.closeHandler}
      open={props.isOpen}>
    
    <NavigationItems
      path={props.path}
      display={'block'}
      isOpen={props.isOpen}
      isAuth={props.isAuth}/>
    </DrawerStyled>
  )
}

export default SideDrawer;