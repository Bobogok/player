import styled from 'styled-components';

const ProgressBar = styled.div({
  display: 'flex',
  position: 'absolute',
  right: 0,
  left: 0,
  bottom: 65,
  height: 16,
  width: '100%',
  background: '#1976d2',
  transformOrigin: 0,
  transition: 'transform .2s linear 0s',
});

export default ProgressBar;
