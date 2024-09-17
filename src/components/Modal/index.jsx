import React from 'react';
import { ModalWrapper, ModalContent, CloseButton, SaveButton } from './styles';

import { Input } from "../Input";

import { FiX, FiSave } from "react-icons/fi";

export function Modal ({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <ModalWrapper>
      <ModalContent>
        <CloseButton onClick={onClose}>
          <FiX size={30}></FiX>
        </CloseButton>
        <h1>Cadastre o Dispositivo</h1>
        <div>
          <p>Nome</p>
          <Input />
        </div>

        <SaveButton onClick={onClose}>
          <FiSave />
        </SaveButton>
        
      </ModalContent>
    </ModalWrapper>
  );
};
