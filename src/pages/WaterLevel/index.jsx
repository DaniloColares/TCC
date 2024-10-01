import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, ArrowIcon } from "./styles";
import { FiArrowLeft } from "react-icons/fi";
import mqtt from "mqtt";

export function WaterLevel() {
  const navigate = useNavigate();
  const [bombaStatus, setBombaStatus] = useState(false); // Status da bomba
  const [lastUpdate, setLastUpdate] = useState(""); // Timestamp da última atualização

  // MQTT Topics
  const MQTT_bomba = "/ifce/plantsupport_stsbomba";
  const MQTT_timestamp = "/ifce/plantsupport_timestamp";

  useEffect(() => {
    // Conectar ao broker MQTT
    const client = mqtt.connect('wss://broker.emqx.io:8084/mqtt');

    client.on("connect", () => {
      console.log("Conectado ao broker MQTT");
      client.subscribe(MQTT_bomba);
      client.subscribe(MQTT_timestamp);
    });

    client.on("message", (topic, message) => {
      const payload = message.toString();

      if (topic === MQTT_bomba) {
        setBombaStatus(payload === "on"); // Atualiza o status da bomba
      } else if (topic === MQTT_timestamp) {
        setLastUpdate(payload); // Atualiza o timestamp
      }
    });

    return () => {
      if (client) {
        client.end(); // Desconecta o cliente MQTT ao desmontar o componente
      }
    };
  }, []);

  return (
    <Container>
      <ArrowIcon onClick={() => navigate("/home")}>
        <FiArrowLeft size={50} />
      </ArrowIcon>

      {/* Exibir o status da bomba */}
      <p>Status da Bomba: {bombaStatus ? "Funcionando" : "Desligada"}</p>

      {/* Exibir o timestamp da última atualização */}
      <p>Última atualização: {lastUpdate}</p>
    </Container>
  );
}
