import React from 'react';
import ChartHeaderProps from './props/ChartHeaderProps';
import PlayIcon from '@mui/icons-material/PlayCircleFilledOutlined';
import PauseIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import {
  SContainer,
  SPlayButton,
  SWrapper,
  SH1,
  SH2,
  SContainerTops,
  STops,
  SAlbum,
  SAlbumCover,
} from './style';

const ChartHeader: React.FC<ChartHeaderProps> = ({ tracks }) => {
  return (
    <SContainer>
      <SContainerTops>
        <SPlayButton>{<PlayIcon />}</SPlayButton>
        <SWrapper>
          <SH1>Топ 100</SH1>
          <SH2>Самая популярная музыка этой недели</SH2>
        </SWrapper>
        <STops>
          {tracks.map((track) => (
            <SAlbum>
              <SAlbumCover bg={'http://localhost:5000/' + track.picture} />
            </SAlbum>
          ))}
        </STops>
      </SContainerTops>
    </SContainer>
  );
};

export default ChartHeader;
