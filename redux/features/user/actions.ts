import {createAsyncThunk} from '@reduxjs/toolkit';

import userApi from '@webshop/api-logic/user';

import type User from '@webshop/models/User';


export const get = createAsyncThunk<User, string | undefined, {rejectValue: string}>(
  'user/get',
  async (token, {rejectWithValue}) => {
    try {
      return await userApi.get(token);
    } catch (error: any) {
      const message = error.message as string
      return rejectWithValue(message);
    }
  },
);


export const update = createAsyncThunk<User, Partial<User>, {rejectValue: string}>(
  'user/update',
  async (user, {rejectWithValue}) => {
    try {
      return await userApi.update(user);
    } catch (error: any) {
      const message = error.message as string
      return rejectWithValue(message);
    }
  },
);
