import React from 'react';
import styled from 'styled-components';
import { AppBar, Toolbar} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Search from '@material-ui/icons/Search';
import NavigationItems from './../components/navigation/NavigationItems/NavigationItems';

const styles = theme => ({
  flex1: {
    flex: 1
  },
  toolbar: {
    padding: '14px'
  }
});

const AppBarStyled = styled(AppBar)`
  font-weight: 300;
  box-shadow: none;
  svg {
    transform: scale(1.4);
  }
`

const TextFieldStyled = styled.div`
  position: relative;
  margin-right: 16px;
  input {
    width: 260px;
  }
`

const Header = (props) => {
  const { classes } = props;

  return(
    <AppBarStyled position="absolute">
      <Toolbar className={classes.toolbar}>
        <Hidden mdUp>
          <IconButton 
            color="inherit" 
            aria-label="Menu" 
            onClick={props.drawerToggleClicked}>
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Hidden smDown>
          <nav className={classes.flex1}>
              <NavigationItems 
                isAuth={props.isAuth}
                display={'inline'}
                />
          </nav>
          <TextFieldStyled>
            <Grid container spacing={8} alignItems="flex-end">
              <Grid item>
                <TextField label=""/>
              </Grid>
              <Grid item>
                <Search className={classes.icon}/>
              </Grid>
            </Grid>
          </TextFieldStyled>
        </Hidden>
      </Toolbar>
    </AppBarStyled>
  )
};

export default withStyles(styles)(Header);
