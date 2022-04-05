import { Link, useNavigate} from 'react-router-dom';
import { useAppDispatch, useAuthSelector } from '../../store';
import AdminNav from './AdminNav';
import UserNav from './UserNav';
import { fromRequest as authFromRequest, removePersistedAuth } from "../../store/auth";

const MainNav = () => {
  const auth = useAuthSelector();
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();

  const logout = () => {
    appDispatch(authFromRequest(null));
    removePersistedAuth();
    navigate('/');
  }

  return (
    <header className="shadow-sm sticky top-0 bg-white z-30">
      <div className="max-w-screen-xl p-4 mx-auto">
        <div className="flex items-center justify-between space-x-4 lg:space-x-10">
          <div className="flex lg:w-0 lg:flex-1">
            { auth.token &&
              <Link to="/" className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg flex items-center justify-center select-none cursor-pointer">
                <span>
                  { auth.user?.username ?? '' }
                </span>
              </Link>
            }
          </div>

          { auth.token && auth.user?.isAdmin &&
            <AdminNav />
          }
          { auth.token && !auth.user?.isAdmin &&
            <UserNav />
          }

          { !auth.token &&
            <nav className="hidden space-x-8 text-sm font-medium md:flex">
              <span className="text-gray-500">Please authenticate to continue!</span>
            </nav>
          }

          { !auth.token &&
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
          }
          { auth.token &&
            <div className="items-center justify-end flex-1 hidden space-x-4 sm:flex">
              <span
                className="px-5 py-2 text-sm font-medium text-gray-500 bg-gray-100 rounded-lg cursor-pointer select-none"
                onClick={logout}
              >
                Logout
              </span>
            </div>
          }

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
  );
};

export default MainNav;