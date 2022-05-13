import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import Headphones from '@mui/icons-material/Headphones';
import { useInput } from '../../hooks/useInput';
import MainLayout from '../../layout/MainLayout';
import { ITrack } from '../../types/track';

export const SArticleWrapper = styled.div`
  background-color: ${({ theme }) => theme.main};
  min-height: 300px;
`;

export const SArticle = styled.article`
  position: relative;
  min-height: 300px;
  width: 95%;
  max-width: 1340px;
  margin: 0 auto;
`;

export const SContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding-top: calc(50px + 250px / 2);
  display: flex;
`;

export const SCover = styled.div`
  width: 250px;
  height: 250px;
  border-radius: 8px;
  overflow: hidden;
  flex: 1 0 auto;
`;

export const SListens = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
  color: ${({ theme }) => theme.white};

  & > svg {
    margin-right: 10px;
    color: ${({ theme }) => theme.white};
  }
`;

export const SText = styled.div`
  flex: 1 1 100%;
  margin-left: 30px;

  & > h1 {
    color: ${({ theme }) => theme.white};
    letter-spacing: 0.5px;
    font-size: 30px;
    font-weight: 700;
    line-height: 40px;
  }

  & > h2 {
    color: ${({ theme }) => theme.white};
    font-size: 18px;
    line-height: 23px;
    margin-top: 10px;
  }
`;

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
      <SArticleWrapper>
        <SArticle>
          <SContent>
            <SCover>
              <img
                src={'http://localhost:5000/' + track.picture}
                alt="Picture of the author"
                width={250}
                height={250}
              />
            </SCover>
            <SText>
              <h1>{track.artist}</h1>
              <h2>{track.name}</h2>
              <SListens>
                <Headphones />
                {serverTrack.listens}
              </SListens>
            </SText>
          </SContent>
        </SArticle>
      </SArticleWrapper>

      {/* <div>
        {track.comments.map((comments: any) => (
          <div>
            <div>Автор - {comments.username}</div>
            <div>Комментарий - {comments.text}</div>
          </div>
        ))}
      </div> */}
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
