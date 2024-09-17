import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Container, ArrowIcon, AddDeviceButton } from "./styles";

import { DeviceButton } from "../../components/DeviceButton";

import { Modal } from "../../components/Modal";

import { FiArrowLeft, FiPlus } from "react-icons/fi";

export function Devices() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return(
    <Container>
      <ArrowIcon onClick={() => navigate("/home")}>
        <FiArrowLeft size={50}/>
      </ArrowIcon>
      <DeviceButton deviceName='Planta 1' onClick={() => navigate("/home")}/>
      <AddDeviceButton onClick={handleClick}>
        <FiPlus />
        Adicionar dispositivo
      </AddDeviceButton>
      {isModalOpen && 
          <Modal 
            isOpen={isModalOpen}
            onClose={closeModal}
          />}
    </Container>
  )
}