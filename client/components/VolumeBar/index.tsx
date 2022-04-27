import React, { memo } from 'react';
import { VolumeBarProps } from './props/VolumeBarProps';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import VolumeDownOutlinedIcon from '@mui/icons-material/VolumeDownOutlined';
import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined';

const VolumeBar: React.FC<VolumeBarProps> = memo(({ volume, onChange }) => {
  return (
    <>
      {(() => {
        if (volume >= 50) {
          return <VolumeUpOutlinedIcon />;
        } else if (volume <= 49 && volume >= 1) {
          return <VolumeDownOutlinedIcon />;
        } else {
          return <VolumeOffOutlinedIcon />;
        }
      })()}
      <div style={{ display: 'flex' }}>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={onChange}
        />
      </div>
    </>
  );
});

export default VolumeBar;
