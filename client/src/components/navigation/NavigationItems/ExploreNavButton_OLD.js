import React from 'react'
import classNames from 'classnames';
import NavButton from './NavButton';
import NavigationItem from './NavigationItem';
import { Manager, Reference, Popper } from 'react-popper';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Collapse from '@material-ui/core/Collapse';
import Paper from '@material-ui/core/Paper';
import Portal from '@material-ui/core/Portal';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';

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
  flexDiv: {
    display: 'flex',
    flexDirection: 'column'
  }
});

class ExploreNavButton extends React.Component {
  state = {
    open: false,
  };

  handleToggle = () => {
    this.setState({ open: !this.state.open });
  };

  handleClose = event => {
    if (this.target1.contains(event.target)){
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <Manager>
          <Reference>
            {({ ref }) => (
              <div ref={node => {
                  this.target1 = node;
                }}>
                <NavButton
                  ref={ref}
                  size="large" 
                  aria-owns={open ? 'menu-list-collapse' : null}
                  aria-haspopup="true"
                  onClick={this.handleToggle}
                  style={{position: 'relative'}}
                >
                  {this.props.children}
                </NavButton>
              </div>
            )}

          </Reference>
          <Portal>
            <Popper
              placement="bottom-start"
              eventsEnabled={open}
              className={classNames({ [classes.popperClose]: !open })}
            >
            {({ ref, style }) => (
              <div ref={ref} style={style}>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <Collapse 
                    in={open} 
                    id="menu-list-collapse" 
                    style={{ transformOrigin: '0 0 0', position: 'relative', top: '100px'}}>
                    <div className={classes.flexDiv}>
                      {/* {/* <MenuList role="menu" > */} 
                        <NavigationItem 
                          active={false}
                          link={'/musicians'}
                          onClick={this.handleClose}>
                          Musicians
                        </NavigationItem>
                        <NavigationItem 
                          active={false}
                          link={'/studios'}
                          onClick={this.handleClose}>
                          Studios
                        </NavigationItem>
                        <NavigationItem 
                          active={false}
                          link={'/gear'}
                          onClick={this.handleClose}>
                          Gear
                        </NavigationItem>
                      {/* </MenuList> */}
                    </div>
                  </Collapse>
                </ClickAwayListener>
              </div>
            )}
            </Popper>
          </Portal>
        </Manager>
      </div>
    );
  }
}

export default withStyles(styles)(ExploreNavButton);
