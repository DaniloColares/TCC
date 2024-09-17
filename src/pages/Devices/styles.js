import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 100px;

  margin-top: 20px;

  justify-content: flex-start;
  align-items: flex-start;

`;

export const ArrowIcon = styled.button`
  position: fixed;
  top: 25px;
  left: 25px;

  background: none;
  border: none;

  color: white;
`;

export const AddDeviceButton = styled.button`
  height: fit-content;
  width: fit-content;
  padding: 20px;
  border-radius: 50px;
  border: none;
  position: fixed;
  bottom: 25px;
  right: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
  gap: 10px;
  font-size: 30px;
  font-weight: bold;
`