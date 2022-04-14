import type { AppProps } from 'next/app';
import CssBaseline from '@mui/material/CssBaseline';
import { wrapper } from '../store';

const WrappedApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <CssBaseline />
      <Component {...pageProps} />
    </>
  );
};

export default wrapper.withRedux(WrappedApp);
