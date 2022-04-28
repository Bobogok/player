import styled from 'styled-components';

const TextWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-right: 20px;
  flex-direction: column;
  flex: 1 0 auto;

  @media (max-width: 768px) {
    flex: 1 1 auto;
  }
`;

export default TextWrapper;
