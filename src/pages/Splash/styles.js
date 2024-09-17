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
  
  > h1 {
    color: white;
    width: 500px;
    font-size: 100px;
    text-align: center;
  }
`;

export const Icon = styled.div`
  color: white;
`;