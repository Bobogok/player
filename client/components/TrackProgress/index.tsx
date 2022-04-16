import React from 'react';
import { TrackProgressProps } from './props/TrackProgressProps';

const TrackProgress: React.FC<TrackProgressProps> = ({
  right,
  left,
  onChange,
}) => {
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
    <div style={{ display: 'flex' }}>
      <input
        style={{ width: '50vw' }}
        type="range"
        min={0}
        max={right}
        value={left}
        onChange={onChange}
      />
      <div>
        {secondsToTime(left)} / {secondsToTime(right)}
      </div>
    </div>
  );
};

export default TrackProgress;
