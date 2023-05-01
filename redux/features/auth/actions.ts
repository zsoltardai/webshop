import {createAsyncThunk} from '@reduxjs/toolkit';

import authApi from '@webshop/api-logic/auth';

import type {LoginParams, RegisterParams} from '@webshop/models/Auth';


export const login = createAsyncThunk(
  'auth/login',
  async (params: LoginParams, thunkAPI) => {
    try {
      return await authApi.login(params);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async (params: RegisterParams, thunkAPI) => {
    try {
      return await authApi.register(params);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
