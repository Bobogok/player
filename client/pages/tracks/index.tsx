import { Box, Button, Card, Grid, styled } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import TrackList from '../../components/TrackList';
import MainLayout from '../../layout/MainLayout';
import { ITrack } from '../../types/track';

const CustomizedCard = styled(Card)`
  width: 900px;
`;

const Index = () => {
  const router = useRouter();
  const tracks: ITrack[] = [
    {
      _id: '625562a5a81c1f39f92f9bfa',
      name: '1000-7',
      artist: 'fem.love',
      text: 'text text text text',
      listens: 0,
      comments: [],
      picture:
        'http://localhost:5000/image/4721ca47-d1b1-4c76-8cf4-8fa524481e8c.jpg',
      audio:
        'http://localhost:5000/audio/47bff696-f9cc-4387-bc45-4b8e3130cf88.mp3',
    },
    {
      _id: '62556426a81c1f39f92f9bff',
      name: 'скейтер',
      artist: 'алёна швец',
      text: 'text text',
      listens: 0,
      comments: [],
      picture:
        'http://localhost:5000/image/bf13de77-e77d-4fa1-9921-0af2a56f6c69.jpg',
      audio:
        'http://localhost:5000/audio/8d2c1f91-333d-4b67-9992-3e1f86507c0e.mp3',
    },
    {
      name: 'быть счастливым',
      artist: 'хочуспать',
      text: 'text text',
      listens: 0,
      picture:
        'http://localhost:5000/image/6ca4d43c-b34d-4233-ae21-2385419c691b.jpg',
      audio:
        'http://localhost:5000/audio/47a9d8e7-a36a-4136-a8f5-e707840aa9ea.mp3',
      comments: [],
      _id: '625564e5a81c1f39f92f9c01',
    },
  ];

  return (
    <MainLayout>
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
          <TrackList tracks={tracks} />
        </CustomizedCard>
      </Grid>
    </MainLayout>
  );
};

export default Index;
