import React from 'react'
import NavButton from './NavButton';
// import Button from '@material-ui/core/Button';
// import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// import Collapse from '@material-ui/core/Collapse';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';

const styles = theme => ({
  root: {
    display: 'inline-flex',
  },
  paper: {
    top: '100px',
    marginRight: theme.spacing.unit * 2,
  },
  popperClose: {
    pointerEvents: 'none',
  },
});

class ExploreNavButton extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    console.log(event.target);
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <React.Fragment>
        <NavButton onClick={this.handleClick}>
          {this.props.children}
        </NavButton>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          TEST 123
        </Popover>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ExploreNavButton);
