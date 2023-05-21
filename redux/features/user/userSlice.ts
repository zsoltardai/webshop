import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {get, update} from './actions';
import {logout} from '../auth';

import type {User} from '@webshop/models';


export type UserState = {
  user?: User;
  loading: boolean;
  error?: string;
};

const initialState: UserState = {
  user: undefined,
  loading: false,
  error: undefined,
};

export const userSlice = createSlice({
  name: 'user',

  initialState,

  reducers: {},

  extraReducers: builder => {

    builder.addCase(get.pending, (state: UserState) => {state.loading = true});

    builder.addCase(get.fulfilled, (state: UserState, {payload}: PayloadAction<User>): void => {
      state.user = payload;
      state.loading = false;
    });

    builder.addCase(get.rejected, (state: UserState, {payload}: PayloadAction<any>): void => {
      state.error = payload;
      state.loading = false;
    });

    builder.addCase(update.pending, (state: UserState) => {state.loading = true});

    builder.addCase(update.fulfilled, (state: UserState, {payload}: PayloadAction<User>): void => {
      state.user = payload;
      state.loading = false;
    });

    builder.addCase(update.rejected, (state: UserState, {payload}: PayloadAction<any>): void => {
      state.error = payload;
      state.loading = false;
    });

    builder.addCase(logout, (state: UserState) => {
      state.user = undefined;
    })
  },
});

export const {} = userSlice.actions;

export {get, update};

export default userSlice.reducer;
