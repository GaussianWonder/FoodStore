import { Link } from 'react-router-dom';

const AdminNav = () => {
  return (
    <nav className="hidden space-x-8 text-sm font-medium md:flex">
      <Link className="text-gray-500" to="/my-restaurant">
        My restaurant
      </Link>
      <Link className="text-gray-500" to="/my-foods">
        My foods
      </Link>
      <Link className="text-gray-500" to="/my-orders">
        My orders
      </Link>
    </nav>
  );
};

export default AdminNav;
