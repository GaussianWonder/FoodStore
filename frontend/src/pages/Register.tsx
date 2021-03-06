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

const Register = () => {
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isRestaurantOwner, setIsRestaurantOwner] = useState<boolean>(false);
  const [enabled, setEnabled] = useState<boolean>(true);

  const register = () => {
    setEnabled(false);
    fetch('http://localhost:8080/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        restaurantOwner: isRestaurantOwner,
      }),
    })
      .then(expectJson)
      .then((userDetails: AuthResponse) => {
        appDispatch(authFromRequest(userDetails));
        persistAuth(authStateFromResponse(userDetails));
        appDispatch(
          newNotification({
            id: 'register',
            display: {
              title: 'Register',
              message: 'You have registered successfully.',
              code: 201,
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
            id: 'register',
            title: 'Register',
            message: 'Register failed. Check your credentials.',
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
        <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>

        <p className="mt-4 text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla eaque error neque ipsa culpa autem,
          at itaque nostrum!
        </p>
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

        <div className="flex items-center py-3">
          <input
            id="isRestaurantOwner"
            type="checkbox"
            name="isRestaurantOwner"
            className="w-5 h-5 border-gray-300 rounded"
            onChange={(e) => setIsRestaurantOwner(e.target.checked)}
          />

          <label htmlFor="isRestaurantOwner" className="ml-3 text-sm font-medium text-gray-500">
            Restaurant owner
          </label>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            <span className="mr-1">Already have an account?</span>
            <Link className="underline" to="/login">
              Log In
            </Link>
          </p>

          <button
            className="inline-block px-5 py-3 ml-3 text-sm font-medium text-white bg-blue-500 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={register}
            disabled={!enabled}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
