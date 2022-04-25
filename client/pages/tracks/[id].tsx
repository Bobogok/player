import { Button, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useInput } from '../../hooks/useInput';
import MainLayout from '../../layout/MainLayout';
import { ITrack } from '../../types/track';

const TrackPage = ({ serverTrack }: { serverTrack: ITrack }) => {
  const [track, setTrack] = useState<ITrack>(serverTrack);
  const router = useRouter();
  const username = useInput('');
  const text = useInput('');

  const addComment = async () => {
    try {
      const res = await axios.post('http://localhost:5000/tracks/comment', {
        username: username.value,
        text: text.value,
        trackId: track._id,
      });
      setTrack({ ...track, comments: [...track.comments, res.data] });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <MainLayout
      title={'Музыкальная платформа - ' + track.name + ' - ' + track.artist}
      keywords={'хит, слушать, ' + track.name + ' ' + track.artist}
    >
      <Button
        onClick={() => router.push('/tracks')}
        variant={'outlined'}
        style={{ fontSize: 32 }}
      >
        К списку
      </Button>
      <Grid container style={{ margin: '20px 0' }}>
        <img
          src={'http://localhost:5000/' + track.picture}
          width={200}
          alt="обложка к треку"
        />
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
        <TextField {...username} label={'Ваше имя'} fullWidth />
        <TextField
          {...text}
          label={'Комментарий'}
          fullWidth
          multiline
          rows={4}
        />
        <Button onClick={addComment}>Отправить</Button>
      </Grid>
      <div>
        {track.comments.map((comments: any) => (
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await axios.get(
    'http://localhost:5000/tracks/' + context.params!.id!,
  );
  return {
    props: {
      serverTrack: res.data,
    },
  };
};
