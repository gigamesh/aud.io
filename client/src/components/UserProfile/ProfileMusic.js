import React from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

const ProfileMusic = props => {


  const Waveform = styled.img`
    display: block;
    width: 100%;
    margin: 0 auto;
  `
  const WaveformText = styled(Typography)`
    position: relative;
    top: -10px;
    font-size: 1.2em;
    margin: 0 auto 20px;
  `

  const AlbumArtBox = styled.div`
    position: relative;
    height: 0;
    padding-top: 100%;
    background: #eee;
    margin: 3px;
    border: 1px solid #bbb;
  `

  const AlbumArtBoxInner = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  `

  return (
  <Grid container style={{margin: '20px auto', padding: '0 10px'}} spacing={16}>
    <Hidden mdDown>
      <Grid item xs={12} lg={4}>
        <AlbumArtBox>
          <AlbumArtBoxInner>
            [album art]
          </AlbumArtBoxInner>
        </AlbumArtBox>
      </Grid>  
    </Hidden>
    <Grid item xs={12} lg={8}>
      <div>
        <Waveform src="/img/profile/wave4.png" alt=""/>
          <WaveformText align='center'>
            Lorem, Ipsum
          </WaveformText>
        <Waveform src="/img/profile/wave4.png" alt=""/>
          <WaveformText align='center'>
            Tenetur Magnam
          </WaveformText>
        <Waveform src="/img/profile/wave4.png" alt=""/>
          <WaveformText align='center'>
            Exercitationem Eligendi 
          </WaveformText>
        <Waveform src="/img/profile/wave4.png" alt=""/>
          <WaveformText align='center'>
            Unde Nesciunt
          </WaveformText>
      </div>
    </Grid>
  </Grid>
  )
}

export default ProfileMusic
