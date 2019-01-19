import React from "react";
import { withStyles, Theme } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import ProfileAbout from "./ProfileAbout";
import ProfilePhotos from "./ProfilePhotos";
import ProfileMusic from "./ProfileMusic";
import ProfileCal from "./ProfileCal";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Measure, { ContentRect } from "react-measure";
import { Nullable, Classes, IObj } from "../../typeDefs";

function TabContainer({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

const styles = () => ({
  root: {
    width: "100%"
  },
  lessPad: {
    padding: "6px"
  }
});

const initialState = {
  value: 0,
  appBarWidth: 400
};

type Props = {
  theme: Theme;
  classes: Classes;
};

class FullWidthTabs extends React.Component<
  Props,
  Nullable<typeof initialState>
> {
  state = {
    value: 0,
    appBarWidth: 400
  };

  handleChange = (e: React.ChangeEvent<{}>, value: number) => {
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
          onResize={(contentRect: ContentRect) => {
            this.setState({
              appBarWidth: contentRect.bounds ? contentRect.bounds.width : null
            });
          }}
        >
          {({ measureRef }: IObj) => (
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
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={this.state.value}
                onChangeIndex={this.handleChangeIndex}
              >
                <TabContainer>
                  <ProfileAbout />
                </TabContainer>
                <TabContainer>
                  <ProfilePhotos />
                </TabContainer>
                <TabContainer>
                  <ProfileMusic />
                </TabContainer>
                <TabContainer>
                  <ProfileCal />
                </TabContainer>
              </SwipeableViews>
            </div>
          )}
        </Measure>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(FullWidthTabs);
