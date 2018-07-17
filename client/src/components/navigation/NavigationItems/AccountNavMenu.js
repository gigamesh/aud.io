import React from 'react'
import { connect } from 'react-redux'
import DropDownNavMenu from './DropDownNavMenu/DropDownNavMenu'

const AccountNavMenu = props => {
  return (
    <DropDownNavMenu {...props} menuItems={[
      {
        link: `/user/${props.userId}`,
        displayText: 'Profile'
      },
      {
        link: '/accountsettings',
        displayText: 'Settings'
      },
      {
        link: '/logout',
        displayText: 'Logout'
      }
    ]}/>
  )
}

const mapStateToProps = state => {
  return {
    userId: state.user._id
  }
}

export default connect(mapStateToProps)(AccountNavMenu)
