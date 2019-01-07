import React from "react";
import styled from "styled-components";
import MyTextHeading from "../mui/MyTextHeading";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import WaveformLoader from "../UI/WaveformLoader";

class ProfileCal extends React.Component {
  iframe: HTMLIFrameElement | undefined;
  state = {
    loaded: false
  };

  componentDidMount() {
    if (this.iframe) {
      this.iframe.onload = () => {
        this.setState({ loaded: true });
      };
    }
  }

  handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
  };

  render() {
    const Container = styled.div`
      position: relative;
      height: 0;
      width: 100%;
      padding-bottom: 70%;
    `;

    const Iframe = (
      <iframe
        src="https://calendar.google.com/calendar/embed?src=ov1q3hk6idekbd81mv0kojc3t4%40group.calendar.google.com&ctz=America%2FLos_Angeles"
        style={{
          border: "1px solid #999",
          backgroundColor: "transparent",
          display: "block",
          margin: "0 auto",
          position: "absolute",
          top: 0,
          left: 0
        }}
        title="iframe"
        ref={(el: HTMLIFrameElement) => (this.iframe = el)}
        width={"98%"}
        height={600}
        frameBorder={0}
        scrolling="no"
      />
    );

    return (
      <Grid
        container
        style={{ margin: "15px auto", width: "100%" }}
        spacing={16}
      >
        <Grid item xs={12} md={4}>
          <MyTextHeading variant="h5" align="center">
            Upcoming Dates
          </MyTextHeading>
          <List component="nav">
            <ListItem button disableGutters onClick={this.handleClick}>
              <ListItemText primary="Lorem ipsum dolor" secondary="9-15-18" />
            </ListItem>
            <ListItem button disableGutters onClick={this.handleClick}>
              <ListItemText primary="Aut libero aperiam" secondary="9-21-18" />
            </ListItem>
            <ListItem button disableGutters onClick={this.handleClick}>
              <ListItemText primary="Pariatur veniam" secondary="10-02-18" />
            </ListItem>
            <ListItem button disableGutters onClick={this.handleClick}>
              <ListItemText
                primary="Nesciunt necessitatibus"
                secondary="10-06-18"
              />
            </ListItem>
            <ListItem button disableGutters onClick={this.handleClick}>
              <ListItemText primary="Laudantium aperiam" secondary="10-21-18" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={8}>
          <Container>
            {this.state.loaded ? <WaveformLoader /> : Iframe}
          </Container>
        </Grid>
      </Grid>
    );
  }
}

export default ProfileCal;
