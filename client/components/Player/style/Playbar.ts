import styled from 'styled-components';

const Playbar = styled('div')({
  display: 'flex',
  WebkitJustifyContent: 'space-between',
  position: 'absolute',
  right: 0,
  left: 0,
  bottom: 60,
  height: 16,
  backgroundColor: '#1976d21f',
});

export default Playbar;
