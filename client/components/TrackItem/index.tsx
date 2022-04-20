import { Delete, Pause, PlayArrow } from '@mui/icons-material';
import { Grid, IconButton, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { memo } from 'react';
import { useActions } from '../../hooks/useAction';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Track from '../../layout/Track';
import { TrackItemProps } from './props/TrackItemProps';

const TrackItem: React.FC<TrackItemProps> = memo(({ track, isPlay }) => {
  const router = useRouter();
  const { playTrack, pauseTrack, setActiveTrack } = useActions();
  const { pause, volume, active, duration, currentTime } = useTypedSelector(
    (state) => state.player,
  );

  const play = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (track._id === active?._id && !pause) {
      pauseTrack();
    } else {
      playTrack();
    }

    if (track._id !== active?._id) {
      setActiveTrack(track);
      playTrack();
    }
  };

  return (
    <Track
      onClick={() => router.push('/tracks/' + track._id)}
      current={track._id === active?._id && '2px solid #ff4d6c'}
    >
      {track._id !== active?._id && (
        <IconButton onClick={play}>
          <PlayArrow />
        </IconButton>
      )}
      <img
        width={70}
        height={70}
        src={'http://localhost:5000/' + track.picture}
        alt="обложка трека"
      />
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
      {/* {active && <div>02:11 / 03:33</div>} */}
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
});

export default TrackItem;
