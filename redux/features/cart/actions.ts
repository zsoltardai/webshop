import {createAsyncThunk} from '@reduxjs/toolkit';

import type {AddCartItemParams, CartItem, UpdateCartItemParams} from '@webshop/models/Cart';

import cartApi from '@webshop/api-logic/cart';


export const get = createAsyncThunk<CartItem[], string, {rejectValue: string}>(
  'cart/get',
  async (token, {rejectWithValue}) => {
    try {
      return await cartApi.get(token);
    } catch (error: any) {
      const message = error.message as string
      return rejectWithValue(message);
    }
  },
);

export const add = createAsyncThunk<CartItem, AddCartItemParams, {rejectValue: string}>(
  'cart/add',
  async (params: AddCartItemParams, {rejectWithValue}) => {
    try {
      return await cartApi.add(params);
    } catch (error: any) {
      const message = error.message as string
      return rejectWithValue(message);
    }
  },
);

export const clear = createAsyncThunk<boolean, void, {rejectValue: string}>(
  'cart/clear',
  async (_, {rejectWithValue}) => {
    try {
      return await cartApi.clear();
    } catch ({message}: any) {
      return rejectWithValue(message);
    }
  },
);

export const remove = createAsyncThunk<number, number, {rejectValue: string}>(
  'cart/remove',
  async (id: number, {rejectWithValue}) => {
    try {
      return await cartApi.remove(id);
    } catch ({message}: any) {
      return rejectWithValue(message);
    }
  },
);

export const update = createAsyncThunk<CartItem, UpdateCartItemParams, {rejectValue: string}>(
  'cart/update',
  async (params, {rejectWithValue}) => {
    try {
      return await cartApi.update(params);
    } catch ({message}: any) {
      return rejectWithValue(message);
    }
  },
);
