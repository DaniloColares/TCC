import { useNavigate } from "react-router-dom";

import { Container, ButtonLabel } from "./styles";

import { ButtonIcon } from "../../components/ButtonIcon";

import { FiDroplet, FiSun, FiWifi } from "react-icons/fi";
import { FaWater } from 'react-icons/fa'

export function Home() {
  const navigate = useNavigate();

  return (
    <Container>
      <div>
        <ButtonIcon icon={FiWifi} onClick={() => navigate("/devices")}/>
        <ButtonLabel>Dispositivos</ButtonLabel>
      </div>
      <div>
        <ButtonIcon icon={FiDroplet} onClick={() => navigate("/timer")}/>
        <ButtonLabel>Irrigação</ButtonLabel>
      </div>
      <div>
        <ButtonIcon icon={FiSun} onClick={() => navigate("/temperature")}/>
        <ButtonLabel>Temperatura</ButtonLabel>
      </div>
      <div>
        <ButtonIcon icon={FaWater} onClick={() => navigate("/waterlevel")}/>
        <ButtonLabel>Bomba</ButtonLabel>
      </div>
    </Container>
  )
}