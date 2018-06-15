import React from 'react';
import { withStyles } from '@material-ui/core/styles';
// import styled from 'styled-components';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
// import styled from 'styled-components';
import Measure from 'react-measure';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir}>
      {children}
    </Typography>
  );
}

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
  lessPad: {
    padding: '6px'
  }
});


class FullWidthTabs extends React.Component {
  state = {
    value: 0,
    appBarWidth: 400
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;
    const { appBarWidth } = this.state;
    return (
      <div className={classes.root}>
        <Measure
          bounds
          onResize={(contentRect) => {
            this.setState({ appBarWidth: contentRect.bounds.width });
          }}
        >
          {({ measureRef }) => (
            <div ref={measureRef}>
              <AppBar position="static" color="default">
                <Tabs
                  value={this.state.value}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  centered={appBarWidth >= 400}
                  scrollable={appBarWidth < 400}
                  scrollButtons="on"
                  >
                  <Tab label="Bio" />
                  <Tab label="Music" />
                  <Tab label="Calendar" />
                  <Tab label="Gear" />
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={this.state.value}
                onChangeIndex={this.handleChangeIndex}
              >
                <TabContainer dir={theme.direction}>Bio</TabContainer>
                <TabContainer dir={theme.direction}>Music</TabContainer>
                <TabContainer dir={theme.direction}>Calendar</TabContainer>
                <TabContainer dir={theme.direction}>Gear</TabContainer>
              </SwipeableViews>
            </div>
          )}
        </Measure>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(FullWidthTabs);