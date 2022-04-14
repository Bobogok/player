import { Delete, Pause, PlayArrow } from '@mui/icons-material';
import { Grid, IconButton, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import Track from '../../layout/Track';
import { TrackItemProps } from './props/TrackItemProps';

const TrackItem: React.FC<TrackItemProps> = ({ track, active = false }) => {
  const router = useRouter();

  return (
    <Track onClick={() => router.push('/tracks/' + track._id)}>
      <IconButton onClick={(e) => e.stopPropagation()}>
        {active ? <Pause /> : <PlayArrow />}
      </IconButton>
      <img width={70} height={70} src={track.picture} alt="обложка трека" />
      <Grid
        container
        direction={'column'}
        sx={{ width: 200, margin: '0 20px' }}
      >
        <Typography variant={'h6'}>{track.name}</Typography>
        <Typography
          variant={'body1'}
          sx={{
            fontSize: 12,
            color: 'gray',
          }}
        >
          {track.artist}
        </Typography>
      </Grid>
      {active && <div>02:11 / 03:33</div>}
      <IconButton
        onClick={(e) => e.stopPropagation()}
        sx={{
          marginLeft: 'auto',
        }}
      >
        <Delete />
      </IconButton>
    </Track>
  );
};

export default TrackItem;
