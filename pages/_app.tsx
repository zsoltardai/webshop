import type {AppProps} from 'next/app';
import Head from 'next/head';

import {Layout} from '@webshop/components';

import {Provider} from 'react-redux';
import {persistor, store} from '@webshop/redux/store';
import {PersistGate} from 'redux-persist/integration/react';

import {Analytics} from '@vercel/analytics/react';

import '@webshop/styles/globals.css'


const App: React.FC<AppProps> = (props) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Head>
          <title>Webshop</title>
          <meta name='description' content="A Webshop webalkalmazás egy példa alkalmazés a webfejlesztésben szerzett tapaszalataim összegzésére." />
          <meta name="theme-color" content="white" />
          <link rel="shortcut icon" href="/cart.ico" />
        </Head>
        <Layout {...props} />
        <Analytics />
      </PersistGate>
    </Provider>
  );
};

export default App;
