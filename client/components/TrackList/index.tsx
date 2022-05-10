import React from 'react';
import Image from 'next/image';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { PlayerState } from '../../types/player';
import TrackItem from '../TrackItem';
import { TrackListProps } from './props/TrackListProps';
import {
  SChart,
  STracks,
  STrack,
  SContainer,
  SSidebar,
  STeaser,
  STeaserWrapper,
} from './style';

import popBanner from '../../public/images/banners/popHits.webp';
import springStory from '../../public/images/banners/springStory.webp';
import superHits from '../../public/images/banners/superHits.webp';

const teasers = [
  {
    src: popBanner,
  },
  {
    src: springStory,
  },
  {
    src: superHits,
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
              <Image
                src={teaser.src}
                alt="Picture of the author"
                width={300} // automatically provided
                height={100} // automatically provided
                // layout="responsive"
                // objectFit="contain"
                // blurDataURL="data:..." automatically provided
                placeholder="blur" // Optional blur-up while loading
              />
            </STeaser>
          ))}
        </STeaserWrapper>
      </SSidebar>
    </SChart>
  );
};

export default TrackList;
