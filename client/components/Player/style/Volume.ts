import styled from 'styled-components';

const Volume = styled.div`
  flex: 0 1 250px;

  @media (max-width: 768px) {
    opacity: 0;
    user-select: none;
    pointer-events: none;
    flex: 0 0 185px;
  }

  @media (max-width: 450px) {
    display: none;
  }
`;

export default Volume;
