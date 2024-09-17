import { useNavigate } from "react-router-dom";
import { Container, ArrowIcon } from "./styles";

import { FiArrowLeft } from "react-icons/fi";
import { FaWater } from "react-icons/fa"

export function WaterLevel() {
  const navigate = useNavigate();

  const needWater = true;

  return(
    <Container>
      <ArrowIcon onClick={() => navigate("/home")}>
        <FiArrowLeft size={50}/>
      </ArrowIcon>
      <FaWater size={350}/>
      {needWater ? (
        <p>Atenção! O nível de água está baixo! Abasteça o reservatório!</p>
      ) : (
        <p>O nível de água no reservatório está bom! Verifique novamente mais tarde!</p>
      )}
    </Container>
  )
}