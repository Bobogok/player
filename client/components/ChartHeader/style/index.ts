import styled from 'styled-components';

export const SContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 200px 20px 175px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.main};

  @media (max-width: 768px) {
    padding: 130px 20px 95px;
  }
`;

export const SContainerTops = styled.div`
  position: relative;
  display: flex;
  max-width: 1366px;
  width: 100%;
  margin: 0 auto;
`;

export const SPlay = styled.button`
  padding: 50px 0;
  position: relative;
`;

export const SPlayButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 0;
  margin-right: 10px;

  & > svg {
    color: ${({ theme }) => theme.white};
    font-size: 55px;
  }
`;

export const SWrapper = styled.div`
  width: 33%;

  @media (max-width: 425px) {
    width: auto;
  }
`;

export const SH1 = styled.h1`
  font-size: 40px;
  letter-spacing: 0.78px;
  margin-bottom: 10px;
  font-weight: 600;
  color: ${({ theme }) => theme.white};
`;

export const SH2 = styled.h2`
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0.5px;
  opacity: 0.9;
  padding-top: 5px;
  color: ${({ theme }) => theme.white};
`;

export const SAlbum = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  background-color: blue;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

export const STops = styled.div`
  position: absolute;
  top: -375px;
  right: 275px;
  transform: rotate(-45deg);

  ${SAlbum}:nth-child(1) {
    top: 0;
    right: 210px;
  }

  ${SAlbum}:nth-child(2) {
    top: 210px;
    right: 210px;
  }

  ${SAlbum}:nth-child(3) {
    top: 210px;
    right: 0;
  }

  @media (max-width: 768px) {
    ${SAlbum}:nth-child(1) {
      top: 210px;
      right: 210px;
    }

    ${SAlbum}:nth-child(2) {
      top: 320px;
      right: 210px;
    }

    ${SAlbum}:nth-child(3) {
      top: 320px;
      right: 100px;
    }
  }

  @media (max-width: 425px) {
    display: none;
  }
`;

export const SAlbumCover = styled.div<{ bg: string }>`
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  background-image: url(${({ bg }) => bg});
`;
