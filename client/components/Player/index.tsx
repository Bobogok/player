import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import PlayIcon from '@mui/icons-material/PlayCircleFilledOutlined';
import PauseIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import RepeatIcon from '@mui/icons-material/Repeat';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import React, { useCallback, useEffect, useState } from 'react';
import { useActions } from '../../hooks/useAction';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { convertToSeconds, trottlingEvents } from '../../src/helpers';
import VolumeBar from '../VolumeBar';
import {
  Album,
  Container,
  Controls,
  Icons,
  Playbar,
  PlayButton,
  PrevueTrack,
  ProgressBar,
  ProgressText,
  TextWrapper,
  Tooltip,
  Typography,
  Volume,
} from './style';

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
  const [tooltip, setToolTip] = useState<{ position: number; time: string }>({
    position: 0,
    time: '00:00',
  });

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

  const changeCurrentTime = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
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

  const changeTooltip = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLTextAreaElement;
    trottlingEvents(
      () =>
        setToolTip({
          position: e.clientX,
          time: convertToSeconds(duration * (e.clientX / target.clientWidth)),
        }),
      15,
      e.type,
    );
  };

  return (
    <Container>
      {/* ProgressBar */}
      <ProgressBar
        style={{ transform: `scaleX(${audio?.currentTime / duration})` }}
      />
      <Playbar onClick={changeCurrentTime} onMouseMove={changeTooltip}>
        <Tooltip style={{ left: `${tooltip.position! - 30}px` }}>
          {tooltip.time}
        </Tooltip>
        <ProgressText>{convertToSeconds(currentTime)}</ProgressText>
        <ProgressText>{convertToSeconds(duration)}</ProgressText>
      </Playbar>

      {/* PrevueTrack */}
      <Album>
        <PrevueTrack>
          <img
            width={50}
            height={50}
            src={'http://localhost:5000/' + active.picture}
            alt="Обложка трека"
          />
        </PrevueTrack>
        <TextWrapper>
          <Typography variant={'main'}>{active?.name}</Typography>
          <Typography variant={'text'}>{active?.artist}</Typography>
        </TextWrapper>

        <Icons>
          <FavoriteBorderIcon />
          <ShareIcon />
          <FileDownloadOutlinedIcon />
        </Icons>
      </Album>

      {/* Controls */}
      <Controls>
        <ShuffleIcon sx={{ fontSize: 20 }} />
        <SkipPreviousIcon sx={{ fontSize: 25 }} />
        <PlayButton onClick={pauseClick}>
          {!pause ? (
            <PauseIcon sx={{ fontSize: 40, color: '#1976d2' }} />
          ) : (
            <PlayIcon sx={{ fontSize: 40, color: '#1976d2' }} />
          )}
        </PlayButton>
        <SkipNextIcon sx={{ fontSize: 25 }} />
        <RepeatIcon sx={{ fontSize: 20 }} />
      </Controls>

      {/* volume */}
      <Volume>
        <VolumeBar volume={volume} onChange={changeVolume} />
      </Volume>
    </Container>
  );
};

export default Player;
