import styled from 'styled-components';

export const SChart = styled.main`
  // margin: 30px 10px;
  margin: 30px auto;
  justify-content: center;
  max-width: 1366px;
  display: flex;
`;

export const SContainer = styled.div`
  position: relative;
  // max-width: 900px;
  flex: 1 1 100%;
`;

export const STracks = styled.ul`
  list-style: none;
`;

export const STrack = styled.li`
  margin: 10px 0;
`;

export const SSidebar = styled.div`
  position: relative;
  flex: 1 1 450px;
  max-width: 40%;
  padding-right: 15px;
  margin-left: 50px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const STeaserWrapper = styled.div`
  position: sticky;
  top: 90px;
  width: 100%;
  // padding-bottom: 15px;
`;

export const STeaser = styled.a`
  display: block;
  margin-bottom: 20px;
  border-radius: 5px;
  overflow: hidden;
`;
