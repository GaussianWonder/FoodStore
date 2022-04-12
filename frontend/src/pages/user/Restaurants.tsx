/* eslint-disable no-unused-vars */
import AbsoluteLoader from "../../components/loader/AbsoluteLoader";
import Restaurant from "../../components/restaurant/Restaurant";
import useHasRestaurants from "../../hooks/fetch/useHasRestaurants";

const Restaurants = () => {
  const {
    subject: [restaurants, setRestaurants],
    isLoading: areRestaurantsLoading,
  } = useHasRestaurants();


  return (
    <div className="relative max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <AbsoluteLoader enabled={areRestaurantsLoading} />
      <div className="max-w-lg mx-auto text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Registered restaurants
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 gap-2">
        { restaurants &&
          restaurants.map(({ id, name, user, foodList }) => (
            <Restaurant
              key={`restaurant-${id}`}
              id={id}
              name={name}
              user={user}
              foodList={foodList}
            />
          ))
        }
      </div>
    </div>
  );
};

export default Restaurants;
