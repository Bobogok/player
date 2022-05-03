import React, { useMemo } from 'react';
import { Delete, Pause, PlayArrow } from '@mui/icons-material';
import { Grid, IconButton, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useDispatch, useStore } from 'react-redux';
import { useActions } from '../../hooks/useAction';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { NextThunkDispatch } from '../../store';
import { deleteTrack } from '../../store/actions-creators/track';
import { TrackItemProps } from './props/TrackItemProps';
import { STrack } from './style';

const TrackItem: React.FC<TrackItemProps> = ({ track }) => {
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
    <STrack
      onClick={() => router.push('/tracks/' + track._id)}
      current={!!active && track._id === active._id}
    >
      {active && track._id === active._id && !pause ? (
        <IconButton onClick={play}>
          <Pause />
        </IconButton>
      ) : (
        <IconButton onClick={play}>
          <PlayArrow />
        </IconButton>
      )}
      <img
        width={70}
        height={70}
        src={'http://localhost:5000/' + track.picture}
        alt="обложка трека"
      />
      <Grid
        container
        direction={'column'}
        sx={{ width: 200, margin: '0 20px' }}
      >
        <Typography variant={'h6'}>{track.name}</Typography>
        <Typography
          variant={'body1'}
          sx={{
            fontSize: 12,
            color: 'gray',
          }}
        >
          {track.artist}
        </Typography>
      </Grid>
      {/* {active && <div>02:11 / 03:33</div>} */}
      <IconButton
        onClick={onDelete}
        sx={{
          marginLeft: 'auto',
        }}
      >
        <Delete />
      </IconButton>
    </STrack>
  );
};

export default TrackItem;
