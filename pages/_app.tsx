import type {AppProps} from 'next/app';

import {Layout} from '@webshop/components';

import {Provider} from 'react-redux';
import {persistor, store} from '@webshop/redux/store';
import {PersistGate} from 'redux-persist/integration/react';

import '@webshop/styles/globals.css'


const App: React.FC<AppProps> = (props) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout {...props} />
      </PersistGate>
    </Provider>
  );
};

export default App;
