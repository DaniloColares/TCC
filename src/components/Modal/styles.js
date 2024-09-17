import styled from 'styled-components';

export const ModalWrapper = styled.div`
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  height: 90%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; 
`;

export const ModalContent = styled.div`
  overflow-y: auto;
  background-color: white;
  padding: 50px;
  border-radius: 8px;
  width: fit-content;
  height: fit-content;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
    margin-bottom: 60px;
    margin-top: 30px;
  }

  div {
    width: 100%;
    margin-bottom: 20px;
  }

  p {
    color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  footer {
    width: 100%;
    gap: 20px;
    display: flex;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  color: ${({ theme }) => theme.COLORS.BACKGROUND_900};

  &:hover {
    background-color: #d2d7e9;
  }
`;

export const SaveButton = styled.button`
  font-size: 60px;
  color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
  border: none;
  background-color: transparent;
`;