import React from "react";
import NavigationItem from "./NavigationItem";
import { connect } from "react-redux";

interface INavItem {
  type: string;
  text: string;
  link: string;
  restricted?: boolean;
  excluded?: boolean;
}

class NavigationItems extends React.Component<any, any> {
  shouldComponentUpdate() {
    if (this.props.isopen) {
      return false;
    }
    return true;
  }

  render() {
    let props = this.props;

    const regularNavItems = [
      {
        type: "navItem",
        text: "Home",
        link: "/",
        restricted: false,
        excluded: false
      },
      {
        type: "navItem",
        text: "Login",
        link: "/login",
        restricted: false,
        excluded: true
      },
      {
        type: "navItem",
        text: "Signup",
        link: "/signup",
        restricted: false,
        excluded: true
      }
    ];
    const accountNavItems = [
      {
        type: "sidebarNavItem",
        text: "Profile",
        link: `/user/${props.userId}`,
        restricted: true
      },
      {
        type: "sidebarNavItem",
        text: "Settings",
        link: `/accountsettings`,
        restricted: true
      },
      {
        type: "navItem",
        text: "Logout",
        link: "/logout",
        restricted: true
      }
    ];
    const exploreNavItems = [
      {
        type: "sidebarNavItem",
        text: "Musicians",
        link: "/musicians"
      },
      {
        type: "sidebarNavItem",
        text: "Studios",
        link: "/studios"
      }
      // {
      //   type: 'sidebarNavItem',
      //   text: 'Gear',
      //   link: '/gear'
      // },
    ];

    let currentRoute = props.path === "/" ? props.path : "/" + props.path;

    const navElement = (item: INavItem, key: number, count: number) => {
      let activeLink = "/" + item.link.split("/")[1];

      const checkActive = () => {
        if (item.text === "Profile" && currentRoute === activeLink) {
          return props.currentProfileId === props.userId;
        } else {
          if (item.link === "/") {
          }
          return currentRoute === activeLink;
        }
      };
      return (
        <NavigationItem
          active={checkActive()}
          link={item.link}
          key={key}
          ordercheck={count}
          isopen={props.isopen}
        >
          {item.text}
        </NavigationItem>
      );
    };

    const showItems = (navItems: Partial<INavItem[]>) => {
      let count = -1;
      return navItems.map((item, index) => {
        if (!item) return null;
        if (!props.isopen && item.type === "sidebarNavItem") return null;
        if (props.isAuth) {
          if (!item.excluded) {
            count += 1;
            return navElement(item, index, count);
          }
        } else {
          count += 1;
          if (!item.restricted) {
            return navElement(item, index, count);
          }
        }
        return null;
      });
    };

    return (
      <React.Fragment>
        {props.excluded || !props.isopen ? showItems(regularNavItems) : null}
        {props.group === "account"
          ? showItems(accountNavItems)
          : showItems(exploreNavItems)}
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    userId: state.user._id,
    isAuth: state.user.isAuth,
    currentProfileId: state.user.currentProfileId
  };
};

export default connect(mapStateToProps)(NavigationItems);
