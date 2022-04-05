import { Link } from "react-router-dom";

const UserNav = () => {
  return (
    <nav className="hidden space-x-8 text-sm font-medium md:flex">
      <Link className="text-gray-500" to="/restaurants">Restaurants</Link>
      <Link className="text-gray-500" to="/orders">My orders</Link>
    </nav>
  );
}

export default UserNav;