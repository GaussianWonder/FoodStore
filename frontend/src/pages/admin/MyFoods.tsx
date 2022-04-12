/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AddButton from '../../components/button/AddButton';
import IconAt from '../../components/icons/IconAt';
import IconFork from '../../components/icons/IconFork';
import IconT from '../../components/icons/IconT';
import IconTag from '../../components/icons/IconTag';
import AbsoluteLoader from '../../components/loader/AbsoluteLoader';
import TooltipModal from '../../components/modal/TooltipModal';
import Food from '../../components/restaurant/Food';
import { Input, InputContainer } from '../../components/styled/Inputs';
import useHasRestaurant from '../../hooks/admin/useHasRestaurant';
import useCategories from '../../hooks/fetch/useCategories';
import useFoodsOf from '../../hooks/fetch/useFoodsOf';
import { useAppDispatch, useAuthSelector } from '../../store';
import { errorNotification } from '../../store/notification';
import FoodType from '../../types/food';
import { inputSetter, numberSetter, stringSetter } from '../../utils/events';
import { expectJson, ResponseError } from '../../utils/promise';

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

  const {
    subject: [categories],
    isLoading: areCategoriesLoading,
  } = useCategories();

  const isPageEnabled = !isRestaurantLoading && !areFoodsLoading;
  const isFoodCreateEnabled = isPageEnabled && !areCategoriesLoading;

  const [newName, setNewName] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');
  const [newPrice, setNewPrice] = useState<number>(0);
  const [newCategory, setNewCategory] = useState<number>(0);

  const appDispatch = useAppDispatch();
  const auth = useAuthSelector();

  if (!restaurant) {
    return (
      <div>
        <AbsoluteLoader enabled={isRestaurantLoading} />
        <section className="relative max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
          <div className="max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-8 lg:gap-x-16 lg:items-center">
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
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

  const createNewFood = () => {
    fetch(`http://localhost:8080/foods/${restaurant.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({
        name: newName,
        description: newDescription,
        price: newPrice,
        categoryId: newCategory,
      }),
    })
      .then(expectJson)
      .then((food: FoodType) => {
        setFoods([...foods!, food]);
      })
      .catch((error: ResponseError) => {
        appDispatch(
          errorNotification({
            error,
            id: 'create-food',
            title: 'Food',
            message: 'Failed to create food for your restaurant',
          }),
        );
      });
  };

  return (
    <div className="relative max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <AbsoluteLoader enabled={!isPageEnabled} />
      <div className="max-w-lg mx-auto text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">
          <span className="text-indigo-500">{restaurant.name}</span>
          <span className="text-gray-700 ml-1">foods</span>
        </h1>
        <span className="font-normal text-lg text-gray-700">
          <span>Your restaurant has</span>
          <span className="mx-1 text-indigo-500">{foods ? foods.length : 'no'}</span>
          <span>foods</span>
          <TooltipModal activator={<AddButton onClick={createNewFood} />}>
            <div className="backdrop-blur bg-black bg-opacity-30 rounded-md p-2 ring ring-green-200">
              <InputContainer>
                <label className="sr-only" htmlFor="new-category-select">
                  Category
                </label>

                <select
                  id="new-category-select"
                  className="border-gray-200 relative rounded-t-lg w-full text-sm disabled:opacity-30"
                  name="category"
                  defaultValue={0}
                  disabled={!isFoodCreateEnabled}
                  onChange={inputSetter(setNewCategory, (v) => +v)}
                >
                  <option value="0" disabled hidden>
                    {' '}
                    Choose{' '}
                  </option>
                  {categories &&
                    categories.map(({ id, name }) => (
                      <option key={`category-${id}`} value={id}>
                        {name}
                      </option>
                    ))}
                </select>
              </InputContainer>

              <InputContainer>
                <Input
                  type="text"
                  placeholder="Enter food name"
                  disabled={!isFoodCreateEnabled}
                  onChange={stringSetter(setNewName)}
                />

                <span className="absolute inset-y-0 inline-flex items-center right-4">
                  <IconAt />
                </span>
              </InputContainer>

              <InputContainer>
                <Input
                  type="text"
                  placeholder="Enter description"
                  disabled={!isFoodCreateEnabled}
                  onChange={stringSetter(setNewDescription)}
                />

                <span className="absolute inset-y-0 inline-flex items-center right-4">
                  <IconT />
                </span>
              </InputContainer>

              <InputContainer>
                <Input
                  type="number"
                  placeholder="Enter price"
                  disabled={!isFoodCreateEnabled}
                  onChange={numberSetter(setNewPrice)}
                />

                <span className="absolute inset-y-0 inline-flex items-center right-4">
                  <IconTag />
                </span>
              </InputContainer>

              <AbsoluteLoader enabled={!isFoodCreateEnabled} />
            </div>
          </TooltipModal>
        </span>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2'>
        {foods?.map(({ id, name, description, price, category }) => (
          <div
            key={`food-${id}`}
            className="place-self-center w-full h-full max-w-md mx-auto flex items-center justify-center"
          >
            <Food
              id={id}
              name={name}
              description={description}
              price={price}
              category={category}
              editable
              updateSignal={(newFood: FoodType) => {
                setFoods(foods!.map((f) => (f.id === newFood.id ? newFood : f)));
              }}
              deleteSignal={() => {
                setFoods(foods!.filter((food) => food.id !== id));
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFoods;
