import { Pause, PlayArrow, VolumeUp } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { useActions } from '../../hooks/useAction';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import VolumeBar from '../VolumeBar';
import { Container, Playbar, PlayButton, ProgressBar } from './style';

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

  if (audio && pause) {
    audio.pause();
  } else if (audio && !pause) {
    audio.play();
  }

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

  const secondsToTime = (time: number) => {
    let minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, '0');
    let seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');

    return `${minutes}:${seconds}`;
  };

  return (
    <Container>
      <ProgressBar currentTime={currentTime} />
      <Playbar>
        {/* <TrackProgress
          left={currentTime}
          right={duration}
          onChange={changeCurrentTime}
        /> */}
        <div>{secondsToTime(currentTime)}</div>
        <div>{secondsToTime(duration)}</div>
      </Playbar>
      <PlayButton onClick={pauseClick}>
        {!pause ? <Pause /> : <PlayArrow />}
      </PlayButton>
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
      <VolumeUp sx={{ marginLeft: 'auto' }} />
      <VolumeBar volume={volume} onChange={changeVolume} />
    </Container>
  );
};

export default Player;
