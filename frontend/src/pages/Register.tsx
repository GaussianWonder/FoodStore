import React, { useState } from "react";
import { Link } from "react-router-dom";
import AbsoluteLoader from "../components/loader/AbsoluteLoader";
import { useAppDispatch } from "../store";
import { AuthResponse, fromRequest as authFromRequest } from "../store/auth";

const Register = () => {
  const appDispatch = useAppDispatch();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
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
      }),
    })
      .then(res => res.json())
      .then((userDetails: AuthResponse) => {
        appDispatch(authFromRequest(userDetails));
        console.log(userDetails);
      })
      .catch(err => {
        console.error(err);
        appDispatch(authFromRequest(null));
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla
          eaque error neque ipsa culpa autem, at itaque nostrum!
        </p>
      </div>

      <form action="" className="max-w-md mx-auto mt-8 mb-0 space-y-4" onSubmit={(e) => {e.preventDefault(); return true;}}>
        <div>
          <label htmlFor="username" className="sr-only">username</label>

          <div className="relative">
            <input
              type="text"
              className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm disabled:opacity-30"
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
              disabled={!enabled}
            />

            <span className="absolute inset-y-0 inline-flex items-center right-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <div className="relative">
            <input
              type="password"
              className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm disabled:opacity-30"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              disabled={!enabled}
            />

            <span className="absolute inset-y-0 inline-flex items-center right-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            <span className="mr-1">Already have an account?</span>
            <Link className="underline" to="/login">Log In</Link>
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
}

export default Register;