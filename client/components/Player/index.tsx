import { Pause, PlayArrow, VolumeUp } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { useActions } from '../../hooks/useAction';
import { useConvertSeconds } from '../../hooks/useConvertSeconds';
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

  const changeCurrentTime = (e: MouseEvent) => {
    const target = e.target as HTMLTextAreaElement;
    let time = duration * (e.clientX / target.clientWidth);

    audio.currentTime = time;
    setCurrentTime(time);
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

  return (
    <Container>
      {/* <ProgressBar currentTime={currentTime / duration} /> */}
      <ProgressBar currentTime={audio?.currentTime / duration} />
      <Playbar onClick={changeCurrentTime}>
        {/* убрать инлайн стили */}
        <div style={{ userSelect: 'none', pointerEvents: 'none' }}>
          {useConvertSeconds(currentTime)}
        </div>
        <div style={{ userSelect: 'none', pointerEvents: 'none' }}>
          {useConvertSeconds(duration)}
        </div>
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
