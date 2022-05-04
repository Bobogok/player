import React from 'react';
import { VolumeBarProps } from './props/VolumeBarProps';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import VolumeDownOutlinedIcon from '@mui/icons-material/VolumeDownOutlined';
import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined';
import { Volume } from './style';
import { PlayerState } from '../../types/player';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useAction';

const VolumeBar: React.FC<VolumeBarProps> = ({ audio }) => {
  const { setVolume } = useActions();

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    let volume = +e.target.value;
    audio.volume = volume / 100;
    setVolume(volume);
  };

  const checkEqual = (curr: PlayerState, next: PlayerState) => {
    return curr.volume === next.volume;
  };

  const { volume } = useTypedSelector((state) => state.player, checkEqual);

  return (
    <Volume>
      {(() => {
        if (volume >= 50) {
          return <VolumeUpOutlinedIcon />;
        } else if (volume <= 49 && volume >= 1) {
          return <VolumeDownOutlinedIcon />;
        } else {
          return <VolumeOffOutlinedIcon />;
        }
      })()}
      <input
        type="range"
        min={0}
        max={100}
        value={volume}
        onChange={changeVolume}
      />
    </Volume>
  );
};

export default VolumeBar;
