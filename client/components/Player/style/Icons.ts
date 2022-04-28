import styled from 'styled-components';

const Icons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & > svg {
    margin-right: 20px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export default Icons;
