import React from "react";
import DropDownNavMenu from "./DropDownNavMenu/DropDownNavMenu";

const ExploreNavMenu = (props: any) => {
  return (
    <DropDownNavMenu
      {...props}
      menuItems={[
        {
          link: "/musicians",
          displayText: "Musicians"
        },
        {
          link: "/studios",
          displayText: "Studios"
        }
        // {
        //   link: '/gear',
        //   displayText: 'Gear'
        // }
      ]}
    />
  );
};

export default ExploreNavMenu;
