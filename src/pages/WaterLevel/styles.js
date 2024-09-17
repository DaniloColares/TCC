import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 100px;

  justify-content: center;
  align-items: center;

  p {
    margin-top: 100px;
    font-size: 40px;
    text-align: center;
  }
`;

export const ArrowIcon = styled.button`
  position: fixed;
  top: 25px;
  left: 25px;

  background: none;
  border: none;

  color: white;
`;