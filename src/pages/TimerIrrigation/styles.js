import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: relative;
`;

export const ArrowIcon = styled.button`
  position: fixed;
  top: 25px;
  left: 25px;
  background: none;
  border: none;
  color: white;
  z-index: 1000;
`;

export const TimerTextWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 320px;
  height: 320px;
`;

export const Circle = styled.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
`;

export const CircleBackground = styled.circle`
  fill: none;
  stroke: ${({ theme }) => theme.COLORS.WHITE};
  stroke-width: 20;
`;

export const CircleProgress = styled.circle`
  fill: none;
  stroke: ${({ theme }) => theme.COLORS.BACKGROUND_700};
  stroke-width: 20;
  stroke-linecap: round;
  transition: stroke-dashoffset 1s linear;
`;

export const TimerText = styled.div`
  font-size: 60px;
  color: ${({ theme }) => theme.COLORS.WHITE};
  position: relative;
  z-index: 1;
`;

export const Footer = styled.footer`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 24px;
`;

export const ButtonsFooter = styled.div`
  display: flex;
  gap: 25px;
`;

export const ButtonAction = styled.button`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid green;
  color: green;
`;
export const ButtonActivate = styled.button`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid blue; 
  color: blue;
`;
