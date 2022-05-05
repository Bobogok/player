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
import React, { useEffect, useState } from 'react';
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
import { useStore } from 'react-redux';
import { RootState } from '../../store/reducers';
import { ITrack } from '../../types/track';

let audio: HTMLAudioElement;

const checkEqual = (curr: PlayerState, next: PlayerState) => {
  return curr.pause === next.pause && curr.active?._id === next.active?._id;
};

const Player = () => {
  const store = useStore();
  const state: RootState = store.getState();
  const [isLoop, setIsLoop] = useState(false);

  const { pauseTrack, playTrack, setCurrentTime, setDuration, setActiveTrack } =
    useActions();

  const { pause, volume, active, currentTime } = useTypedSelector(
    (state) => state.player,
    checkEqual,
  );

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

  const nextTrack = () => {
    const tracks = state.track.tracks;
    const curr = tracks.find((elem) => elem._id === active!._id);
    const currentIndex = tracks.indexOf(curr as ITrack);
    const nextIndex = (currentIndex + 1) % tracks.length;
    setActiveTrack(tracks[nextIndex]);
  };

  const prevTrack = () => {
    const tracks = state.track.tracks;
    const curr = tracks.find((elem) => elem._id === active!._id);
    const currentIndex = tracks.indexOf(curr as ITrack);
    const prevIndex =
      currentIndex - 1 !== -1 ? currentIndex - 1 : tracks.length - 1;
    setActiveTrack(tracks[prevIndex]);
  };

  const handleRepeat = () => {
    setIsLoop((prev) => !prev);
    if (audio.loop === true) {
      audio.loop = false;
    } else {
      audio.loop = true;
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
      <ProgressBar audio={audio} nextTrack={nextTrack} isLoop={isLoop} />

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
        <Button onClick={prevTrack} fontSize={25}>
          <SkipPreviousIcon />
        </Button>
        <PlayButton onClick={pauseClick}>
          {!pause ? <PauseIcon /> : <PlayIcon />}
        </PlayButton>
        <Button onClick={nextTrack} fontSize={25}>
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
