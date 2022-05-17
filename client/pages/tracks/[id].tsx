import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Headphones from '@mui/icons-material/Headphones';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import { useInput } from '../../hooks/useInput';
import MainLayout from '../../layout/MainLayout';
import { ITrack } from '../../types/track';
import { Avatar } from '@mui/material';
import {
  SArticleWrapper,
  SArticle,
  SContent,
  SCover,
  SText,
  SListens,
  SButton,
  SPill,
  SLyrickWrapper,
  SLyrickH2,
  SLirick,
  SCommentsWrapper,
  SCountComments,
  SMyComment,
  STextFieldWrapper,
  STextField,
  SNoComments,
  SCommentItem,
  SCommentContent,
  SCommentAuthor,
  SCommentBody,
} from '../../styles/track';

const TrackPage = ({ serverTrack }: { serverTrack: ITrack }) => {
  const [track, setTrack] = useState<ITrack>(serverTrack);
  const router = useRouter();
  const username = useInput('NONAME'); // Моковый юзернейм
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      addComment();
      text.resetValue();
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
      {/* Header */}
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

      {/* Lirics */}
      <SLyrickWrapper>
        <SLyrickH2>Слова</SLyrickH2>
        <SLirick>{track.text}</SLirick>
      </SLyrickWrapper>

      {/* Comments */}
      <SCommentsWrapper>
        <SCountComments>
          {track.comments.length}
          <span>комментариев</span>
        </SCountComments>
        <SMyComment>
          <Avatar />
          <STextFieldWrapper>
            <STextField
              {...text}
              type="text"
              placeholder="Напишите комментарий"
              onKeyPress={handleKeyDown}
            />
          </STextFieldWrapper>
        </SMyComment>
        {track.comments.length === 0 ? (
          <SCommentsWrapper>
            <SNoComments>
              Здесь пока нет комментариев. Оставьте его первым!
            </SNoComments>
          </SCommentsWrapper>
        ) : (
          track.comments.map((comment) => (
            <SCommentItem key={comment._id}>
              <Avatar />
              <SCommentContent>
                <SCommentAuthor>{comment.username}</SCommentAuthor>
                <SCommentBody>{comment.text}</SCommentBody>
              </SCommentContent>
            </SCommentItem>
          ))
        )}
      </SCommentsWrapper>
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
