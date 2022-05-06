import React from 'react';
import styled from 'styled-components';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { PlayerState } from '../../types/player';
import TrackItem from '../TrackItem';
import { TrackListProps } from './props/TrackListProps';
import { SChart, STracks, STrack, SContainer } from './style';

export const SSidebar = styled.div`
  position: relative;
  flex: 1 1 100%;
  max-width: 40%;
  padding-left: 30px;
`;

export const STeaserWrapper = styled.div`
  position: sticky;
  top: 90px;
  width: 100%;
  // padding-bottom: 15px;
`;

export const STeaser = styled.a`
  // padding: 15px 0;
  display: flex;
  justify-content: center;
  // width: 300px;
  height: 100px;
  background-color: ${({ theme }) => theme.main};
  margin-bottom: 20px;
  align-items: center;
  border-radius: 5px;
`;

export const SText = styled.b`
  font-weight: 700;
  font-size: 30px;
`;

const teasers = [
  {
    text: 'Было популярно',
  },
  {
    text: 'Слушают прямо сейчас',
  },
  {
    text: 'Бесконечный поток',
  },
];

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
      <SSidebar>
        <STeaserWrapper>
          {teasers.map((teaser) => (
            <STeaser>
              <SText>{teaser.text}</SText>
            </STeaser>
          ))}
        </STeaserWrapper>
      </SSidebar>
    </SChart>
  );
};

export default TrackList;
