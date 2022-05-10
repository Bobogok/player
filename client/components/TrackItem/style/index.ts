import styled from 'styled-components';

export const STrack = styled.article<{ current: boolean }>`
  position: relative;
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

  & > svg {
    font-size: 26px;
    transition: color 0.1s ease;
  }

  &:active > svg {
    color: ${({ theme }) => theme.main};
  }
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

export const SLike = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;

  & > svg {
    font-size: 18px;
  }
`;

export const SLikeCount = styled.span`
  margin-left: 5px;
  color: #646464; // gray
  line-height: 40px;
  font-weight: 500;
  letter-spacing: 0.44px;
`;

export const STime = styled.div`
  margin-left: 15px;
  color: #646464; // gray
  line-height: 40px;
  font-weight: 500;
  letter-spacing: 0.44px;
`;

export const SMenu = styled.div`
  cursor: auto;
  position: absolute;
  top: 0;
  right: -335px;
  width: 320px;
  background-color: ${({ theme }) => theme.white};
  z-index: 10;
  border-radius: 10px;
  box-shadow: 0 5px 25px 0 rgb(0 0 0 / 30%);

  &:before {
    content: '';
    left: -15px;
    top: 30px;
    height: 30px;
    width: 15px;
    position: absolute;
    z-index: 10;
    border-right: 15px solid ${({ theme }) => theme.white};
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
  }
`;

export const SMenuContent = styled.article`
  // padding: 10px;
`;

export const SAlbumWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
  padding: 15px 15px 0px 15px;
`;

export const SAlbum = styled.div`
  width: 60px;
  height: 60px;
  margin-right: 15px;

  img {
    border-radius: 5px;
  }
`;

export const SDetails = styled.div`
  flex: 1 1 100%;
`;

export const STitle = styled.h2`
  font-size: 16px;
  line-height: 22px;
  font-weight: 500;
`;

export const SSubtitle = styled.h2`
  font-size: 16px;
  line-height: 22px;
  max-height: 44px;
`;

export const SListens = styled.p`
  color: #bdbdbd;
  white-space: nowrap;
  display: flex;

  & > svg {
    font-size: 14px;
    margin-right: 5px;
  }
`;

export const SList = styled.ul``;

export const SItem = styled.li`
  display: flex;
  align-items: center;
  border-top: 1px solid #e4e4e4;
  padding: 0 16px;
  overflow: hidden;
  height: 48px;
  line-height: 48px;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.15s ease;

  & > svg {
    margin-right: 16px;
    color: #eee;
  }

  &:hover {
    background-color: #1976d20f;

    svg {
      color: ${({ theme }) => theme.main};
    }
  }
`;
