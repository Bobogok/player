import React, { memo } from 'react';
import { VolumeBarProps } from './props/VolumeBarProps';

const VolumeBar: React.FC<VolumeBarProps> = memo(({ volume, onChange }) => {
  return (
    <div style={{ display: 'flex' }}>
      <input
        type="range"
        min={0}
        max={100}
        value={volume}
        onChange={onChange}
      />
    </div>
  );
});

export default VolumeBar;
