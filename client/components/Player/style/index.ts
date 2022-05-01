import styled, { css } from 'styled-components';

export const Container = styled.div`
  background: white;
  min-height: 65px;
  display: flex;
  align-items: center;
  position: fixed;
  width: 100%;
  // max-width: 1440px;
  margin: 0 auto;
  bottom: 0;
  padding: 0 10px;
  z-index: 101;
  transition: transform 0.25s ease;
`;

export const PlayButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;

  & > svg {
    color: ${(props) => props.theme.main};
    font-size: 40px;
  }
`;

export const Playbar = styled.div`
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

export const ProgressBar = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  left: 0;
  bottom: 65px;
  height: 16px;
  width: 100%;
  background: ${(props) => props.theme.main};
  transform-origin: 0;
  transition: transform 0.2s linear 0s;
`;

export const ProgressText = styled.div`
  font-size: 12px;
  padding: 0 10px;
  display: none;
  user-select: none;
  pointer-events: none;
  position: relative;

  ${Playbar}:hover & {
    display: block;
  }
`;

export const Tooltip = styled.div`
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

  ${Playbar}:hover & {
    opacity: 1;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const PrevueTrack = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 10px;
  cursor: pointer;

  @media (max-width: 450px) {
    display: none;
  }
`;

export const Typography = styled.a<{ variant: string }>`
  max-width: 120px;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 1.5;
  cursor: pointer;

  ${(props) => {
    switch (props.variant) {
      case 'main':
        return css`
          font-weight: 600;
          font-size: 1.25rem;
        `;
      case 'text':
        return css`
          font-weight: 400;
          font-size: 12px;
        `;
      default:
        return css`
          background-color: white;
          color: black;
        `;
    }
  }}

  &:hover {
    color: ${(props) => props.theme.main};
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-right: 20px;
  flex-direction: column;
  flex: 1 0 auto;

  @media (max-width: 768px) {
    flex: 1 1 auto;
  }
`;

export const Controls = styled.div`
  display: flex;
  flex: 1 0 auto;
  align-items: center;
  justify-content: center;

  & > button {
    margin: 0 10px;
  }

  @media (max-width: 768px) {
    & > button {
      margin: 0 8px;
    }
  }

  @media (max-width: 450px) {
    justify-content: flex-end;
  }
`;

export const Button = styled.button<{ fontSize?: number; isLoop?: boolean }>`
  cursor: pointer;
  padding: 10px;
  margin: 0 10px;

  & > svg {
    font-size: ${({ fontSize }) => fontSize};
    color: ${({ isLoop, theme }) => isLoop && theme.main};
  }
`;

export const Volume = styled.div`
  flex: 0 1 250px;

  @media (max-width: 768px) {
    opacity: 0;
    user-select: none;
    pointer-events: none;
    flex: 0 0 185px;
  }

  @media (max-width: 450px) {
    display: none;
  }
`;

export const Icons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & > svg {
    margin-right: 20px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Album = styled.div`
  display: flex;
  flex: 0 0 250px;
  align-items: center;
  justify-content: center;

  & > svg {
    margin-right: 20px;
  }

  @media (max-width: 768px) {
    flex: 0 0 185px;
  }

  @media (max-width: 450px) {
    flex: 0 0 120px;
  }
`;
