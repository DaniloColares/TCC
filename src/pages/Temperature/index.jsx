import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, ArrowIcon } from "./styles";
import mqtt from "mqtt";
import { FiArrowLeft, FiSun } from "react-icons/fi";

// Tópicos MQTT
const PUBLISH_TOPIC = '/ifce/tnc_temp_sensor';  // Tópico que publica a temperatura
const SUBSCRIBE_TOPIC = '/ifce/tnc_command';    // Tópico que recebe comandos

export function Temperature() {
  const [metrics, setMetrics] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Conectar ao broker público EMQX
    const client = mqtt.connect('mqtt://broker.emqx.io:1883'); // Conexão via MQTT na porta 1883

    client.on('connect', handleConnection);

    function handleConnection() {
      console.log("Conectado ao broker EMQX");
      client.subscribe(SUBSCRIBE_TOPIC); // Inscreve-se no tópico de comando

      // Publicar temperatura no tópico especificado
      client.publish(PUBLISH_TOPIC, '25.5'); // Exemplo: publicando uma temperatura de 25.5°C

      client.on('message', (topic, message) => {
        if (topic === SUBSCRIBE_TOPIC) {
          const command = message.toString(); // Converte a mensagem para string
          console.log(`Comando recebido: ${command}`);
          speakCommand(command); // Fala o comando recebido
        }
      });
    }

    return () => {
      client.end(); // Finaliza a conexão MQTT quando o componente desmonta
    };
  }, []);

  // Função para converter o comando recebido em fala
  function speakCommand(command) {
    const utterance = new SpeechSynthesisUtterance(`O comando recebido foi: ${command}`);
    speechSynthesis.speak(utterance); // Converte o texto em fala
  }

  return (
    <Container>
      <ArrowIcon onClick={() => navigate("/home")}>
        <FiArrowLeft size={50} />
      </ArrowIcon>
      <FiSun size={350} />
      <p>A temperatura atual no jarro é: {metrics} °C</p>
    </Container>
  );
}