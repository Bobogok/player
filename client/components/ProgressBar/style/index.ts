import styled from 'styled-components';

export const SPlaybar = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  right: 0;
  left: 0;
  bottom: 65px;
  height: 16px;
  background-color: ${(props) => props.theme.main}60; // 60 - opacity
`;

export const SProgressBar = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  left: 0;
  bottom: 65px;
  height: 16px;
  width: 100%;
  background: ${(props) => props.theme.main};
  transform-origin: 0;
  transition: transform 0.3s linear;
`;

export const SProgressText = styled.div`
  font-size: 12px;
  padding: 0 10px;
  display: none;
  user-select: none;
  pointer-events: none;
  position: relative;

  ${SPlaybar}:hover & {
    display: block;
  }
`;

export const STooltip = styled.div`
  position: absolute;
  opacity: 0;
  top: -40px;
  display: flex;
  justify-content: center;
  width: 60px;
  padding: 7px 10px;
  transition: opacity 0.2s linear 0s;
  border-radius: 3px;
  background: ${(props) => props.theme.main};
  border: 1px solid #6da7e0;
  color: white;
  user-select: none;
  pointer-events: none;
  z-index: 1;

  &:before {
    content: '';
    width: 15px;
    height: 15px;
    position: absolute;
    bottom: -5px;
    left: calc((15px / 2) + 60);
    background: ${(props) => props.theme.main};
    transform: rotate(45deg);
    z-index: -1;
  }

  ${SPlaybar}:hover & {
    opacity: 1;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;
