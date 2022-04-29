import MenuIcon from '@mui/icons-material/Menu';
import MuiSearchIcon from '@mui/icons-material/Search';
import FileUpload from '@mui/icons-material/FileUploadOutlined';
import Notifications from '@mui/icons-material/NotificationsNoneOutlined';
import {
  Avatar,
  Burger,
  Container,
  Logo,
  LogoWrapper,
  ProfileIcon,
  ProfileWrapper,
  SearchField,
  SearchIcon,
  SearchWrapper,
} from './style';
import { useState } from 'react';
import Sidebar from '../Sidebar';

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  // console.log('перерендер Navbar');
  // console.log(sidebarOpen);

  return (
    <Container>
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Logo */}
      <LogoWrapper>
        <Burger onClick={() => setSidebarOpen(true)}>
          <MenuIcon />
        </Burger>
        <Logo>Soundbar</Logo>
      </LogoWrapper>

      {/* Search */}
      <SearchWrapper>
        <SearchField type="text" placeholder="Найти трек..." />
        <SearchIcon>
          <MuiSearchIcon />
        </SearchIcon>
      </SearchWrapper>

      {/* Profile */}
      <ProfileWrapper>
        <ProfileIcon>
          <FileUpload />
        </ProfileIcon>
        <ProfileIcon>
          <Notifications />
        </ProfileIcon>
        <Avatar />
      </ProfileWrapper>
    </Container>
  );
};

export default Navbar;
