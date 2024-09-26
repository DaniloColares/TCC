import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import mqtt from 'mqtt';
import { Container, ArrowIcon } from './styles';
import { FiArrowLeft, FiSun } from 'react-icons/fi';

// Tópicos MQTT
const MQTT_TEMP1 = '/ifce/plantsupport_temp1'; // Tópico de temperatura 1
const MQTT_TEMP2 = '/ifce/plantsupport_temp2'; // Tópico de temperatura 2

export function Temperature() {
  const [temp1, setTemp1] = useState(''); // Armazena o valor da temperatura 1
  const [temp2, setTemp2] = useState(''); // Armazena o valor da temperatura 2
  const [message, setMessage] = useState(''); // Armazena a mensagem de alerta
  const navigate = useNavigate();

  useEffect(() => {
    // Conecta ao broker MQTT via WSS (porta 8084)
    const mqttClient = mqtt.connect('wss://broker.emqx.io:8084/mqtt');

    mqttClient.on('connect', () => {
      console.log('Conectado ao broker MQTT via WSS');

      // Inscrever nos tópicos de temperatura
      mqttSub(mqttClient, { topic: MQTT_TEMP1, qos: 0 });
      mqttSub(mqttClient, { topic: MQTT_TEMP2, qos: 0 });
    });

    // Receber as mensagens dos tópicos de temperatura
    mqttClient.on('message', (topic, message) => {
      const temperature = message.toString(); // Converte a mensagem em string

      if (topic === MQTT_TEMP1) {
        setTemp1(temperature); // Atualiza o estado da temperatura 1
        console.log(`Temperatura 1 recebida: ${temperature}°C`);
      } else if (topic === MQTT_TEMP2) {
        setTemp2(temperature); // Atualiza o estado da temperatura 2
        console.log(`Temperatura 2 recebida: ${temperature}°C`);
      }
    });

    // Limpa a conexão ao desmontar o componente
    return () => {
      mqttClient.end(); // Finaliza a conexão MQTT
    };
  }, []);

  useEffect(() => {
    // Verifica a diferença de temperatura
    if (temp1 && temp2) {
      const diff = Math.abs(parseFloat(temp1) - parseFloat(temp2));
      if (diff > 5) {
        setMessage('A planta está no sol! Diferença de temperatura maior que 5°C');
      } else {
        setMessage('A planta está na sombra. Diferença de temperatura aceitável.');
      }
    }
  }, [temp1, temp2]);

  const mqttSub = (client, subscription) => {
    if (client) {
      const { topic, qos } = subscription;
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error);
          return;
        }
      });
    }
  };

  return (
    <Container>
      <ArrowIcon onClick={() => navigate("/home")}>
        <FiArrowLeft size={50} />
      </ArrowIcon>
      <FiSun size={350} />
      <p>Temperatura 1: {temp1}°C</p> {/* Exibindo a temperatura 1 */}
      <p>Temperatura 2: {temp2}°C</p> {/* Exibindo a temperatura 2 */}
      <p>{message}</p> {/* Exibindo a mensagem de alerta */}
    </Container>
  );
}
