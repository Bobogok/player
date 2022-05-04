import React from 'react';
import { Box, Grid } from '@mui/material';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { PlayerState } from '../../types/player';
import TrackItem from '../TrackItem';
import { TrackListProps } from './props/TrackListProps';

const TrackList: React.FC<TrackListProps> = ({ tracks }) => {
  const isEqual = (curr: PlayerState, next: PlayerState) => {
    return curr.pause === next.pause && curr.active?._id === next.active?._id;
  };

  // ререндер, если поменяется трек или поставить на паузу
  useTypedSelector((state) => state.player, isEqual);

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
