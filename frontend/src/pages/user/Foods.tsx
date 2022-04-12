/* eslint-disable no-unused-vars */
import { useParams } from 'react-router-dom';
import AbsoluteLoader from '../../components/loader/AbsoluteLoader';
import Food from '../../components/restaurant/Food';
import useFoodsOf from '../../hooks/fetch/useFoodsOf';
import { useAuthSelector } from '../../store';

const toInteger = (str: string | null | undefined): number | undefined => {
  if (!str) return undefined;
  try {
    return parseInt(str, 10);
  } catch(e) {
    return undefined;
  }
}

const Foods = () => {
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

  const placeOrder = (foodId: number) => {
    auth.user?.username;
  }

  return (
    <div className="relative max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
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
            className="place-self-center w-full h-full max-w-md mx-auto flex items-center justify-center cursor-pointer transform hover:scale-[101%] transition-all"
            onClick={() => placeOrder(id)}
          >
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
