/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import IconFork from "../../components/icons/IconFork";
import AbsoluteLoader from "../../components/loader/AbsoluteLoader";
import useHasRestaurant from "../../hooks/admin/useHasRestaurant";
import useFoodsOf from "../../hooks/fetch/useFoodsOf";

const MyFoods = () => {
  const {
    subject: [restaurant, setRestaurant],
    isLoading: isRestaurantLoading,
  } = useHasRestaurant();

  const {
    subject: [foods, setFoods],
    isLoading: areFoodsLoading,
  } = useFoodsOf({
    id: restaurant?.id,
  });

  if (!restaurant) {
    return (
      <div>
        <AbsoluteLoader enabled={isRestaurantLoading} />
        <section className="relative max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
          <div className="max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div
              className="grid grid-cols-1 lg:grid-cols-2 gap-y-8 lg:gap-x-16 lg:items-center"
            >
              <div className="max-w-lg mx-auto text-center lg:text-left lg:mx-0">
                <h2 className="text-3xl font-bold sm:text-4xl">You don`t have a restaurant</h2>

                <p className="mt-4 text-gray-600">
                  Once you create one you can continue the onboarding process of your restaurant.
                </p>

                <Link
                  className="inline-flex items-center px-8 py-3 mt-8 text-white bg-indigo-600 border border-indigo-600 rounded hover:bg-transparent hover:text-indigo-600 active:text-indigo-500 focus:outline-none focus:ring"
                  to="/my-restaurant"
                >
                  <span className="text-sm font-medium"> Get Started </span>

                  <svg
                    className="w-5 h-5 ml-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
                <Link
                  className="block p-4 border border-gray-100 shadow-sm rounded-xl focus:outline-none focus:ring hover:border-gray-200 hover:ring-1 hover:ring-gray-200"
                  to="/my-restaurant"
                >
                  <IconFork />

                  <h6 className="mt-2 font-bold">Restaurant</h6>

                  <p className="hidden sm:mt-1 sm:text-sm sm:text-gray-600 sm:block">
                    Update your restaurant information.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="relative max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <AbsoluteLoader enabled={isRestaurantLoading || areFoodsLoading} />
      <div className="max-w-lg mx-auto text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">
          <span className="text-indigo-500">{ restaurant.name }</span>
          <span className="text-gray-700 ml-1">foods</span>
        </h1>
        <span className="font-normal text-lg text-gray-700">
          <span>Your restaurant has</span>
          <span className="mx-1 text-indigo-500">{ foods ? foods.length : 'no' }</span>
          <span>foods</span>
        </span>
      </div>
      <div className="max-w-md mx-auto mt-8 mb-0 space-y-4">
        <div>
          text
        </div>
      </div>
    </div>
  );
}

export default MyFoods;
