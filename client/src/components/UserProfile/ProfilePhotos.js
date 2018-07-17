import React from 'react'
import styled from 'styled-components'
import withWidth from '@material-ui/core/withWidth';

const ProfileAbout = props => {

  const PhotoDiv = styled.div`
    position: relative
    height: 0;
    width: ${props.width === 'xs' ? '47%' : '18.5%'};
    padding-top: ${props.width === 'xs' ? '47%' : '18.5%'};
    /* flex-basis: 100px; */
    /* flex-grow: 1; */
    background: #eee;
    margin: 0.6%;
    border: 1px solid #bbb;
  `

  const PhotoWrap = styled.div`
    margin: 20px auto;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  `

  return (
        <PhotoWrap>
          <PhotoDiv/><PhotoDiv/><PhotoDiv/>
          <PhotoDiv/><PhotoDiv/><PhotoDiv/>
          <PhotoDiv/><PhotoDiv/><PhotoDiv/>
          <PhotoDiv/>
        </PhotoWrap>
  )
}

export default withWidth()(ProfileAbout)
