import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import mqtt from 'mqtt';
import { Container, ArrowIcon } from './styles';
import { FiArrowLeft, FiSun } from 'react-icons/fi';

// Tópico MQTT
const TEMPERATURE_TOPIC = '/ifce/tnc_temp_sensor';
const COMMAND_TOPIC = '/ifce/tnc_command'; // Tópico para enviar comandos

export function Temperature() {
  const [metrics, setMetrics] = useState(''); // Armazena o valor da temperatura
  const navigate = useNavigate();

  useEffect(() => {
    // Conecta ao broker MQTT uma única vez
    const client = mqtt.connect('mqtt://broker.emqx.io:1883');
    
    client.on('connect', () => {
      console.log('Conectado ao broker MQTT');
      client.subscribe(TEMPERATURE_TOPIC); // Inscreve-se no tópico de temperatura
    });

    client.on('error', (err) => {
      console.error('Erro na conexão MQTT:', err);
    });

    // Recebe as mensagens do MQTT
    client.on('message', (topic, message) => {
      if (topic === TEMPERATURE_TOPIC) {
        const temperature = message.toString(); // Converte a mensagem recebida em string
        console.log(`Temperatura recebida: ${temperature}`);
        setMetrics(temperature); // Atualiza o estado com a nova temperatura
      }
    });

    // Intervalo para buscar atualizações de temperatura
    const intervalId = setInterval(() => {
      console.log('Enviando comando para obter temperatura');
      client.publish(COMMAND_TOPIC, 'get_temperature'); // Envia comando para obter a temperatura
    }, 5000); // Atualiza a cada 5 segundos

    // Limpa o intervalo e desconecta do MQTT ao desmontar o componente
    return () => {
      clearInterval(intervalId); // Limpa o intervalo ao desmontar
      client.end(); // Finaliza a conexão MQTT
    };
  }, []);

  return (
    <Container>
      <ArrowIcon onClick={() => navigate("/home")}>
        <FiArrowLeft size={50} />
      </ArrowIcon>
      <FiSun size={350} />
      <p>A temperatura atual no jarro é: {metrics}°C </p>
    </Container>
  );
}
