import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {add, remove, clear, update, restore} from './actions';

import type {CartItem} from '@webshop/models/Cart';

import {logout} from '@webshop/redux/features/auth';


export type CartState = {
  items: CartItem[];
  loading: boolean;
  error?: string;
};

const initialState: CartState = {
  items: [],
  loading: false,
  error: undefined,
};

export const cartSlice = createSlice({
  name: 'cart',

  initialState,

  reducers: {
    get: (state: CartState, {payload}: PayloadAction<{id: number}>) => {
      const {id} = payload;
    },
  },

  extraReducers: builder => {

    /* adding cart item  */

    builder.addCase(add.pending, (state: CartState) => {state.loading = true});

    builder.addCase(add.fulfilled, (state: CartState, {payload}: PayloadAction<CartItem>) => {
      state.items.push(payload);
      state.loading = false;
    });

    builder.addCase(add.rejected, (state: CartState, {payload}: PayloadAction<any>) => {
      state.error = payload;
      state.loading = false;
    });

    /* updating cart item  */

    builder.addCase(update.pending, (state: CartState) => {state.loading = true});

    builder.addCase(update.fulfilled, (state: CartState, {payload}: PayloadAction<CartItem>) => {
      let items: CartItem[] = [...state.items];

      items = items.filter(item => item.id !== payload.id);

      items.push(payload);

      state.items = items;

      state.loading = false;
    });

    builder.addCase(update.rejected, (state: CartState, {payload}: PayloadAction<any>) => {
      state.error = payload;
      state.loading = false;
    });

    /* clearing cart  */

    builder.addCase(clear.pending, (state: CartState) => {state.loading = true});

    builder.addCase(clear.fulfilled, (state: CartState) => {
      state.items = [];
      state.loading = false;
    });

    builder.addCase(clear.rejected, (state: CartState, {payload}: PayloadAction<any>) => {
      state.error = payload;
      state.loading = false;
    });

    /* removing cart item  */

    builder.addCase(remove.pending, (state: CartState) => {state.loading = true});

    builder.addCase(remove.fulfilled, (state: CartState, {payload}: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== payload);
      state.loading = false;
    });

    builder.addCase(remove.rejected, (state: CartState, {payload}: PayloadAction<any>) => {
      state.error = payload;
      state.loading = false;
    });

    /* reset cart items on logout */

    builder.addCase(logout, (state) => {
      state.items = [];
    });

    /* restoring cart items */

    builder.addCase(restore.pending, (state) => {state.loading = true});

    builder.addCase(restore.fulfilled, (state: CartState, {payload}: PayloadAction<CartItem[]>) => {
      state.items = payload;
      state.loading = false;
    });

    builder.addCase(restore.rejected, (state: CartState, {payload}: PayloadAction<any>) => {
      state.error = payload;
      state.loading = false;
    });
  },
});

export const {get} = cartSlice.actions;

export {add, remove, clear, restore, update};

export default cartSlice.reducer;
