import Head from 'next/head';
import React, { ReactNode } from 'react';
import Navbar from '../../components/Navbar';
import Player from '../../components/Player';
import { CustomizedContainer } from './styles';

interface MainLayoutProps {
  title?: string;
  description?: string;
  keywords?: string;
  children?: ReactNode;
}

// rafce
const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title,
  description,
  keywords,
}) => {
  return (
    <>
      <Head>
        <title>{title || 'Музыкальная платформа'}</title>
        <meta
          name="description"
          content={
            description ||
            'Музыкальная платформа на которой можно слушать любимые треки и добавлять свои.'
          }
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content={keywords || 'музыка, песни, треки, артисты, хиты'}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Navbar />
      <CustomizedContainer>{children}</CustomizedContainer>
      <Player />
    </>
  );
};

export default MainLayout;
