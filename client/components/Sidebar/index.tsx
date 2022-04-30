import React, { memo, useEffect, useRef, useState } from 'react';
import { TrackListProps } from './props/SidebarProps';
import MenuIcon from '@mui/icons-material/Menu';
import useOutsideClick from '../../hooks/useClickOutside';
import HomeIcon from '@mui/icons-material/HomeOutlined';
import FireIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusicOutlined';
import HistoryIcon from '@mui/icons-material/LibraryBooksOutlined';
import FavoriteIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AlbumOutlinedIcon from '@mui/icons-material/AlbumOutlined';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  SScrim,
  SSidebar,
  SLogoWrapper,
  SBurger,
  SLogo,
  SMenu,
  SSection,
  SLink,
  SIcon,
  SEndpoint,
} from './style';

const menuItems = [
  { text: 'Главная', href: '/', icon: <HomeIcon /> },
  { text: 'Тренды', href: '/trands', icon: <FireIcon /> },
  { text: 'Коллекции', href: '/tracks', icon: <LibraryMusicIcon /> },
];

const secondSectionItems = [
  { text: 'Любимая музыка', href: '/albums', icon: <FavoriteIcon /> },
  { text: 'Альбомы', href: '/albums', icon: <AlbumOutlinedIcon /> },
  { text: 'История', href: '/albums', icon: <HistoryIcon /> },
];

const Sidebar: React.FC<TrackListProps> = ({ isOpen, setOpen }) => {
  const ref = useRef(null);
  const router = useRouter();
  const [isClose, setIsClose] = useState(true); // 💩💩💩
  console.log(ref);

  // useEffect(() => {
  //   setIsClose(isOpen);
  // }, []);
  console.log(isOpen, isClose);

  useOutsideClick(ref, () => {
    console.log(ref);

    setOpen(false);
    setIsClose(false);
  });

  return (
    <>
      <SScrim isOpen={isOpen} ref={ref} />
      <SSidebar isOpen={isOpen} close={isClose}>
        {/* Logo */}
        <SLogoWrapper>
          <SBurger
            onClick={() => {
              setOpen(false);
              setIsClose(false);
            }}
          >
            <MenuIcon />
          </SBurger>
          <Link href={'/'}>
            <SLogo>Soundbar</SLogo>
          </Link>
        </SLogoWrapper>

        {/* Menu */}
        <SMenu>
          <SSection>
            {menuItems.map((item) => (
              <Link href={item.href}>
                <SLink
                  onClick={() => {
                    setOpen(false);
                    setIsClose(false);
                  }}
                  active={item.href === router.route}
                >
                  <SIcon>{item.icon}</SIcon>
                  <SEndpoint>{item.text}</SEndpoint>
                </SLink>
              </Link>
            ))}
          </SSection>

          <SSection marginTop={20} border>
            {secondSectionItems.map((item) => (
              <Link href={item.href}>
                <SLink
                  onClick={() => {
                    setOpen(false);
                    setIsClose(false);
                  }}
                  active={item.href === router.route}
                >
                  <SIcon>{item.icon}</SIcon>
                  <SEndpoint>{item.text}</SEndpoint>
                </SLink>
              </Link>
            ))}
          </SSection>
        </SMenu>
      </SSidebar>
    </>
  );
};

export default Sidebar;
