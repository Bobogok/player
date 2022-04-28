import styled from 'styled-components';

const Album = styled.div`
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

  @media (max-width: 450px) {
    flex: 0 0 120px;
  }
`;

export default Album;
