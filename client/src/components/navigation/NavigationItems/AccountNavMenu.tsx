import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "../../../store/reducers";
import DropDownNavMenu from "./DropDownNavMenu/DropDownNavMenu";

const AccountNavMenu = (props: { userId: string }) => {
  return (
    <DropDownNavMenu
      {...props}
      menuItems={[
        {
          link: `/user/${props.userId}`,
          displayText: "Profile"
        },
        {
          link: "/accountsettings",
          displayText: "Settings"
        },
        {
          link: "/logout",
          displayText: "Logout"
        }
      ]}
    />
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    userId: state.user._id
  };
};

export default connect(mapStateToProps)(AccountNavMenu);
