import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { PersistGate } from 'redux-persist/integration/react';

import { GlobalStyle } from '../src/styles/global';
import theme from '../src/styles/theme';
import { getPersistor, wrapper } from '../src/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/styles/fonts/index.scss';
import { imagesLinks } from '../src/utils';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head title="Hyro - Dressing">
          <title>Hyro - Dressing</title>
          <meta name={'og:image'} content={imagesLinks.background.home} />
          <link rel="icon" href="/logo.svg" />
        </Head>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <PersistGate loading={null} persistor={getPersistor()}>
            <Component {...pageProps} />
          </PersistGate>
        </ThemeProvider>
      </>
    );
  }
}

export default wrapper.withRedux(MyApp);
