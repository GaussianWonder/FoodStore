import { createAction, createReducer } from '@reduxjs/toolkit'

const getPersistedAuthState = (): AuthState => {
  const rawState = window.localStorage.getItem('auth');

  const noAuth: AuthState = {
    user: undefined,
    token: undefined,
  }
  if (!rawState) return noAuth;
  try {
    return JSON.parse(rawState) as AuthState;
  } catch (e) {
    console.error(e);
    return noAuth;
  }
}

export const persistAuth = (authState: AuthState) => {
  window.localStorage.setItem('auth', JSON.stringify(authState));
}

export const removePersistedAuth = () => {
  window.localStorage.removeItem('auth');
}

export const authStateFromResponse = (response: AuthResponse | null): AuthState => {
  if (!response) {
    return {
      user: undefined,
      token: undefined,
    }
  }
  return {
    user: {
      username: response.username,
      admin: response.admin,
    },
    token: response.token,
  };
}

export interface User {
  username: string;
  admin: boolean;
  // ... not of interest
}

export type AuthResponse = User & {
  token: string;
}

export interface AuthState {
  user?: User;
  token?: string;
}

const initAuthState: AuthState = getPersistedAuthState();

export const fromRequest = createAction<AuthResponse | null, 'auth/fromRequest'>('auth/fromRequest');
export const newToken = createAction<string | null, 'auth/newToken'>('auth/newToken');
export const newUserDetails = createAction<User | null, 'auth/newUserDetails'>('auth/newUserDetails');

export default createReducer(initAuthState, (builder) => (
  builder
    .addCase(fromRequest, (state, action) => {
      const newState = authStateFromResponse(action.payload);
      state.user = newState.user;
      state.token = newState.token;
    })
    .addCase(newToken, (state, action) => {
      state.token = action.payload ?? undefined;
    })
    .addCase(newUserDetails, (state, action) => {
      state.user = action.payload ?? undefined;
    })
));
