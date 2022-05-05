import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import GlobalStyle, { SPage, SMainWrapper } from '../styles/global';
import { wrapper } from '../store';
import theme from '../src/theme';
import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion';
import { animations } from '../lib/animations';
import { useState } from 'react';

const WrappedApp: React.FC<AppProps> = (props: any) => {
  const { Component, pageProps, store, router } = props;

  const [animation, setAnimation] = useState(animations[2]);
  const [exitBefore, setExitBefore] = useState(false);

  return (
    <SMainWrapper>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <LazyMotion features={domAnimation}>
          <AnimatePresence exitBeforeEnter={!exitBefore}>
            <SPage
              as={m.div}
              key={router.route.concat(animation.name)}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={animation.variants}
              transition={animation.transition}
            >
              <Component {...pageProps} />
            </SPage>
          </AnimatePresence>
        </LazyMotion>
      </ThemeProvider>
    </SMainWrapper>
  );
};

export default wrapper.withRedux(WrappedApp);
