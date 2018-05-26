import React, {Component} from 'react';
// import { connect } from 'react-redux';
import SideDrawer from './../components/navigation/SideDrawer';
import Header from './Header'


class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  toggleDrawer = () => {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer};
    });
  };

  render() {

    return (
    <React.Fragment>
      <Header
        isAuth={this.props.isAuthenticated}
        drawerToggleClicked={()=> this.toggleDrawer()}/>

      <SideDrawer 
        isOpen={this.state.showSideDrawer}
        closeHandler={()=> this.toggleDrawer()}>
        <div
          tabIndex={0}
          role="button"
          onClick={()=> this.toggleDrawer()}
          onKeyDown={()=> this.toggleDrawer()}
        >
        </div>
      </SideDrawer>
      <main>
        {this.props.children}
      </main>
    </React.Fragment>
    );
  }
};

// const mapStateToProps = state => {
//   return {
//     isAuthenticated: state.auth.token !== null
//   }
// }

// export default connect(mapStateToProps)(Layout);
// export default withStyles(styles)(Layout);
export default Layout;
