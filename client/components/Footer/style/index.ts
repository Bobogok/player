import styled from 'styled-components';

export const SFooter = styled.footer`
  padding: 30px 60px 90px;
  background-color: ${({ theme }) => theme.main};

  @media (max-width: 425px) {
    padding: 30px 10px 90px;
  }
`;

export const SMain = styled.div`
  max-width: 1366px;
  display: flex;
  margin: 0 auto;
  margin-bottom: 30px;

  & > ul:not(:last-child) {
    margin-right: 10px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;

    & > ul:not(:last-child) {
      margin-right: 0px;
    }
  }
`;

export const SSlogan = styled.h2`
  font-size: 30px;
  font-weight: 500;
  line-height: 1.125;
  flex: 1 0 40%;
  margin-right: 30px;
  color: ${({ theme }) => theme.white};

  @media (max-width: 768px) {
    margin-bottom: 15px;
    text-align: center;
    margin-right: 0px;
  }
`;

export const SLinks = styled.ul`
  flex: 1 1 30%;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const SLink = styled.li`
  color: ${({ theme }) => theme.white};
  font-size: 18px;
  line-height: 23px;
  padding: 8px 0;
`;

export const SFollow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 2px solid ${({ theme }) => theme.white};
`;

export const STitleFollow = styled.h3`
  line-height: 40px;
  color: ${({ theme }) => theme.white};
  margin-bottom: 6px;
`;

export const SMediaWrapper = styled.ul`
  display: flex;
  margin-bottom: 26px;
`;

export const SMedia = styled.li`
  margin: 0 15px;
`;

export const SMediaLink = styled.a`
  color: ${({ theme }) => theme.white};
`;

export const SCopyright = styled.div`
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  color: ${({ theme }) => theme.white};
`;
