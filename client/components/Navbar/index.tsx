import MenuIcon from '@mui/icons-material/Menu';
import MuiSearchIcon from '@mui/icons-material/Search';
import FileUpload from '@mui/icons-material/FileUploadOutlined';
import Notifications from '@mui/icons-material/NotificationsNoneOutlined';
import {
  Avatar,
  Burger,
  Header,
  Logo,
  LogoWrapper,
  ProfileIcon,
  ProfileWrapper,
  SearchField,
  SearchIcon,
  SearchWrapper,
  SSignIn,
} from './style';
import { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import { useDispatch } from 'react-redux';
import { NextThunkDispatch } from '../../store';
import { searchTracks } from '../../store/actions-creators/track';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface IPassport {
  dateOfBirth: string;
  firstName: string;
  secondName: string;
  sex: string;
  moderator?: boolean;
}

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch() as NextThunkDispatch;
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);
  const [passport, setPassport] = useState<IPassport | null>(null);

  useEffect(() => {
    setPassport(JSON.parse(localStorage.getItem('passport')!));
    setNickname(localStorage.getItem('nickname'));
  }, []);

  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(async () => {
        await dispatch(await searchTracks(e.target.value));
      }, 500),
    );
  };

  return (
    <Header>
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Logo */}
      <LogoWrapper>
        <Burger onClick={() => setSidebarOpen(true)}>
          <MenuIcon />
        </Burger>
        <Link href={'/'}>
          <Logo>Soundbar</Logo>
        </Link>
      </LogoWrapper>

      {/* Search */}
      <SearchWrapper>
        <SearchField
          type="text"
          placeholder="Найти трек..."
          value={query}
          onChange={search}
        />
        <SearchIcon>
          <MuiSearchIcon />
        </SearchIcon>
      </SearchWrapper>

      {/* Profile */}
      <ProfileWrapper>
        {nickname ? (
          <>
            {passport?.moderator && (
              <ProfileIcon onClick={() => router.push('/tracks/create')}>
                <FileUpload />
              </ProfileIcon>
            )}
            <ProfileIcon>
              <Notifications />
            </ProfileIcon>
            <Avatar />
          </>
        ) : (
          <SSignIn onClick={() => router.push('/auth')}>Войти</SSignIn>
        )}
      </ProfileWrapper>
    </Header>
  );
};

export default Navbar;
