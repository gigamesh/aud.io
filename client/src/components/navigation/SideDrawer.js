import React from 'react';
// import styled from 'styled-components';
import NavigationItems from './NavigationItems/NavigationItems';
import Drawer from '@material-ui/core/Drawer';

const SideDrawer = (props) => {
  return (
    <Drawer
      onClose={props.closeHandler}
      open={props.isOpen}>
    
    <NavigationItems
      display={'block'}
      isOpen={props.isOpen}
      isAuth={props.isAuth}/>
    </Drawer>
  )
}

export default SideDrawer;