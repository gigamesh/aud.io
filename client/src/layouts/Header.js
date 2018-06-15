import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux'
import { AppBar, Toolbar} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Search from '@material-ui/icons/Search';
import NavigationItems from './../components/navigation/NavigationItems/NavigationItems';

const styles = theme => ({
  flex1: {
    flex: 1
  }
});

const AppBarStyled = styled(AppBar)`
  background: inherit;
  box-shadow: none;
  svg {
    fill: #333;
    transform: scale(1.4);
    &:hover {
      fill: #000;
    }
  }
`

const ToolbarStyled = styled(Toolbar)`
  width: calc(96%);
  padding: 0;
`

const TextFieldStyled = styled.div`
  position: relative;
  margin-right: 16px;
  input {
    width: 30vw;
    max-width: 300px;
  }
`

class Header extends React.Component{

  render(){
    const props = this.props;
    const { classes } = props;

    const fontSizeFunc = (size)=>{
      let exp = props.profilename.length > 7 ? (props.profilename.length - 7) : 1;
      let multiplier = Math.pow(0.97, exp)
      return (multiplier * size).toFixed(1).toString().concat('vw');
    }

    return(
      <AppBarStyled position="fixed">
        <ToolbarStyled className={classes.toolbar}>
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
                path={props.path}
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
                  <Search/>
                </Grid>
              </Grid>
            </TextFieldStyled>
          </Hidden>
          <Hidden mdUp>
            <div className={classes.flex1}>
            </div>
              <Typography style={{fontSize: fontSizeFunc(7.5), verticalAlign: 'top'}} >
                {props.profilename}
              </Typography>         
          </Hidden>
        </ToolbarStyled>
      </AppBarStyled>
    )
  }
};

const mapStateToProps = state => {
  return {
    profilename: state.user.profilename || ''
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Header));
