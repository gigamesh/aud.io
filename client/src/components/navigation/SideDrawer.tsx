import React from "react";
import styled from "styled-components";
import NavigationItems from "./NavigationItems/NavigationItems";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import { IObj } from "../../typeDefs";

const DrawerStyled = styled(Drawer)<IObj>`
  ul {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-size: 1.5em;
    button {
      padding: 15px;
    }
  }
`;

type SideDrawerProps = {
  closeHandler: () => void;
  isopen: boolean;
  isAuth?: boolean;
  path: string;
};

const SideDrawer: React.SFC<SideDrawerProps> = props => {
  return (
    <DrawerStyled onClick={props.closeHandler} open={props.isopen}>
      <ul>
        <NavigationItems
          excluded
          group="account"
          path={props.path}
          display={"block"}
          isopen={props.isopen}
          isAuth={props.isAuth}
        />
      </ul>
      <Divider style={{ margin: "5vh 0" }} />
      <ul>
        <NavigationItems
          group="explore"
          path={props.path}
          display={"block"}
          isopen={props.isopen}
          isAuth={props.isAuth}
        />
      </ul>
    </DrawerStyled>
  );
};

export default SideDrawer;
