import React from 'react';
import { StyledTrack } from './styles';

const Track = ({ children, ...props }: any) => {
  return <StyledTrack {...props}>{children}</StyledTrack>;
};

export default Track;
