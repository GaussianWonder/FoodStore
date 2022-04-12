import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import IconAt from '../components/icons/IconAt';
import IconLock from '../components/icons/IconLock';
import AbsoluteLoader from '../components/loader/AbsoluteLoader';
import { useAppDispatch } from '../store';
import {
  AuthResponse,
  fromRequest as authFromRequest,
  authStateFromResponse,
  persistAuth,
  removePersistedAuth,
} from '../store/auth';
import { errorNotification, newNotification } from '../store/notification';
import { expectJson, ResponseError } from '../utils/promise';

const Login = () => {
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [enabled, setEnabled] = useState<boolean>(true);

  const login = () => {
    setEnabled(false);

    fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then(expectJson)
      .then((userDetails: AuthResponse) => {
        appDispatch(authFromRequest(userDetails));
        persistAuth(authStateFromResponse(userDetails));
        appDispatch(
          newNotification({
            id: 'login',
            display: {
              title: 'Login',
              message: 'You have been logged in successfully.',
              code: 200,
              date: new Date(),
            },
          }),
        );
        navigate('/');
      })
      .catch((error: ResponseError) => {
        appDispatch(authFromRequest(null));
        appDispatch(
          errorNotification({
            error,
            id: 'login',
            title: 'Login',
            message: 'Login failed. Missmatched credentials.',
          }),
        );
        removePersistedAuth();
      })
      .finally(() => {
        setEnabled(true);
      });
  };

  return (
    <div className="relative max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <AbsoluteLoader enabled={!enabled} />
      <div className="max-w-lg mx-auto text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Log In!</h1>
      </div>

      <form
        action=""
        className="max-w-md mx-auto mt-8 mb-0 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          return true;
        }}
      >
        <div>
          <label htmlFor="username" className="sr-only">
            username
          </label>

          <div className="relative">
            <input
              type="text"
              className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm disabled:opacity-30"
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
              disabled={!enabled}
            />

            <span className="absolute inset-y-0 inline-flex items-center right-4">
              <IconAt />
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm disabled:opacity-30"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              disabled={!enabled}
            />

            <span className="absolute inset-y-0 inline-flex items-center right-4">
              <IconLock />
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            <span className="mr-1">No account?</span>
            <Link className="underline" to="/register">
              Sign up
            </Link>
          </p>

          <button
            className="inline-block px-5 py-3 ml-3 text-sm font-medium text-white bg-blue-500 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={login}
            disabled={!enabled}
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
