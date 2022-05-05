import React, { useState } from 'react';
import { useActions } from '../../hooks/useAction';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { convertToSeconds, trottlingEvents } from '../../src/helpers';
import { PlayerState } from '../../types/player';
import { ProgressBarProps } from './props/ProgressBarProps';
import { SPlaybar, SProgressBar, SProgressText, STooltip } from './style';

const ProgressBar: React.FC<ProgressBarProps> = ({
  audio,
  nextTrack,
  isLoop,
}) => {
  const isEqual = (curr: PlayerState, next: PlayerState) => {
    return (
      curr.pause === next.pause &&
      curr.currentTime === next.currentTime &&
      curr.active?._id === next.active?._id
    );
  };

  const { active, duration, currentTime } = useTypedSelector(
    (state) => state.player,
    isEqual,
  );

  const { setCurrentTime } = useActions();

  const [tooltip, setToolTip] = useState<{ position: number; time: string }>({
    position: 0,
    time: '00:00',
  });

  // автоматическое переключение на следующий трек
  if (duration !== 0 && !isLoop && duration === currentTime) {
    nextTrack();
  }

  const changeCurrentTime = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const target = e.target as HTMLTextAreaElement;
    let time = duration * (e.clientX / target.clientWidth);
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const changeTooltip = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLTextAreaElement;
    trottlingEvents(
      () =>
        setToolTip({
          position: e.clientX,
          time: convertToSeconds(duration * (e.clientX / target.clientWidth)),
        }),
      15,
      e.type,
    );
  };

  return (
    <>
      <SProgressBar
        style={{
          transform: `scaleX(${audio.currentTime / duration})`,
        }}
      />
      <SPlaybar onClick={changeCurrentTime} onMouseMove={changeTooltip}>
        <STooltip
          style={{
            left: `${tooltip.position! - 30}px`,
          }}
        >
          {tooltip.time}
        </STooltip>
        <SProgressText>{convertToSeconds(currentTime)}</SProgressText>
        <SProgressText>{convertToSeconds(duration)}</SProgressText>
      </SPlaybar>
    </>
  );
};

export default ProgressBar;
