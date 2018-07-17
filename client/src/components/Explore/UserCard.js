import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Card from '@material-ui/core/Card';
import withWidth from '@material-ui/core/withWidth';
import Typography from '@material-ui/core/Typography';
import WaveformLoader from '../UI/WaveformLoader';


class UserCard extends React.Component{
  state = {
    loaded: false
  }

  componentDidMount() {
      
    const loaderImg = new Image();

    loaderImg.src = this.props.user.photos.header;

    loaderImg.onload = () => {
      this.setState({loaded: true});
    }
  }

  render(){
    let user = this.props.user;
    let userId = this.props.user._id
    let profilename = this.props.user.profilename;

    const OuterWrap = styled.div`
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 50%;
    `

    const InnerWrap = styled.div`
      background: url(${user.photos.header || "/img/profile/default-header.jpg"});
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      transform-origin: 50% 20%;
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      padding: 1%;
      transition: all 400ms ease-in-out;
    `

    const ProfileNameWrap = styled.div`
      position: absolute;
      z-index: 30;
      width: 98%;
      flex-shrink: 10;
      color: ${user ? user.profilenameColor : '#333'};
      padding: 0.5%;
      margin: 0 2px;
      font-weight: 300;
      line-height: .9em;
      opacity: 1;
      h1 {
        color: inherit;
      }
      p {
        color: inherit;
      }
    `

    const MyCard = styled(Card)`
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      transition: all 400ms ease-in-out;
      &:hover .usercard--coloroverlay {
        opacity: 1;
      }
      &:hover .usercard--innerwrap{
        filter: grayscale(100%);
        -webkit-filter: grayscale(100%);
      }
      &:hover .headercard-profilename {
        opacity: 1;
      }
    `

    const Overlay = styled.div`
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;
      height: 100%;
      opacity: 1;
      z-index: 10;
      transition: all 400ms ease-in-out;
      background-image: linear-gradient(20deg, rgba(0,0,0,0) 40%, rgba(4,20,38,0.8) 90%);
    `

    const ColorOverlay = styled.div`
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      opacity: 0;
      z-index: 20;
      background-color: rgba(72, 152, 242,0.2);
      transition: all 400ms ease-in-out;
    `

    const WaveformWrapper = styled.div`
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
    `
    const WaveformInnerWrap = styled.div`
      position: relative;
      width: 40%;
      height: 40%;
    `

    const loadedUserCard = (
      <Link to={`/user/${userId}`}>
        <OuterWrap>
          <MyCard raised>
          <Overlay className='usercard--overlay'>
          </Overlay>
          <ColorOverlay className='usercard--coloroverlay'/>
          <InnerWrap className='usercard--innerwrap'>
              <div style={{flexGrow: 1, width: '100%'}}></div>
          </InnerWrap>
          <ProfileNameWrap className={'headercard-profilename'}>
            <Typography variant='headline' align='right'>
              {profilename}
            </Typography>
            <Typography variant='body1' align='right'>
              {user.address ? user.address.city : ''}
            </Typography>
          </ProfileNameWrap>
          </MyCard>
        </OuterWrap>
      </Link> 
    )

    const wrappedWaveform = (
      <WaveformWrapper>
        <WaveformInnerWrap>
          <WaveformLoader/>
        </WaveformInnerWrap>  
      </WaveformWrapper>
    )

    return this.state.loaded ? loadedUserCard : wrappedWaveform
  }
}

export default withWidth()(UserCard)
