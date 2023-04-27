import '../styles/global.css';

import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { Toaster } from 'react-hot-toast';

import UserDataProvider from '@/context/UserDataProvider';
import client from '@/graphql';

import SideBarProvider from '../context/SideBarProvider';

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => (
  <ApolloProvider client={client}>
    <SessionProvider session={session}>
      <Toaster />
      <UserDataProvider>
        <SideBarProvider>
          <Component {...pageProps} />
        </SideBarProvider>
      </UserDataProvider>
    </SessionProvider>
  </ApolloProvider>
);

export default MyApp;
