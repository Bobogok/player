import { Pause, PlayArrow, VolumeUp } from '@mui/icons-material';
import { Grid, IconButton, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../../hooks/useAction';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { ITrack } from '../../types/track';
import TrackProgress from '../TrackProgress';
import VolumeBar from '../VolumeBar';
import { Playback } from './style/Playback';

let audio: HTMLAudioElement;

const Player = () => {
  const { pause, volume, active, duration, currentTime } = useTypedSelector(
    (state) => state.player,
  );
  const {
    pauseTrack,
    playTrack,
    setVolume,
    setCurrentTime,
    setDuration,
    setActiveTrack,
  } = useActions();

  const setAudio = () => {
    if (active && !currentTime) {
      audio.src = 'http://localhost:5000/' + active.audio;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration));
      };
      audio.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio.currentTime));
      };
    }
  };

  const play = () => {
    if (pause) {
      pauseTrack();
      audio.pause();
    } else {
      playTrack();
      audio.play();
    }
  };

  const pauseClick = () => {
    if (!pause) {
      pauseTrack();
      audio.pause();
    } else {
      playTrack();
      audio.play();
    }
  };

  const changeVolume = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let volume = +e.target.value;
      audio.volume = volume / 100;
      setVolume(volume);
    },
    [volume],
  );

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    let duration = +e.target.value;
    audio.currentTime = duration;
    setCurrentTime(duration);
  };

  useEffect(() => {
    console.log('сработал');

    if (!audio) {
      audio = new Audio();
    } else if (audio && !currentTime) {
      setAudio();
      play();
    }
  }, [active]);

  if (!active) {
    return null;
  }

  return (
    <Playback>
      <IconButton
        onClick={() => {
          pauseClick();
          // setPauseButtonAction(!pauseButton);
        }}
      >
        {!pause ? <Pause /> : <PlayArrow />}
      </IconButton>
      <Grid
        container
        direction={'column'}
        sx={{ width: 200, margin: '0 20px' }}
      >
        <Typography variant={'h6'}>{active?.name}</Typography>
        <Typography
          variant={'body1'}
          sx={{
            fontSize: 12,
            color: 'gray',
          }}
        >
          {active?.artist}
        </Typography>
      </Grid>
      <TrackProgress
        left={currentTime}
        right={duration}
        onChange={changeCurrentTime}
      />
      <VolumeUp sx={{ marginLeft: 'auto' }} />
      <VolumeBar volume={volume} onChange={changeVolume} />
    </Playback>
  );
};

export default Player;
