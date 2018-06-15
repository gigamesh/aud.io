import React from 'react';
import NavigationItem from './NavigationItem'
import ExploreNavButton from './ExploreNavButton_OLD'
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';

const navigationItems = (props) =>{
  const navItems = [
    {
      type: 'navItem',
      text: 'Login',
      link: '/login',
      restricted: false,
      excluded: true,
    },
    {
      type: 'navItem',
      text: 'Logout',
      link: '/logout',
      restricted: true,
    },
    {
      type: 'navItem',
      text: 'Signup',
      link: '/signup',
      restricted: false,
      excluded: true,
    },
    {
      type: 'navItem',
      text: 'Profile',
      link: `/user/${props.user._id}`,
      restricted: true,
    },
  ];

  let currentRoute = '/' + props.path;

  const navElement = (item,key) => {
  let activeLink = '/' + item.link.split('/')[1];
    return (
    <NavigationItem
      active={currentRoute === activeLink} 
      link={item.link}
      key={key}>
      {item.text}
    </NavigationItem>)
  }

  const showItems = () => (
    navItems.map((item, index) => {
      if(props.user.isAuth){
        return !item.excluded ?
          navElement(item, index)
        : null
      } else {
        return !item.restricted ?
          navElement(item, index)
        : null
      }
    })
  )

    return (
    <ul>
      {showItems()}
      <ExploreNavButton>
        Explore
      </ExploreNavButton>
    </ul>
  );
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(navigationItems);
