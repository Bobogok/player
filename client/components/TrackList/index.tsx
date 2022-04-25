import { Box, Grid } from '@mui/material';
import React, { useMemo } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import TrackItem from '../TrackItem';
import { TrackListProps } from './props/TrackListProps';

const TrackList: React.FC<TrackListProps> = ({ tracks }) => {
  return (
    <Grid container direction={'column'}>
      <Box p={2}>
        {tracks.map((track) => (
          <TrackItem key={track._id} track={track} />
        ))}
      </Box>
    </Grid>
  );
};

export default TrackList;
