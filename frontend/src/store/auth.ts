import { createAction, createReducer } from '@reduxjs/toolkit'

export interface User {
  username: string;
  isAdmin: boolean;
  // ... not of interest
}

export type AuthResponse = User & {
  token: string;
}

export interface AuthState {
  user?: User;
  token?: string;
}

const initAuthState: AuthState = {
  user: undefined,
  token: undefined,
}

export const fromRequest = createAction<AuthResponse | null, 'auth/fromRequest'>('auth/fromRequest');
export const newToken = createAction<string | null, 'auth/newToken'>('auth/newToken');
export const newUserDetails = createAction<User | null, 'auth/newUserDetails'>('auth/newUserDetails');

export default createReducer(initAuthState, (builder) => (
  builder
    .addCase(fromRequest, (state, action) => {
      if (!action.payload) {
        state.user = undefined;
        state.token = undefined;
      } else {
        const { username, isAdmin, token } = action.payload;
        state.user = { username, isAdmin };
        state.token = token;
      }
    })
    .addCase(newToken, (state, action) => {
      state.token = action.payload ?? undefined;
    })
    .addCase(newUserDetails, (state, action) => {
      state.user = action.payload ?? undefined;
    })
));
