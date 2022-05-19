import styled from 'styled-components';

export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.main};
  height: 60px;
  box-shadow: -6px -6px 19px 0px #000000a6;
  z-index: 100;

  @media (max-width: 425px) {
    width: 100vw;
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Burger = styled.button`
  margin-right: 16px;
  margin-top: 2px;

  & > svg {
    color: white;
    font-size: 30px;
  }
`;

export const Logo = styled.div`
  color: ${(props) => props.theme.white};
  font-size: 25px;
  font-weight: 500;
  user-select: none;
  cursor: pointer;

  @media (max-width: 425px) {
    display: none;
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  width: 55%;
  height: 35px;

  @media (max-width: 768px) {
    width: auto;
    margin: 0 15px;
  }

  @media (max-width: 325px) {
    display: none;
  }
`;

export const SearchField = styled.input`
  border-radius: 3px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  background: #fff !important;
  outline: none;
  padding: 5px;
  width: 100%;
  color: black;
  font-size: 16px;
`;

export const SearchIcon = styled.button`
  padding: 0 20px;
  padding-top: 2px;
  width: 64px;
  position: relative;
  background-color: #fff;
  border-radius: 3px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;

  & > svg {
    color: ${(props) => props.theme.main};
  }
`;

export const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ProfileIcon = styled.div`
  margin-right: 10px;
  cursor: pointer;
  padding: 5px;

  & > svg {
    font-size: 25px;
    color: ${(props) => props.theme.white};
  }
`;

export const Avatar = styled.div`
  cursor: pointer;
  // padding: 5px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-size: cover;
  background-image: url(https://avatars.mds.yandex.net/get-yapic/41409/rtL8xTFQQiWjrBHkgaNz1b0CLs-1/islands-retina-middle);
`;

export const SSignIn = styled.button`
  padding: 2px 15px 2px;
  border: 2px solid ${({ theme }) => theme.white};
  border-radius: 35px;
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.main};
  font-size: 16px;
  height: 35px;
  font-weight: 600;
  box-shadow: 0px 5px 18px -5px rgba(34, 60, 80, 0.6);
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0px 0px 18px -5px rgba(34, 60, 80, 0.6);
  }
`;
