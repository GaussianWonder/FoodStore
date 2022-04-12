import { Link } from "react-router-dom";
import RestaurantType from "../../types/restaurant";
import IconFork from "../icons/IconFork";

const Restaurant = ({ id, name, foodList, user }: RestaurantType) => {
  const foodCount = foodList.length;

  return (
    <Link
      className="relative block p-4 border border-gray-100 shadow-xl rounded-xl hover:ring ring-gray-200 hover:scale-105 transform transition-all"
      to={`/restaurants/${id}`}
    >
      <span className="absolute right-4 top-4 rounded-full px-3 py-1.5 bg-green-100 text-green-600 font-medium text-xs">
        { foodCount }
      </span>

      <div className="mt-4 text-gray-500 sm:pr-8">
        <IconFork />

        <h5 className="mt-4 text-xl font-bold text-gray-900">{ name }</h5>

        <p className="hidden mt-2 text-sm sm:block">{ user.username }`s</p>
      </div>
    </Link>
  );
}

export default Restaurant;