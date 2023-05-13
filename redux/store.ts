import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistCombineReducers} from 'redux-persist';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import storage from 'redux-persist/lib/storage';

import auth from './features/auth';
import cart from './features/cart';


const persistConfig = {
  key: 'root',
  debug: true,
  storage,
};

const rootReducer = persistCombineReducers(persistConfig, {
  auth,
  cart,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store, {});

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
