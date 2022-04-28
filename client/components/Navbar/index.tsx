import * as React from 'react';
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

const drawerWidth = 240;

const menuItems = [
  { text: 'Главная', href: '/' },
  { text: 'Список треков', href: '/tracks' },
  { text: 'Список альбомов', href: '/albums' },
];

function Navbar() {
  return (
    <Container>
      {/* Logo */}
      <LogoWrapper>
        <Burger>
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

  // // const theme = useTheme();
  // const [open, setOpen] = React.useState(false);
  // const router = useRouter();

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };
}

export default Navbar;
