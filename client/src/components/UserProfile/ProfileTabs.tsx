import React from "react";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import ProfileAbout from "./ProfileAbout";
import ProfilePhotos from "./ProfilePhotos";
import ProfileMusic from "./ProfileMusic";
import ProfileCal from "./ProfileCal";
// import ProfileGear from './ProfileGear';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// import styled from 'styled-components';
import Measure from "react-measure";

function TabContainer({ children, dir }: any) {
  return (
    // <div component="div" dir={dir}>
    //   {children}
    // </div>
    <div>{children}</div>
  );
}

const styles = () => ({
  root: {
    width: "100%"
  },
  lessPad: {
    padding: "6px"
  }
});

class FullWidthTabs extends React.Component<any, any> {
  state = {
    value: 0,
    appBarWidth: 400
  };

  handleChange = (event: any, value: number) => {
    this.setState({ value });
  };

  handleChangeIndex = (index: number) => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;
    const { appBarWidth } = this.state;
    return (
      <div className={classes.root}>
        <Measure
          bounds
          onResize={(contentRect: any) => {
            this.setState({ appBarWidth: contentRect.bounds.width });
          }}
        >
          {({ measureRef }: any) => (
            <div ref={measureRef}>
              <AppBar position="static" color="default">
                <Tabs
                  value={this.state.value}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  centered={appBarWidth >= 400}
                  variant={appBarWidth < 400 ? "scrollable" : "fullWidth"}
                  scrollButtons="on"
                >
                  <Tab label="About" />
                  <Tab label="Photos" />
                  <Tab label="Music" />
                  <Tab label="Schedule" />
                  {/* <Tab label="Gear" /> */}
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={this.state.value}
                onChangeIndex={this.handleChangeIndex}
              >
                <TabContainer dir={theme.direction}>
                  <ProfileAbout />
                </TabContainer>
                <TabContainer dir={theme.direction}>
                  <ProfilePhotos />
                </TabContainer>
                <TabContainer dir={theme.direction}>
                  <ProfileMusic />
                </TabContainer>
                <TabContainer dir={theme.direction}>
                  <ProfileCal />
                </TabContainer>
                {/* <TabContainer dir={theme.direction}><ProfileGear/></TabContainer> */}
              </SwipeableViews>
            </div>
          )}
        </Measure>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(FullWidthTabs);
