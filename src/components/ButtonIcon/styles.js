import { styled } from "styled-components";

export const Container = styled.button`
  width: 350px;
  height: 350px;

  background: ${({theme}) => theme.COLORS.WHITE};
  color: ${({theme}) => theme.COLORS.BACKGROUND_900};

  border: 0;
  padding: 10px 10px;
  border-radius: 10px;

  font-weight: 700;

  &:disabled {
    opacity: 0.5;
  }
`;