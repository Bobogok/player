import React from 'react';
import { TrackProgressProps } from './props/TrackProgressProps';

const TrackProgress: React.FC<TrackProgressProps> = ({
  durationTotal,
  durationCurrent,
  onChange,
}) => {
  return (
    <div style={{ display: 'flex' }}>
      <input
        type="range"
        min={0}
        max={durationTotal}
        value={durationCurrent}
        onChange={onChange}
      />
      <div>
        {durationCurrent} / {durationTotal}
      </div>
    </div>
  );
};

export default TrackProgress;
