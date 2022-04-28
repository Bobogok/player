import styled from 'styled-components';

const ProgressBar = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  left: 0;
  bottom: 65px;
  height: 16px;
  width: 100%;
  background: ${(props) => props.theme.main};
  transform-origin: 0;
  transition: transform 0.2s linear 0s;
`;

export default ProgressBar;
