import styled from 'styled-components';

const Container = styled('div')({
  minHeight: 60,
  display: 'flex',
  alignItems: 'center',
  position: 'fixed',
  width: '100%',
  maxWidth: 1440,
  margin: '0 auto',
  bottom: 0,
  padding: '0 10px',
  zIndex: 101,
  transition: 'transform .25s ease,-webkit-transform .25s ease',
});

export default Container;
