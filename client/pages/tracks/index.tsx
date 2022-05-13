import React from 'react';
import { Box, Button, Card, Grid, styled } from '@mui/material';
import TrackList from '../../components/TrackList';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import MainLayout from '../../layout/MainLayout';
import { NextThunkDispatch, wrapper } from '../../store';
import { fetchTracks } from '../../store/actions-creators/track';

const CustomizedCard = styled(Card)`
  width: 900px;
`;

const Index = () => {
  const { tracks, error } = useTypedSelector((state) => state.track);

  if (error) {
    return (
      <MainLayout>
        <h1>{error}</h1>
      </MainLayout>
    );
  }

  // TODO переделать индикатор загрузки
  // if (isLoading) return <p>Loading...</p>;

  return (
    <MainLayout title={'Список треков - Музыкальная платформа'}>
      <Grid container justifyContent={'center'}>
        <CustomizedCard>
          <Box p={3}>
            <Grid container justifyContent={'space-between'}>
              <h1>Список треков</h1>
            </Grid>
          </Box>
          <TrackList tracks={tracks} />
        </CustomizedCard>
      </Grid>
    </MainLayout>
  );
};

export default Index;

export const getServerSideProps = wrapper.getServerSideProps((store) =>
  // @ts-ignore
  async ({ req, res, ...etc }) => {
    const state = store.getState();
    // console.log('getServerSideProps', state);

    if (state.track.tracks.length === 0) {
      // await store.dispatch(getWalletDetails(context.params.address));
      const dispatch = store.dispatch as NextThunkDispatch;
      await dispatch(await fetchTracks());
    }
  },
);
