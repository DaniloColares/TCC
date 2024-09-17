import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';
import { ArrowIcon, ButtonAction, ButtonsFooter, Circle, CircleBackground, CircleProgress, Content, Footer, TimerTextWrapper, TimerText } from './styles';
import { FiArrowLeft, FiPlay, FiStopCircle } from 'react-icons/fi';

export function TimerIrrigation() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [inputValue, setInputValue] = useState("00:00:00");
  const [initialTime, setInitialTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isPaused && timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearTimeout(timerId);
    }
  }, [timeLeft, isPaused]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const sec = seconds % 60;
    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const parseTimeToSeconds = (time) => {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleConfirmClick = () => {
    const newExpirationTime = parseTimeToSeconds(inputValue);
    setTimeLeft(newExpirationTime);
    setInitialTime(newExpirationTime);
    setIsPaused(false);
  };

  const handleStopClick = () => {
    setIsPaused(true);
  };

  const getProgressStyle = () => {
    const circumference = 2 * Math.PI * 150;
    if (initialTime > 0) {
      const progress = ((initialTime - timeLeft) / initialTime) * circumference;
      return {
        strokeDasharray: circumference,
        strokeDashoffset: circumference - progress,
      };
    }
    return {
      strokeDasharray: circumference,
      strokeDashoffset: circumference,
    };
  };

  return (
    <>
      <ArrowIcon onClick={() => navigate("/home")}>
        <FiArrowLeft size={50}/>
      </ArrowIcon>
      <Content>
        <TimerTextWrapper>
          <Circle>
            <CircleBackground cx="160" cy="160" r="150" />
            <CircleProgress cx="160" cy="160" r="150" style={getProgressStyle()} />
          </Circle>
          <TimerText>{formatTime(timeLeft)}</TimerText>
        </TimerTextWrapper>
        <Footer>
          <h1>Digite a frequência, em horas, que sua planta deve ser irrigada:</h1>

          <InputMask
            mask="99:99:99"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="HH:MM:SS"
            style={{marginTop: '30px', border: 'none', width: '500px', height: '80px', borderRadius: '10px'}}
          >
            {(inputProps) => <input {...inputProps} type="text" style={{marginTop: '30px', border: '5px solid green', padding: '20px', width: '500px', height: '80px', borderRadius: '10px', fontSize: '50px', textAlign: 'center', color: 'green' }}/>}
          </InputMask>
          
          <ButtonsFooter>
            <ButtonAction onClick={handleConfirmClick}><FiPlay size={50}/></ButtonAction>
            <ButtonAction onClick={handleStopClick}><FiStopCircle size={50}/></ButtonAction>
          </ButtonsFooter>
        </Footer>
      </Content>
    </>
  );
}
