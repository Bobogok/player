import styled from 'styled-components';

const Container = styled.div`
  background: white;
  min-height: 65px;
  display: flex;
  align-items: center;
  position: fixed;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  bottom: 0;
  padding: 0 10px;
  z-index: 101;
  transition: transform 0.25s ease;
`;

export default Container;
