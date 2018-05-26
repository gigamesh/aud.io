import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => (
  <ul>
    <NavigationItem 
      link="/login"
      display={props.display}>
      login
    </NavigationItem>
    <NavigationItem 
      link="/signup"
      display={props.display}>
      sign-up
    </NavigationItem>
    <NavigationItem 
      link="/directory"
      display={props.display}>
      explore
    </NavigationItem>
  </ul>
);

export default navigationItems;
