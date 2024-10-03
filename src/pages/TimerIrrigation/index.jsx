import React, { useState, useEffect, useRef } from 'react';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';
import mqtt from 'mqtt';
import { ArrowIcon, ButtonAction, ButtonActivate, ButtonsFooter, Circle, CircleBackground, CircleProgress, Content, Footer, TimerTextWrapper, TimerText } from './styles';
import { FiArrowLeft, FiPlay, FiStopCircle, FiPower } from 'react-icons/fi'; // Ícone FiPower para o botão de ativação manual

const MOISTURE_TOPIC = '/ifce/plantsupport_umid'; // Tópico para umidade da planta

export function TimerIrrigation() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [inputValue, setInputValue] = useState("00:00:00");
  const [initialTime, setInitialTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isSoilDry, setIsSoilDry] = useState(false); // Estado que verifica se o solo está seco
  const [moistureLevel, setMoistureLevel] = useState(0); // Estado para armazenar a leitura de umidade
  const navigate = useNavigate();
  const inputRef = useRef(null); // Utilizando ref para evitar `findDOMNode`

  useEffect(() => {
    // Conecta ao broker público EMQX via WSS
    const client = mqtt.connect('wss://broker.emqx.io:8084/mqtt');
    
    client.on('connect', () => {
      console.log('Conectado ao broker MQTT via WSS');
      client.subscribe(MOISTURE_TOPIC); // Inscreve-se no tópico de umidade da planta
    });

    // Recebe leituras de umidade
    client.on('message', (topic, message) => {
      if (topic === MOISTURE_TOPIC) {
        const moisture = parseInt(message.toString(), 10); // Convertendo a mensagem de umidade para número
        setMoistureLevel(moisture);
        console.log(`Nível de umidade do solo: ${moisture}%`);
        
        // Verifica se a umidade está abaixo do limite (exemplo: 30%)
        if (moisture < 30 && !isSoilDry) {
          setIsSoilDry(true);
          handleStartTimer(); // Inicia o timer automaticamente quando o solo estiver seco
        } else if (moisture >= 30) {
          setIsSoilDry(false);
        }
      }
    });

    return () => {
      client.end(); // Finaliza a conexão MQTT quando o componente desmonta
    };
  }, [isSoilDry]); // O efeito é executado sempre que `isSoilDry` mudar

  // Lógica do timer para contar o tempo
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

  const handleStartTimer = () => {
    const newExpirationTime = parseTimeToSeconds(inputValue);
    setTimeLeft(newExpirationTime);
    setInitialTime(newExpirationTime);
    setIsPaused(false);
  };

  const handleStopClick = () => {
    setIsPaused(true);
  };

  const handleActivateClick = () => {
    // Ativa a irrigação e inicia o timer manualmente ao pressionar o botão
    alert("Irrigação ativada manualmente! Timer iniciado.");
    handleStartTimer(); // Inicia o timer
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
          <h1>Nível de umidade atual: {moistureLevel}%</h1>
          <h1>Digite a frequência, em horas, que sua planta deve ser irrigada:</h1>

          <InputMask
            mask="99:99:99"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="HH:MM:SS"
            ref={inputRef} // Utilizando ref diretamente no InputMask
            style={{marginTop: '30px', border: 'none', width: '500px', height: '80px', borderRadius: '10px'}}
          >
            {(inputProps) => <input {...inputProps} type="text" style={{marginTop: '30px', border: '5px solid green', padding: '20px', width: '500px', height: '80px', borderRadius: '10px', fontSize: '50px', textAlign: 'center', color: 'green' }}/> }
          </InputMask>
          
          <ButtonsFooter>
            <ButtonAction onClick={handleStartTimer}><FiPlay size={50}/></ButtonAction>
            <ButtonAction onClick={handleStopClick}><FiStopCircle size={50}/></ButtonAction>
            <ButtonActivate onClick={handleActivateClick}><FiPower size={50}/></ButtonActivate> {/* Novo botão */}
          </ButtonsFooter>
        </Footer>
      </Content>
    </>
  );
}
