import '../styles/global.css';

import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

import SideBarProvider from '../context/SideBarProvider';

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => (
  <SessionProvider session={session}>
    <SideBarProvider>
      <Component {...pageProps} />
    </SideBarProvider>
  </SessionProvider>
);

export default MyApp;
