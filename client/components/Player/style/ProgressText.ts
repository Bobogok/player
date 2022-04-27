import styled from 'styled-components';
import Playbar from './Playbar';

const ProgressText = styled.div`
  font-size: 12px;
  padding: 0 10px;
  display: none;
  user-select: none;
  pointer-events: none;
  position: relative;

  ${Playbar}:hover & {
    display: block;
  }
`;

export default ProgressText;
