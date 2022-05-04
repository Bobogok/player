import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import PlayIcon from '@mui/icons-material/PlayCircleFilledOutlined';
import PauseIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import RepeatOffIcon from '@mui/icons-material/Repeat';
import RepeatOnIcon from '@mui/icons-material/RepeatOnOutlined';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import React, { useCallback, useEffect, useState } from 'react';
import { useActions } from '../../hooks/useAction';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import VolumeBar from '../VolumeBar';
import {
  Album,
  Button,
  Container,
  Controls,
  Icons,
  PlayButton,
  PrevueTrack,
  TextWrapper,
  Typography,
  Volume,
} from './style';
import ProgressBar from '../ProgressBar';
import { PlayerState } from '../../types/player';

let audio: HTMLAudioElement;

const Player = () => {
  const [isLoop, setIsLoop] = useState(false);

  const checkEqual = (curr: PlayerState, next: PlayerState) => {
    return curr.pause === next.pause && curr.active?._id === next.active?._id;
  };

  const { pause, volume, active, currentTime } = useTypedSelector(
    (state) => state.player,
    checkEqual,
  );

  const { pauseTrack, playTrack, setCurrentTime, setDuration } = useActions();

  const setAudio = () => {
    if (active && !currentTime) {
      audio.src = 'http://localhost:5000/' + active.audio;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        setDuration(audio.duration);
      };
      audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime);
      };
    }
  };

  const handleRepeat = () => {
    setIsLoop((prev) => !prev);
    audio.loop = isLoop;
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
      {/* ProgressBar */}
      <ProgressBar audio={audio} />

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
        <Button fontSize={20}>
          <ShuffleIcon />
        </Button>
        <Button fontSize={25}>
          <SkipPreviousIcon />
        </Button>
        <PlayButton onClick={pauseClick}>
          {!pause ? <PauseIcon /> : <PlayIcon />}
        </PlayButton>
        <Button fontSize={25}>
          <SkipNextIcon />
        </Button>
        <Button onClick={handleRepeat} fontSize={20} isLoop={isLoop}>
          {isLoop ? <RepeatOnIcon /> : <RepeatOffIcon />}
        </Button>
      </Controls>

      {/* volume */}
      <Volume>
        <VolumeBar audio={audio} />
      </Volume>
    </Container>
  );
};

export default Player;
