import { Button, Grid, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import MainLayout from '../../layout/MainLayout';
import { ITrack } from '../../types/track';

const TrackPage = () => {
  const track: ITrack = {
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
  };
  const router = useRouter();

  return (
    <MainLayout>
      <Button
        onClick={() => router.push('/tracks')}
        variant={'outlined'}
        style={{ fontSize: 32 }}
      >
        К списку
      </Button>
      <Grid container style={{ margin: '20px 0' }}>
        <img src={track.picture} width={200} alt="обложка к треку" />
        <div>
          <h1>Название трека - {track.name}</h1>
          <h1>Испольнитель - {track.artist}</h1>
          <h1>Прослушиваний - {track.listens}</h1>
        </div>
      </Grid>
      <h1>Слова к треку</h1>
      <p>{track.text}</p>
      <h1>Комментарии</h1>
      <Grid>
        <TextField label={'Ваше имя'} fullWidth />
        <TextField label={'Комментарий'} fullWidth multiline rows={4} />
        <Button>Отправить</Button>
      </Grid>
      <div>
        {track.comments.map((comments) => (
          <div>
            <div>Автор - {comments.username}</div>
            <div>Комментарий - {comments.text}</div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default TrackPage;
