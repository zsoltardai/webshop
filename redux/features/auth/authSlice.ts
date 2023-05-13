import Router from 'next/router';

import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {login, register} from './actions';

import {REHYDRATE} from 'redux-persist';

import type {RootState} from '@webshop/redux/store';
import client from '@webshop/api-logic/client';

import {deleteCookie} from 'cookies-next';

export type AuthState = {
  token?: string;
  loading: boolean;
  error?: string;
};

const initialState: AuthState = {
  token: undefined,
  loading: false,
  error: undefined,
};

export const authSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {
    logout: (state: AuthState) => {
      state.token = undefined;
      deleteCookie('auth-token');
      state.loading = false;
      Router.replace('/products');
    },
  },

  extraReducers: builder => {

    // @ts-ignore
    builder.addCase(REHYDRATE, (_, {payload}: PayloadAction<RootState>) => {
        if (!payload) return;
        
        const {auth} = payload;

        if (!auth) return;

        const {token} = auth;

        client.setHeader('Authorization', `Bearer ${token}`);
      },
    );

    builder.addCase(login.pending, (state) => {state.loading = true});

    builder.addCase(login.fulfilled, (state: AuthState, {payload}: PayloadAction<string>): void => {
      state.token = payload;
      state.loading = false;
      state.error = undefined;
    });

    builder.addCase(login.rejected, (state: AuthState, {payload}: PayloadAction<any>): void => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(register.pending, (state) => {state.loading = true});

    builder.addCase(register.fulfilled, (state: AuthState): void => {
      state.loading = false;
    });

    builder.addCase(register.rejected, (state: AuthState): void => {
      state.loading = false;
    });
  },
});

export const {logout} = authSlice.actions;

export {login, register};

export default authSlice.reducer;
