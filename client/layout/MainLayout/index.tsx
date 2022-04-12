import React from 'react';
import Navbar from '../../components/Navbar';
import { CustomizedContainer } from './styles';

// rafce
const MainLayout = ({ children }: any) => {
  return (
    <>
      <Navbar />
      <CustomizedContainer>{children}</CustomizedContainer>
    </>
  );
};

export default MainLayout;
