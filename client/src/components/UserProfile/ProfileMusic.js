import React from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography';

const ProfileMusic = props => {

  const Container = styled.div`
    /* display: inline-block; */
    margin: 20px auto;
  `
  const Waveform = styled.img`
    display: block;
    margin: 0 auto 20px;
  `
  const WaveformText = styled(Typography)`
    font-size: 1.2em;
  `

  return (
    <Container>
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
      <Waveform src="/img/profile/wave4.png" alt=""/>
    </Container>
  )
}

export default ProfileMusic
