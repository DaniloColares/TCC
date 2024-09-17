import { useNavigate } from 'react-router-dom';

import { Container, Icon } from './styles';

import { FaTree } from 'react-icons/fa'

export function Splash() {
  const navigate = useNavigate();

  return (
    <Container onClick={() => navigate("/home")}>
      <Icon>
        <FaTree size={200}/>
      </Icon>
      <h1>save my plant</h1>
    </Container>
  )
}