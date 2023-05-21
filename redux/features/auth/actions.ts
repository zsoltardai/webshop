import {createAsyncThunk} from '@reduxjs/toolkit';

import authApi from '@webshop/api-logic/auth';

import type {LoginParams, RegisterParams} from '@webshop/models/Auth';

import {get as getCart} from '@webshop/redux/features/cart';
import {get as getUser} from '@webshop/redux/features/user';


export const login = createAsyncThunk<string, LoginParams, {rejectValue: string}>(
  'auth/login',
  async (params, {rejectWithValue, dispatch}) => {
    try {
      const token = await authApi.login(params);
      dispatch(getUser(token));
      dispatch(getCart(token));
      return token;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const register = createAsyncThunk<boolean, RegisterParams, {rejectValue: string}>(
  'auth/register',
  async (params, {rejectWithValue}) => {
    try {
      return await authApi.register(params);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
