import styled, { css, keyframes } from 'styled-components';

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
    opacity: 0;
    transform: translateZ(0);
  }
`;

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
    visibility: hidden;
    transform: translate3d(-100%, 0, 0);
  }
`;

export const SSidebar = styled.div<{ isOpen: boolean; isMounted: boolean }>`
  ${({ isOpen, isMounted }) => {
    if (!isOpen && !isMounted) {
      return css`
        visibility: hidden;
        transform: translate3d(-100%, 0, 0);
      `;
    } else if (isOpen && isMounted) {
      return css`
        visibility: visible;
        transform: translate3d(0, 0, 0);
        animation: ${slide} 0.2s ease-out;
      `;
    } else if (!isOpen && isMounted) {
      return css`
        visibility: hidden;
        transform: translate3d(-100%, 0, 0);
        animation: ${slideOut} 0.2s ease-out;
      `;
    }
  }};

  width: 260px;
  background-color: ${({ theme }) => theme.white};
  height: 100vh;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  overflow: hidden;
`;

export const SLogoWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 60px;
  background-color: ${({ theme }) => theme.main};
  box-shadow: 0px 5px 10px 2px ${(props) => props.theme.border};
`;

export const SBurger = styled.button`
  margin-right: 16px;
  margin-top: 2px;

  & > svg {
    color: ${({ theme }) => theme.white};
    font-size: 30px;
  }
`;

export const SLogo = styled.div`
  color: ${({ theme }) => theme.white};
  font-size: 25px;
  font-weight: 500;
  user-select: none;
  cursor: pointer;
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
  position: fixed;
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
  min-height: 50px;
  padding: 0px 16px;
  margin-right: 16px;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  transition: all 0.13s ease-out;
  position: relative;
  ${({ active, theme }) =>
    active &&
    css`
      background-color: ${theme.main};
      border-top-right-color: ${theme.main};

      // этот блок переделать
      & > div {
        svg {
          color: white;
        }
      }

      &:hover > div {
        svg {
          color: white !important;
        }
      }

      & > a {
        color: white;
      }
    `};

  &:hover {
    box-shadow: 7px 7px 20px 0px #0002, 4px 4px 5px 0px #0001;
  }

  &:active {
    box-shadow: 7px 7px 20px 0px #0002, 4px 4px 5px 0px #0001;
  }
`;

export const SEndpoint = styled.a`
  color: ${({ theme }) => theme.black};

  ${SLink}:hover & {
    transition: color 0.13s ease-out;
    // color: ${({ theme }) => theme.main};
  }
`;

export const SIcon = styled.div`
  margin-right: 20px;
  display: flex;
  padding: 0 2px;

  & > svg {
    color: ${({ theme }) => theme.black};
    font-size: 23px;
  }

  ${SLink}:hover & > svg {
    transition: color 0.13s ease-out;
    color: ${({ theme }) => theme.main};
  }
`;
