import arrow from '../../assets/images/arrow.png';
import { useNavigate } from 'react-router-dom';
import { Restaurant } from '../../interfaces/IRestaurantDetails';

interface RestaurantsProp {
  restaurants: Restaurant[];
}

export const Restaurants = ({ restaurants }: RestaurantsProp) => {
  const navigate = useNavigate();

  return (
    <>
      <h2 className="text-2xl my-4 ">Restaurants</h2>

      <div className="md:grid  lg:grid-cols-[repeat(auto-fill,_minmax(250px,1fr))] gap-6">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            onClick={() => navigate('/dashboard/restaurant/' + restaurant.id)}
            className="rounded-xl bg-white lg:mb-0 mb-6 shadow-sm hover:cursor-pointer relative h-full "
          >
            <div className="flex flex-col  ">
              <img
                src={restaurant.image}
                alt=""
                className="w-full h-52 object-cover rounded-t-xl "
              />

              <div className="p-3 flex h-full ">
                <div className="w-full h-full white-overlay-effect">
                  <h3 className="text-xl font-medium">{restaurant.name}</h3>
                  <p className="font-light text-sm text-[#6B7280] mt-1">
                    {restaurant.description}
                  </p>
                </div>
                <div className="absolute right-5 bottom-5   ">
                  <div className="bg-[#64B880] bg-opacity-[85%]   rounded-full w-9 h-9 flex justify-center items-center hover:transition-all hover:scale-95">
                    <img src={arrow} alt="" className="rotate-180 w-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
