import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { wrapper } from '../store';
import createEmotionCache from '../src/createEmotionCache';
import { CacheProvider } from '@emotion/react';
import theme from '../src/theme';
import { Provider } from 'react-redux';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const WrappedApp: React.FC<AppProps> = (props: any) => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    store,
  } = props;
  // const storeStore = useStore(pageProps.initialReduxState);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {/* <Provider store={store}> */}
        <Component {...pageProps} />
        {/* </Provider> */}
      </ThemeProvider>
    </CacheProvider>
  );
};

export default wrapper.withRedux(WrappedApp);
