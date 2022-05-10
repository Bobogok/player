import React, { useRef, useState } from 'react';
import { Delete, Pause, PlayArrow } from '@mui/icons-material';
import Favorite from '@mui/icons-material/FavoriteBorder';
import Headphones from '@mui/icons-material/Headphones';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PlaylistAdd from '@mui/icons-material/PlaylistAddOutlined';
import Share from '@mui/icons-material/ShareOutlined';
import LibraryMusic from '@mui/icons-material/LibraryMusicOutlined';
import PersonOutline from '@mui/icons-material/PersonOutlineOutlined';
import { useRouter } from 'next/router';
import { useDispatch, useStore } from 'react-redux';
import { useActions } from '../../hooks/useAction';
import { NextThunkDispatch } from '../../store';
import { deleteTrack } from '../../store/actions-creators/track';
import { TrackItemProps } from './props/TrackItemProps';
import {
  SAlbum,
  SAlbumWrapper,
  SArtist,
  SButton,
  SDetails,
  SImage,
  SItem,
  SLike,
  SLikeCount,
  SList,
  SListens,
  SMenu,
  SMenuContent,
  SMore,
  SName,
  SNumber,
  SPLay,
  SSubtitle,
  SText,
  STime,
  STitle,
  STrack,
} from './style';
import useOutsideClick from '../../hooks/useClickOutside';

const TrackItem: React.FC<TrackItemProps> = ({ track, number }) => {
  const router = useRouter();
  const dispatch = useDispatch() as NextThunkDispatch;
  const { playTrack, pauseTrack, setActiveTrack } = useActions();
  const store = useStore();
  const { pause, active } = store.getState().player;
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const ref = useRef(null);
  useOutsideClick(ref, () => {
    setOpenMenu(false);
  });

  const play = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!active || localStorage.getItem('currentTrack') !== track._id) {
      setActiveTrack(track);
      localStorage.setItem('currentTrack', track._id);
      playTrack();
    }

    if (
      active &&
      localStorage.getItem('currentTrack') === active?._id &&
      !pause
    ) {
      pauseTrack();
    } else {
      playTrack();
    }
  };

  const handleOpenMenu = () => {
    setOpenMenu(true);
  };

  const onDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    await dispatch(deleteTrack(track._id));
  };

  return (
    <STrack current={!!active && track._id === active._id}>
      <SNumber>{number}</SNumber>
      <SImage bg={'http://localhost:5000/' + track.picture}>
        {active && track._id === active._id && !pause ? (
          <SButton onClick={play}>
            <SPLay>
              <Pause />
            </SPLay>
          </SButton>
        ) : (
          <SButton onClick={play}>
            <SPLay>
              <PlayArrow />
            </SPLay>
          </SButton>
        )}
      </SImage>

      <SText>
        <SName onClick={() => router.push('/tracks/' + track._id)}>
          {track.name}
        </SName>
        <SArtist>{track.artist}</SArtist>
      </SText>
      <SLike>
        <Favorite />
        <SLikeCount>{340}</SLikeCount>
      </SLike>
      <STime>{'2:34'}</STime>
      <SButton onClick={handleOpenMenu}>
        <SMore>
          <MoreHorizIcon />
        </SMore>
      </SButton>
      {openMenu && (
        <SMenu ref={ref}>
          <SMenuContent>
            <SAlbumWrapper>
              <SAlbum>
                <img
                  width={60}
                  height={60}
                  src={'http://localhost:5000/' + track.picture}
                  alt="Обложка трека"
                />
              </SAlbum>
              <SDetails>
                <STitle>{track.name}</STitle>
                <SSubtitle>{track.artist}</SSubtitle>
                <SListens>
                  <Headphones />
                  Прослушиваний: {track.listens}
                </SListens>
              </SDetails>
            </SAlbumWrapper>

            <SList>
              <SItem>
                <PlaylistAdd />
                Добавить в плейлист
              </SItem>
              <SItem>
                <Share />
                Поделиться
              </SItem>
              <SItem>
                <LibraryMusic />
                Перейти к песне
              </SItem>
              <SItem>
                <PersonOutline />
                Перейти к исполнителю
              </SItem>
            </SList>
          </SMenuContent>
        </SMenu>
      )}
    </STrack>
  );
};

export default TrackItem;
