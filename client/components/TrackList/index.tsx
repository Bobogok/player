import React from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { PlayerState } from '../../types/player';
import TrackItem from '../TrackItem';
import { TrackListProps } from './props/TrackListProps';
import { SChart, STracks, STrack, SContainer } from './style';

const TrackList: React.FC<TrackListProps> = ({ tracks }) => {
  const isEqual = (curr: PlayerState, next: PlayerState) => {
    return curr.pause === next.pause && curr.active?._id === next.active?._id;
  };

  // ререндер, если поменяется трек или поставить на паузу
  useTypedSelector((state) => state.player, isEqual);

  return (
    <SChart>
      <SContainer>
        <STracks>
          {tracks.map((track, index) => (
            <STrack>
              <TrackItem key={track._id} track={track} number={index + 1} />
            </STrack>
          ))}
        </STracks>
      </SContainer>
    </SChart>
  );
};

export default TrackList;
