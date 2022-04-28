import styled from 'styled-components';

const PlayButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;

  & > svg {
    color: ${(props) => props.theme.main};
    font-size: 40px;
  }
`;

export default PlayButton;
