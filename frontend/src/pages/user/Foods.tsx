/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import AddButton from '../../components/button/AddButton';
import IconCheck from '../../components/icons/IconCheck';
import AbsoluteLoader from '../../components/loader/AbsoluteLoader';
import Food from '../../components/restaurant/Food';
import useFoodsOf from '../../hooks/fetch/useFoodsOf';
import { useAppDispatch, useAuthSelector } from '../../store';
import { errorNotification } from '../../store/notification';
import { expectJson } from '../../utils/promise';

const toInteger = (str: string | null | undefined): number | undefined => {
  if (!str) return undefined;
  try {
    return parseInt(str, 10);
  } catch(e) {
    return undefined;
  }
}

const Foods = () => {
  const appDispatch = useAppDispatch();
  const auth = useAuthSelector();

  const params = useParams<{
    restaurantId: string
  }>();

  const { restaurantId } = params;
  const id = toInteger(restaurantId);

  const {
    subject: [foods],
    isLoading: areFoodsLoading,
  } = useFoodsOf({
    id,
  });

  if (!id) {
    return (<span>Error</span>);
  }

  const [selectedFoods, setSelectedFoods] = useState<Set<number>>(new Set());

  const placeOrder = () => {
    fetch('http://localhost:8080/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({
        foodIds: [],
      }),
    })
      .then(expectJson)
      .then((data) => {

      })
      .catch((error) => {
        appDispatch(
          errorNotification({
            error,
            id: 'order',
            title: 'New Order',
            message: 'Error while placing the new order',
          }),
        );
      });
  }

  const toggleSelect = (foodId: number) => {
    const tempSet = new Set(selectedFoods);
    if (selectedFoods.has(foodId))
      tempSet.delete(foodId);
    else
      tempSet.add(foodId)

    setSelectedFoods(tempSet);
  }

  return (
    <div className="relative max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      { selectedFoods.values() && 
        <div className="z-30 fixed">
          <AddButton
            onClick={placeOrder}
          />
        </div>
      }
      <AbsoluteLoader enabled={areFoodsLoading} />
      <div className="max-w-lg mx-auto text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Foods
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 gap-2">
        {foods?.map(({ id, name, description, price, category }) => (
          <div
            key={`food-${id}`}
            className={`
              relative w-full h-full max-w-md mx-auto
              place-self-center
              flex items-center justify-center
              cursor-pointer transform hover:scale-[101%] transition-all rounded-2xl
              ${ selectedFoods.has(id) ? 'ring ring-blue-500' : ''}
            `}
            onClick={() => toggleSelect(id)}
          >
            { selectedFoods.has(id) &&
              <span className="absolute w-6 h-6 rounded-full bg-white border border-gray-600 shadow flex items-center justify-center scale-150">
                <IconCheck />
              </span>
            }
            <Food
              id={id}
              name={name}
              description={description}
              price={price}
              category={category}
              editable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Foods;
