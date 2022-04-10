import React, { useRef, useState } from "react";
import AbsoluteLoader from "../../components/loader/AbsoluteLoader";
import useHasRestaurant from "../../hooks/admin/useHasRestaurant";
import { useAppDispatch, useAuthSelector } from "../../store";
import { errorNotification } from "../../store/notification";
import { expectJson, ResponseError } from "../../utils/promise";

const MyRestaurant = () => {
  const appDispatch = useAppDispatch();
  const auth = useAuthSelector();

  const restaurantNameInput = useRef<HTMLInputElement | null>(null);
  const [enabled, setEnabled] = useState<boolean>(true);
  const [restaurantName, setRestaurantName] = useState<string>("");
  const {
    subject: [restaurant, setRestaurant],
    isLoading: isRestaurantLoading,
  } = useHasRestaurant();

  const createRestaurant = () => {
    fetch(`http://localhost:8080/admin/restaurant`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`,
      },
      body: JSON.stringify({
        name: restaurantName,
      }),
    })
      .then(expectJson)
      .then(setRestaurant)
      .catch((error: ResponseError) => {
        appDispatch(errorNotification({
          error,
          id: 'create-my-restaurant',
          title: 'Create restaurant',
          message: 'There was an error while creating your restaurant.',
        }));
      })
      .finally(() => {
        setEnabled(true);
      });
  }

  const updateRestaurant = () => {
    fetch(`http://localhost:8080/admin/restaurant`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`,
      },
      body: JSON.stringify({
        id: restaurant?.id,
        name: restaurantName,
      }),
    })
      .then(expectJson)
      .then(setRestaurant)
      .catch((error: ResponseError) => {
        appDispatch(errorNotification({
          error,
          id: 'create-my-restaurant',
          title: 'Create restaurant',
          message: 'There was an error while creating your restaurant.',
        }));
      })
      .finally(() => {
        setEnabled(true);
      });
  }

  return (
    <div className="relative max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <AbsoluteLoader enabled={!enabled || isRestaurantLoading} />
      <div className="max-w-lg mx-auto text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">
          {restaurant ? restaurant.name : 'Create your restaurant'}
          { restaurant &&
            <p className="font-normal text-sm">
              <span className="text-indigo-500">{ restaurant.foodList.length }</span>
              <span className="text-gray-700 ml-1">total Foods</span>
            </p>
          }
        </h1>
      </div>
      <form action="" className="max-w-md mx-auto mt-8 mb-0 space-y-4" onSubmit={(e) => {e.preventDefault(); return true;}}>
        <div>
          <label htmlFor="restaurant-name" className="sr-only">Restaurant name</label>

          <div className="relative">
            <input
              ref={restaurantNameInput}
              type="text"
              className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm disabled:opacity-30"
              placeholder="Enter restaurant name"
              onChange={(e) => setRestaurantName(e.target.value)}
              disabled={!enabled || isRestaurantLoading}
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

        <div className="flex items-center justify-between">
          <span></span>

          <button
            className="inline-block px-5 py-3 ml-3 text-sm font-medium text-white bg-blue-500 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={restaurant ? updateRestaurant : createRestaurant}
            disabled={!enabled || !restaurantName || isRestaurantLoading}
          >
            { restaurant ? 'Update' : 'Create' } restaurant
          </button>
        </div>
      </form>      
    </div>
  );
}

export default MyRestaurant;
