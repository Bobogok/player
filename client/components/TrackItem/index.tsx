import { Delete, Pause, PlayArrow } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import Track from '../../layout/Track';
import { TrackItemProps } from './props/TrackItemProps';
import { Artist } from './style/Artist';
import { DeleteIconButton } from './style/DeleteIconButton';
import { TrackGrid } from './style/TrackGrid';

const TrackItem: React.FC<TrackItemProps> = ({ track, active = false }) => {
  const router = useRouter();

  return (
    <Track onClick={() => router.push('/tracks/' + track._id)}>
      <IconButton onClick={(e) => e.stopPropagation()}>
        {active ? <Pause /> : <PlayArrow />}
      </IconButton>
      <img width={70} height={70} src={track.picture} alt="обложка трека" />
      <TrackGrid container direction={'column'}>
        <div>{track.name}</div>
        <Artist>{track.artist}</Artist>
      </TrackGrid>
      {active && <div>02:11 / 03:33</div>}
      <DeleteIconButton onClick={(e) => e.stopPropagation()}>
        <Delete />
      </DeleteIconButton>
    </Track>
  );
};

export default TrackItem;
