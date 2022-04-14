import React from 'react';
import Navbar from '../../components/Navbar';
import Player from '../../components/Player';
import { CustomizedContainer } from './styles';

// rafce
const MainLayout = ({ children }: any) => {
  return (
    <>
      <Navbar />
      <CustomizedContainer>{children}</CustomizedContainer>
      <Player />
    </>
  );
};

export default MainLayout;
