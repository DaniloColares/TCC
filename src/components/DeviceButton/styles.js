import { styled } from "styled-components";

export const Container = styled.button`
  width: fit-content;
  height: fit-content;

  background: ${({theme}) => theme.COLORS.WHITE};
  color: ${({theme}) => theme.COLORS.BACKGROUND_900};

  border: 0;
  padding: 20px;
  border-radius: 10px;

  font-weight: 700;
  font-size: 40px;

  &:disabled {
    opacity: 0.5;
  }
`;