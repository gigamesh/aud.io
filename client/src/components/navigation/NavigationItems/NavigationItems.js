import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem'
import { connect } from 'react-redux';

const navigationItems = (props) =>{
  let _id = props.user.userData ? props.user.userData._id : '';

  const navItems = [
    {
      type: 'navItem',
      text: 'Login',
      link: '/login',
      restricted: false,
      excluded: true
    },
    {
      type: 'navItem',
      text: 'Logout',
      link: '/logout',
      restricted: true
    },
    {
      type: 'navItem',
      text: 'Signup',
      link: '/signup',
      restricted: false,
      excluded: true
    },
    {
      type: 'navItem',
      text: 'Profile',
      link: `/user/${_id}`,
      restricted: true
    },
    {
      type: 'navItem',
      text: 'Explore',
      link: '/directory',
      restricted: false
    },
  ];

  const navElement = (item, display, key) => (
    <NavigationItem 
      link={item.link}
      display={display}
      key={key}>
      {item.text}
    </NavigationItem>
  )

  const showItems = (display) => (
    navItems.map((item, index) => {
      if(props.user.isAuth){
        return !item.excluded ?
          navElement(item, display, index)
        : null
      } else {
        return !item.restricted ?
          navElement(item, display, index)
        : null
      }
    })
  )

    return (
    <ul>
      {showItems(props.display)}
    </ul>
  );
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(navigationItems);
