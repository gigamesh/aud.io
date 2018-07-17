import React from 'react'
import classNames from 'classnames';
import NavigationItem from '../NavigationItem';
import { Manager, Reference, Popper } from 'react-popper';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Collapse from '@material-ui/core/Collapse';
import Paper from '@material-ui/core/Paper';
import Portal from '@material-ui/core/Portal';
import { withStyles } from '@material-ui/core/styles';
import './DropDownNavMenu.css'

const styles = theme => ({
  root: {
    display: 'inline-flex',
  },
  popperClose: {
    pointerEvents: 'none'
  },
  flexDiv: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  },
  navItemWrap: {
    width: '100%'
  }
});

class DropDownNavBtn extends React.Component {
  state = {
    open: false,
  };

  handleToggle = () => {
    this.setState({ open: !this.state.open });
  };

  handleClose = event => {
    this.setState({ open: false });
  };

  handleTimeoutClose = event => {
    this.menuTimeout = setTimeout (()=> this.setState({ open: false }), 100);
  };

  handleOpenAndStayOpen = e => {
    this.setState({ open: true});
    clearTimeout(this.menuTimeout);
  }

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    const props = this.props;

    let menuItems = props.menuItems.map((item)=>(
      <div onClick={this.handleToggle} key={item.link}>
        <NavigationItem
          navbuttontype={'secondary'}
          active={false}
          link={item.link}
          disableRipple
          >
          {item.displayText}
        </NavigationItem>
      </div>
    ));

    return (
      <div className={classes.root}>
        <Manager>
          <Reference>
            {({ ref }) => (
              <div ref={node => {
                  this.target1 = node;
                }} className='nav-btn--wrap'
                onMouseEnter={this.handleToggle}
                onMouseLeave={this.handleTimeoutClose}
                onClick={this.handleOpenAndStayOpen}>
                <Button
                  disableRipple
                  className='nav-btn--dropdown'
                  buttonRef={ref}
                  size="large" 
                  aria-owns={open ? 'menu-list-collapse' : null}
                  aria-haspopup="true">
                  {this.props.children}
                </Button>
              </div>
            )}

          </Reference>
          {/* <Portal> */}
          <Portal container={this.target1}>
            <Popper
              placement="bottom"
              eventsEnabled={open}
              className={classNames({ [classes.popperClose]: !open })}
            >
            {({ ref, style }) => (
              <div ref={ref} style={style}>
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <Collapse 
                      in={open} 
                      id="menu-list-collapse" 
                      style={{ transformOrigin: '0 0 0'}}>
                      <div 
                        className={classes.flexDiv}
                        onMouseEnter={this.handleOpenAndStayOpen}
                        onMouseLeave={this.handleClose}>
                        {menuItems}
                      </div>
                    </Collapse>
                  </ClickAwayListener>
                </Paper>
              </div>
            )}
            </Popper>
          </Portal>
        </Manager>
      </div>
    );
  }
}

export default withStyles(styles)(DropDownNavBtn);
