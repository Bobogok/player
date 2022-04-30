import styled from 'styled-components';

export const Container = styled.header`
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.main};
  height: 60px;
  box-shadow: 0px 5px 10px 2px ${(props) => props.theme.border};
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
`;

export const SearchWrapper = styled.div`
  display: flex;
  width: 55%;
  height: 35px;
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
