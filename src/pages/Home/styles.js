import { styled } from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: repeat(2, auto);
  justify-content: center;
  align-content: center;
  height: 100vh;
  gap: 100px;
`;

export const ButtonLabel = styled.p`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  font-size: 30px;
  font-weight: bold;
`