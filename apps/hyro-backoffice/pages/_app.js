import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';

import theme from '../src/styles/theme';
import { wrapper } from '../src/store';
import { GlobalStyle } from '../src/styles/global';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/styles/fonts/index.scss';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head title="Hyro Backoffice">
          <title>Hyro Backoffice</title>
          <link rel="icon" href="/logo.svg" />
        </Head>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Component {...pageProps} />
          <ToastContainer />
        </ThemeProvider>
      </>
    );
  }
}

export default wrapper.withRedux(MyApp);
