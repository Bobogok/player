import styled from 'styled-components';

const Controls = styled.div`
  display: flex;
  flex: 1 0 auto;
  align-items: center;
  justify-content: center;

  & > svg {
    margin: 0 20px;
  }

  @media (max-width: 768px) {
    & > svg {
      margin: 0 8px;
    }
  }

  @media (max-width: 450px) {
    justify-content: flex-end;
  }
`;

export default Controls;
