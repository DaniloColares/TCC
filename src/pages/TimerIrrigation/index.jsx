import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';
import mqtt from 'mqtt';
import { ArrowIcon, ButtonAction, ButtonsFooter, Circle, CircleBackground, CircleProgress, Content, Footer, TimerTextWrapper, TimerText } from './styles';
import { FiArrowLeft, FiPlay, FiStopCircle } from 'react-icons/fi';

// Tópicos MQTT
const COMMAND_TOPIC = '/ifce/tnc_command'; // Tópico para enviar comando ao ESP
const MOISTURE_TOPIC = '/ifce/tnc_soil_moisture'; // Tópico que recebe as leituras de umidade

export function TimerIrrigation() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [inputValue, setInputValue] = useState("00:00:00");
  const [initialTime, setInitialTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isSoilDry, setIsSoilDry] = useState(false); // Estado que verifica se o solo está seco
  const [moistureLevel, setMoistureLevel] = useState(0); // Estado para armazenar a leitura de umidade
  const navigate = useNavigate();

  useEffect(() => {
    // Conecta ao broker público EMQX
    const client = mqtt.connect('mqtt://broker.emqx.io:1883');
    
    client.on('connect', () => {
      console.log('Conectado ao broker MQTT');
      client.subscribe(MOISTURE_TOPIC); // Inscreve-se no tópico de umidade do solo
    });

    // Recebe leituras de umidade
    client.on('message', (topic, message) => {
      if (topic === MOISTURE_TOPIC) {
        const moisture = parseInt(message.toString(), 10); // Convertendo a mensagem de umidade para número
        setMoistureLevel(moisture);
        console.log(`Nível de umidade do solo: ${moisture}%`);
        
        // Verifica se a umidade está abaixo do limite (exemplo: 30%)
        if (moisture < 30) {
          setIsSoilDry(true);
        } else {
          setIsSoilDry(false);
        }
      }
    });

    return () => {
      client.end(); // Finaliza a conexão MQTT quando o componente desmonta
    };
  }, []);

  // Função para enviar comando de irrigação via MQTT
  const sendIrrigationCommand = (client) => {
    const commandMessage = 'Irrigar'; // Mensagem de comando
    client.publish(COMMAND_TOPIC, commandMessage); // Publica a mensagem no tópico
    console.log(`Comando enviado: ${commandMessage}`);
  };

  // Lógica do timer para contar o tempo
  useEffect(() => {
    if (!isPaused && timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearTimeout(timerId);
    } else if (timeLeft === 0 && !isPaused) {
      // Quando o tempo se esgota, enviar o comando para irrigar
      const client = mqtt.connect('mqtt://broker.emqx.io:1883');
      sendIrrigationCommand(client);
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
    if (isSoilDry) { // Verifica se o solo está seco antes de iniciar o timer
      const newExpirationTime = parseTimeToSeconds(inputValue);
      setTimeLeft(newExpirationTime);
      setInitialTime(newExpirationTime);
      setIsPaused(false);
    } else {
      alert('O solo está úmido. Não é necessário iniciar a irrigação.');
    }
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
          <h1>Nível de umidade atual: {moistureLevel}%</h1>
          <h1>Digite a frequência, em horas, que sua planta deve ser irrigada:</h1>

          <InputMask
            mask="99:99:99"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="HH:MM:SS"
            style={{marginTop: '30px', border: 'none', width: '500px', height: '80px', borderRadius: '10px'}}
          >
            {(inputProps) => <input {...inputProps} type="text" style={{marginTop: '30px', border: '5px solid green', padding: '20px', width: '500px', height: '80px', borderRadius: '10px', fontSize: '50px', textAlign: 'center', color: 'green' }}/> }
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
