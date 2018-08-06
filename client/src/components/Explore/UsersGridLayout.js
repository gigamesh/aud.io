import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { getUsers } from '../../store/actions'
import WaveformLoader from '../UI/WaveformLoader'
import Grid from '@material-ui/core/Grid';
import UserCard from './UserCard'

const MyGrid = styled(Grid)`
  margin-top: -7px;
`
const MessageWrap = styled.div`
  width: 80%;
  height: 100%;
  max-width: 500px;
  text-align: center;
  position: relative;
  margin: 0 auto;
  bottom: 25%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

class UsersGridLayout extends React.Component{

  componentDidMount(){ 
    let path = this.props.location.pathname;
    let role = path === '/musicians' ? 'musician' : '/studios' ? 'studio' : '';
    if(path !== '/search'){
      this.props.dispatchGetUsers(role); 
    }
  }

  shouldComponentUpdate(nextProps){

    if(this.props.searchBoxTouched){
      return false
      } else { 
        return true;
      }
  }

  render(){
    let {users, loading} = this.props;

    let cards = users.map((user, idx) => (
      <Grid item xs={12} md={6} lg={4} key={idx}>
        <UserCard user={user}/>
      </Grid>
    ))

    const loadingMessage = () => (
      <React.Fragment>
        <WaveformLoader/>
        <MessageWrap>
          <p>Initial load may take ~10 seconds due to demo limitations (free database service needs time to wake up).</p>
          <p>Thank you for your patience! :)</p>
        </MessageWrap>
      </React.Fragment>
    )

    return loading ? loadingMessage() : (
      <div style={{ padding: '0 3px'}}>
        <MyGrid container spacing={16} justify="center">
          {cards}
        </MyGrid>
      </div>
    )
  }
}

const mapStateToProps = state =>{
  return {
    users: state.search.users,
    loading: state.search.loading,
    searchBoxTouched: state.search.searchBoxTouched
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    dispatchGetUsers: (role) => {
      return dispatch(getUsers(role))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersGridLayout)
