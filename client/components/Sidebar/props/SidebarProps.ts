import { Dispatch, SetStateAction } from 'react';

export interface TrackListProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
