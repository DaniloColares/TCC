import { useNavigate } from "react-router-dom";
import { Container, ArrowIcon } from "./styles";

import { FiArrowLeft, FiSun } from "react-icons/fi";

export function Temperature() {
  const navigate = useNavigate();

  return(
    <Container>
      <ArrowIcon onClick={() => navigate("/home")}>
        <FiArrowLeft size={50}/>
      </ArrowIcon>
      <FiSun size={350}/>
      <p>A temperatura atual no jarro é: </p>
    </Container>
  )
}