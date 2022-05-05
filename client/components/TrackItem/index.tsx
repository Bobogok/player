import React from 'react';
import { Delete, Pause, PlayArrow } from '@mui/icons-material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useRouter } from 'next/router';
import { useDispatch, useStore } from 'react-redux';
import { useActions } from '../../hooks/useAction';
import { NextThunkDispatch } from '../../store';
import { deleteTrack } from '../../store/actions-creators/track';
import { TrackItemProps } from './props/TrackItemProps';
import {
  SArtist,
  SButton,
  SImage,
  SMore,
  SName,
  SNumber,
  SPLay,
  SText,
  STime,
  STrack,
} from './style';

const TrackItem: React.FC<TrackItemProps> = ({ track, number }) => {
  const router = useRouter();
  const dispatch = useDispatch() as NextThunkDispatch;
  const { playTrack, pauseTrack, setActiveTrack } = useActions();
  const store = useStore();
  const { pause, active } = store.getState().player;

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
      <STime>{'2:34'}</STime>
      <SButton>
        <SMore>
          <MoreHorizIcon />
        </SMore>
      </SButton>
    </STrack>
  );
};

export default TrackItem;
