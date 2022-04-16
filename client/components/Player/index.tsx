import { Pause, PlayArrow, VolumeUp } from '@mui/icons-material';
import { Grid, IconButton, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../../hooks/useAction';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { ITrack } from '../../types/track';
import TrackProgress from '../TrackProgress';
import VolumeBar from '../VolumeBar';
import { Playback } from './style/Playback';

let audio: HTMLAudioElement;

const Player = () => {
  const track: ITrack = {
    _id: '625562a5a81c1f39f92f9bfa',
    name: '1000-7',
    artist: 'fem.love',
    text: 'text text text text',
    listens: 0,
    comments: [],
    picture:
      'http://localhost:5000/image/4721ca47-d1b1-4c76-8cf4-8fa524481e8c.jpg',
    audio:
      'http://localhost:5000/audio/47bff696-f9cc-4387-bc45-4b8e3130cf88.mp3',
  };

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

  console.log(duration, currentTime);

  useEffect(() => {
    if (!audio) {
      audio = new Audio();
      audio.src = track.audio;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration));
      };
      audio.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio.currentTime));
      };
    }
  }, []);

  const play = () => {
    if (pause) {
      playTrack();
      audio.play();
    } else {
      pauseTrack();
      audio.pause();
    }
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    let volume = +e.target.value;
    audio.volume = volume / 100;
    setVolume(volume);
  };

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    let duration = +e.target.value;
    audio.currentTime = duration;
    setCurrentTime(duration);
  };

  return (
    <Playback>
      <IconButton onClick={play}>
        {!pause ? <Pause /> : <PlayArrow />}
      </IconButton>
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
