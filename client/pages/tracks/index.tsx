import { Box, Button, Card, Grid, styled, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import TrackList from '../../components/TrackList';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import MainLayout from '../../layout/MainLayout';
import { NextThunkDispatch, wrapper } from '../../store';
import { fetchTracks, searchTracks } from '../../store/actions-creators/track';
import { ITrack } from '../../types/track';
import { useDispatch } from 'react-redux';

const CustomizedCard = styled(Card)`
  width: 900px;
`;

const Index = () => {
  const router = useRouter();
  const dispatch = useDispatch() as NextThunkDispatch;
  const { tracks, error } = useTypedSelector((state) => state.track);
  // const [isLoading, setLoading] = useState<boolean>(!!!tracks.length);
  const [query, setQuery] = useState<string>('');
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(async () => {
        await dispatch(await searchTracks(e.target.value));
      }, 500),
    );
  };

  useEffect(() => {
    localStorage.setItem('activeTrack', JSON.stringify(tracks[0]));
  }, []);

  // useEffect(() => {
  //   console.log('tracks стработал');

  //   // if (!tracks.length) {
  //   (async () => {
  //     await dispatch(await fetchTracks());
  //     setLoading(false);
  //   })();
  //   // }
  // }, []);

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
              <Button
                onClick={() => router.push('/tracks/create')}
                variant="contained"
              >
                Загрузить
              </Button>
            </Grid>
          </Box>
          <TextField fullWidth value={query} onChange={search} />
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
    const dispatch = store.dispatch as NextThunkDispatch;
    await dispatch(await fetchTracks());
    // dispatch(fetchTracks())
  },
);
