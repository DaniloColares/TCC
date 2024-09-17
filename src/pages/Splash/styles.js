import { styled } from "styled-components";

export const Container = styled.button`
  height: 100vh;
  width: 100%;
  background-color: ${({theme}) => theme.COLORS.BACKGROUND_700};

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  
  gap: 30px;
`;

export const Icon = styled.div`
  color: white;
`;