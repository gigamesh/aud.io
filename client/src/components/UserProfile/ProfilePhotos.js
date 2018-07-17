import React from 'react'
import styled from 'styled-components'
import MyTextHeading from '../mui/MyTextHeading';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
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
