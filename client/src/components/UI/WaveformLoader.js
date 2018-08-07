import React from 'react';
import './WaveformLoader.css';
import styled from 'styled-components'

const WaveFormWrap = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const WaveForm = styled.div`
  
  height: 100%;
  width: 100%;
  max-width: 200px;
  max-height: 100px;
  opacity: 0.7;
  margin: 0 auto;
  bottom: ${({bottom}) => bottom || '50%'};
  left: 50%;
`

const MessageWrap = styled.div`
  width: 80%;
  max-width: 400px;
  text-align: center;
  position: relative;
  margin: 3% auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: 500;
`

const WaveformLoader = (props) => (
  <WaveFormWrap bottom={props.bottom}>
    <WaveForm className="lds-equalizer">
      <div>
        <div className='lds-equalizer-bar'></div>
        <div className='lds-equalizer-bar'></div>
        <div className='lds-equalizer-bar'></div>
        <div className='lds-equalizer-bar'></div>
        <div className='lds-equalizer-bar'></div>
        <div className='lds-equalizer-bar'></div>
        <div className='lds-equalizer-bar'></div>
        <div className='lds-equalizer-bar'></div>
        <div className='lds-equalizer-bar'></div>
      </div>
    </WaveForm>
  {props.message && 
    <MessageWrap>
      {props.message()}
    </MessageWrap>}
  </WaveFormWrap>
  
);

export default WaveformLoader;
