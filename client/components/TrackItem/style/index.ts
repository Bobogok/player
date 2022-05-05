import styled from 'styled-components';

export const STrack = styled.article<{ current: boolean }>`
  display: flex;
  align-items: center;
  border-radius: 3px;
  // border: ${({ current, theme }) => current && `2px solid ${theme.main}`};
  cursor: pointer;
  padding: 10px 0;
  transition: background-color 0.1s;

  &:hover {
    background-color: ${({ theme }) => theme.main}0f;
  }
`;

export const SNumber = styled.div`
  display: flex;
  justify-content: center;
  width: 40px;
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.black};
`;

export const SImage = styled.span<{ bg: string }>`
  width: 70px;
  height: 70px;
  position: relative;
  background-size: contain;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${({ bg }) => bg});
`;

export const SButton = styled.button`
  width: 40px;
  height: 40px;
  opacity: 0;
  transition: opacity 0.2s;

  ${STrack}:hover & {
    opacity: 1;
  }
`;

export const SPLay = styled.div`
  background-color: ${({ theme }) => theme.main}99; // 99 - opacity
  width: inherit;
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  & > svg {
    color: ${({ theme }) => theme.white};
  }
`;

export const SMore = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SText = styled.div`
  align-self: baseline;
  margin-left: 25px;
`;

export const SName = styled.a`
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.44px;
  display: block;
  font-weight: 700;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.black};
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.main};
  }
`;

export const SArtist = styled.a`
  line-height: 22px;
  letter-spacing: 0.44px;
  display: block;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #646464; // gray

  color: ${({ theme }) => theme.black};
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.main};
  }
`;

export const STime = styled.div`
  margin-left: auto;
  color: #646464; // gray
  line-height: 40px;
  font-weight: 500;
  letter-spacing: 0.44px;
`;
