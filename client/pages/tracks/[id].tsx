import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Headphones from '@mui/icons-material/Headphones';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
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
  top: calc(50px + 250px / 2);
  left: 0;
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
  display: flex;
  flex-direction: column;

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

const rotate = keyframes`
  from {
    transform: translate(0, -20px);
    opacity: 0;
  }

  to {
    transform: translate(0, 0);
    opacity: 1;
  }
`;

export const SPill = styled.div`
  opacity: 1;
  transform: translate(0, 0);
  transition: transform 0.3s cubic-bezier(0.4, 0.2, 0, 1),
    opacity 10ms 10ms linear;
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  animation: ${rotate} 0.2s linear;
`;

export const SButton = styled.button`
  position: relative;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.backgroundLight};
  display: flex;
  align-items: center;
  padding: 10px 25px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
  margin: auto 0;
  max-width: 200px;
  z-index: 2;

  & > svg {
    margin-right: 10px;
  }
`;

const TrackPage = ({ serverTrack }: { serverTrack: ITrack }) => {
  const [track, setTrack] = useState<ITrack>(serverTrack);
  const router = useRouter();
  const username = useInput('');
  const text = useInput('');
  const [onClickClipboard, setOnClickClipboard] = useState<boolean>(false);

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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setOnClickClipboard(true);
    setTimeout(() => {
      setOnClickClipboard(false);
    }, 1000);
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
              <SButton onClick={copyToClipboard}>
                <ReplyOutlinedIcon />
                Поделиться
                {onClickClipboard && <SPill>Скопированно</SPill>}
              </SButton>
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
