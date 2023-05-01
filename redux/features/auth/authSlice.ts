import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {login, register} from './actions';


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
    logout: (state: AuthState): void => {
      state.loading = true;
      state.token = undefined;
      state.loading = false;
    },
  },

  extraReducers: builder => {

    builder.addCase(
      login.pending,
      (state: AuthState): void => {
        state.loading = true;
      },
    );

    builder.addCase(
      login.fulfilled,
      (state: AuthState, {payload}: PayloadAction<string>): void => {
        state.token = payload;
        state.loading = false;
        state.error = undefined;
      },
    );

    builder.addCase(
      login.rejected,
      (state: AuthState, {payload}: PayloadAction<any>): void => {
        state.loading = false;
        state.error = payload;
      },
    );

    builder.addCase(
      register.pending,
      (state: AuthState): void => {
        state.loading = true;
      }
    );

    builder.addCase(
      register.fulfilled,
      (state: AuthState): void => {
        state.loading = false;
      },
    );

    builder.addCase(
      register.rejected,
      (state: AuthState): void => {
        state.loading = false;
      },
    );
  },
});

export const {logout} = authSlice.actions;

export {login, register};

export default authSlice.reducer;
