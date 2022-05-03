import { Box, Grid } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { shallowEqual, useStore } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import TrackItem from '../TrackItem';
import { TrackListProps } from './props/TrackListProps';

const TrackList: React.FC<TrackListProps> = ({ tracks }) => {
  useTypedSelector(
    (state) => state.player,
    (curr, next) => {
      return curr.pause === next.pause && curr.active?._id === next.active?._id;
    },
  );

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
