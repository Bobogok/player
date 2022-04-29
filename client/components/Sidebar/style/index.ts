import styled, { css, keyframes } from 'styled-components';

const slide = keyframes`
  from {
    transform: translate3d(-100%, 0, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    transform: translate3d(-100%, 0, 0);
  }
`;

export const SSidebar = styled.div<{ isOpen: boolean }>`
  // transform: translate3d(-100%, 0, 0);
  transform: ${({ isOpen }) =>
    isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)'};
  animation: ${({ isOpen }) =>
    isOpen
      ? css`
          ${slide} 0.2s ease-out
        `
      : css`
          ${slideOut} 0.2s ease-out
        `};
  width: 260px;
  background-color: ${({ theme }) => theme.white};
  height: 100vh;
  padding: 0px 16px;
  position: fixed;
  z-index: 999;
  // opacity: 0.5;
  top: 0;
  left: 0;
`;

export const SLogoWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 0;
`;

export const SBurger = styled.button`
  margin-right: 16px;
  margin-top: 2px;

  & > svg {
    color: ${({ theme }) => theme.black};
    font-size: 30px;
  }
`;

export const SLogo = styled.div`
  color: ${({ theme }) => theme.black};
  font-size: 25px;
  font-weight: 500;
  user-select: none;
`;

const scrimIn = keyframes`
  from {
    opacity: 0;
    transform: translateZ(0);
  }

  to {
    opacity: 1;
    transform: translateZ(100%);
  }
`;

const scrimOut = keyframes`
  from {
    opacity: 1;
    transform: translateZ(100%);
  }

  to {
    display: none;
    opacity: 0;
    transform: translateZ(0);
  }
`;

export const SScrim = styled.div<{ isOpen: boolean }>`
  ${({ isOpen }) =>
    isOpen
      ? css`
          display: block;
          opacity: 1;
          transform: translateZ(100%);
        `
      : css`
          display: none;
          opacity: 0;
          transform: translateZ(0);
        `};
  animation: ${({ isOpen }) =>
    isOpen
      ? css`
          ${scrimIn} 0.2s ease-out
        `
      : css`
          ${scrimOut} 0.2s ease-out
        `};
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
`;

export const SMenu = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const SSection = styled.div<{ marginTop?: number; border?: boolean }>`
  ${({ marginTop }) =>
    marginTop &&
    css`
      margin-top: ${marginTop}px;

      ${SLink}:first-child {
        margin-top: ${marginTop / 2}px;
      }
    `};
  border-top: ${({ border, theme }) => border && `1px solid ${theme.black}`};
`;

export const SLink = styled.div<{ active?: boolean }>`
  min-height: 40px;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;
  border-radius: 3px;
  ${({ active, theme }) => active && `border: 1px solid ${theme.main}`};
`;

export const SIcon = styled.div`
  margin-right: 20px;
  display: flex;
  padding: 0 2px;

  & > svg {
    color: ${({ theme }) => theme.black};
    font-size: 23px;
  }
`;

export const SEndpoint = styled.a`
  color: ${({ theme }) => theme.black};
`;
