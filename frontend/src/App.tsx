import React from 'react';
import { Routes, BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
    <Router>
      <header className="shadow-sm">
        <div className="max-w-screen-xl p-4 mx-auto">
          <div className="flex items-center justify-between space-x-4 lg:space-x-10">
            <div className="flex lg:w-0 lg:flex-1">
              <span className="w-20 h-10 bg-gray-200 rounded-lg"></span>
            </div>

            <nav className="hidden space-x-8 text-sm font-medium md:flex">
              <a className="text-gray-500" href="#">About</a>
              <a className="text-gray-500" href="#">Contact</a>
            </nav>

            <div className="items-center justify-end flex-1 hidden space-x-4 sm:flex">
              <Link
                className="px-5 py-2 text-sm font-medium text-gray-500 bg-gray-100 rounded-lg"
                to="/login"
              >
                Log in
              </Link>

              <Link
                className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg"
                to="/register"
              >
                Sign up
              </Link>
            </div>

            <div className="lg:hidden">
              <button className="p-2 text-gray-600 bg-gray-100 rounded-lg" type="button">
                <span className="sr-only">Open menu</span>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6h16M4 12h16M4 18h16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
