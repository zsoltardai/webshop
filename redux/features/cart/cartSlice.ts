import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {add, remove, clear, get} from './actions';

import type {Item} from '@webshop/models/Cart';

export type CartState = {
  items?: Item[];
  loading: boolean;
  error?: string;
};

const initialState: CartState = {
  items: undefined,
  loading: false,
  error: undefined,
};

export const cartSlice = createSlice({
  name: 'cart',

  initialState,

  reducers: {

  },

  extraReducers: builder => {

  },
});

export const {} = cartSlice.actions;

export {add, remove, clear, get};

export default cartSlice.reducer;
