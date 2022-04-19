import styled from '@emotion/styled';
import { Card } from '@mui/material';

type InputProps = {
  current: string;
};

export const StyledTrack = styled(Card)<InputProps>`
  margin: 20px;
  padding: 10px;
  display: flex;
  align-items: center;
  border: ${(props) => props.current};
`;
