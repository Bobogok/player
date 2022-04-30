import styled from 'styled-components';

export const STrack = styled.div<{ current: boolean }>`
  margin: 20px;
  padding: 10px;
  display: flex;
  align-items: center;
  border-radius: 3px;
  border: ${({ current, theme }) => current && `2px solid ${theme.main}`};
`;
