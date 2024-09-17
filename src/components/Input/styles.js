import { styled } from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  background-color: ${({ theme }) => theme.COLORS.WHITE};
  color: ${({ theme }) => theme.COLORS.WHITE};

  border: 2px solid ${({ theme }) => theme.COLORS.BACKGROUND_900};

  margin-bottom: 8px;
  border-radius: 10px;

  > input {
    height: ${({ height }) => height};
    width: 100%;

    padding: 12px;

    color: ${({ theme }) => theme.COLORS.BLACK};
    border: none;
    background: transparent;
    

    &::placeholder {
      color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
    }
  }

  > SVG {
    margin-left: 16px;
    color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
  }
`;