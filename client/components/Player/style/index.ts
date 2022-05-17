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
  z-index: 99;
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
  white-space: nowrap;
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

  @media (max-width: 425px) {
    margin-right: 0px;
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

  @media (max-width: 425px) {
    display: none;
  }
`;
