import * as React from "react";
// import classNames from "classnames";
import NavigationItem from "../NavigationItem";
import { Manager, Reference, Popper } from "react-popper";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Collapse from "@material-ui/core/Collapse";
import Paper from "@material-ui/core/Paper";
import Portal from "@material-ui/core/Portal";
import { withStyles, createStyles } from "@material-ui/core/styles";
import "./DropDownNavMenu.css";

const styles = createStyles({
  root: {
    display: "inline-flex"
  },
  popperClose: {
    pointerEvents: "none"
  },
  flexDiv: {
    display: "flex",
    flexDirection: "column",
    position: "relative"
  },
  navItemWrap: {
    width: "100%"
  }
});

const DropDownNavBtn = (props: { [index: string]: any }) => {
  let menuTimeout: number;
  let targetNode = React.useRef(null);
  const [state, setState] = React.useState({ open: false });
  const { classes } = props;
  const { open } = state;

  const handleToggle = () => {
    setState({ open: !state.open });
  };

  const handleClose = () => {
    setState({ open: false });
  };

  const handleTimeoutClose = () => {
    menuTimeout = window.setTimeout(() => setState({ open: false }), 100);
  };

  const handleOpenAndStayOpen = () => {
    setState({ open: true });
    clearTimeout(menuTimeout);
  };

  let menuItems = props.menuItems.map((item: any) => (
    <div onClick={handleToggle} key={item.link}>
      <NavigationItem
        navbuttontype={"secondary"}
        active={false}
        link={item.link}
        handleClick={props.handleClick}
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
            <div
              ref={targetNode}
              className="nav-btn--wrap"
              onMouseEnter={handleToggle}
              onMouseLeave={handleTimeoutClose}
              onClick={handleOpenAndStayOpen}
            >
              <Button
                disableRipple
                className="nav-btn--dropdown"
                buttonRef={ref}
                size="large"
                aria-owns={open ? "menu-list-collapse" : ""}
                aria-haspopup="true"
              >
                {props.children}
              </Button>
            </div>
          )}
        </Reference>
        <Portal container={targetNode.current}>
          <Popper placement="bottom" eventsEnabled={open}>
            {({ ref, style }) => (
              <div ref={ref} style={style}>
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <Collapse
                      in={open}
                      style={{ transformOrigin: "50% 50% 0" }}
                    >
                      <div
                        className={classes.flexDiv}
                        onMouseEnter={handleOpenAndStayOpen}
                        onMouseLeave={handleClose}
                      >
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
};

export default withStyles(styles)(DropDownNavBtn);
