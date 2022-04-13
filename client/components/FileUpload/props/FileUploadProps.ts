import { ReactNode } from 'react';

export interface FileUploadProps {
  setFile: Function;
  accept: string;
  children?: ReactNode;
}
