import styled from 'styled-components';

const Playbar = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  right: 0;
  left: 0;
  bottom: 65px;
  height: 16px;
  opacity: 0.3;
  background-color: ${(props) => props.theme.main};
`;

export default Playbar;
