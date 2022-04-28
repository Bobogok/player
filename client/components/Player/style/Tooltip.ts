import styled from 'styled-components';
import Playbar from './Playbar';

const Tooltip = styled.div`
  position: absolute;
  opacity: 0;
  top: -40px;
  display: flex;
  justify-content: center;
  width: 60px;
  padding: 7px 10px;
  transition: opacity 0.2s linear 0s;
  border-radius: 3px;
  background: #1976d2;
  border: 1px solid #6da7e0;
  color: white;
  user-select: none;
  pointer-events: none;
  z-index: 1;

  &:before {
    content: '';
    width: 15px;
    height: 15px;
    position: absolute;
    bottom: -5px;
    left: calc((15px / 2) + 60);
    background: #1976d2;
    transform: rotate(45deg);
    z-index: -1;
  }

  ${Playbar}:hover & {
    opacity: 1;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export default Tooltip;
