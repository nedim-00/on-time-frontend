import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../helpers/api/api.factory';
import { useQuery } from 'react-query';
import { ClipLoader } from 'react-spinners';
import { Restaurant } from '../../interfaces/IRestaurantDetails';
import enumKeys from '../../helpers/key-list';
import { Municipality } from '../../enums/Municipality';
import { City } from '../../enums/City';
import { ApiResponse } from '../../interfaces/IApiResponse';

interface Props {
  pageType: string;
}

const ChooseRestaurant = ({ pageType }: Props) => {
  const [ownedRestaurants, setOwnedRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setLoading] = useState(true);

  const navigate = useNavigate();

  const owned_restaurants = useQuery(
    ['get_owned_restaurants'],
    () => api.fetch('get_owned_restaurants'),
    {
      onSuccess: (response: ApiResponse<Restaurant[]>) => {
        setOwnedRestaurants(response.data);
        setLoading(false);
      },
      onError: (err) => {
        setLoading(false);
      },
      retry: false,
    }
  );

  return (
    <>
      <div className="flex justify-center">
        <ClipLoader
          size={120}
          color={'green'}
          aria-label="Loading Spinner"
          loading={isLoading}
          className="mt-28 "
        />
      </div>
      {!isLoading && ownedRestaurants.length === 0 && (
        <div>
          <div className="mx-6 my-8">
            <h2 className="text-2xl">Choose a restaurant</h2>
          </div>
          <div className="flex flex-col justify-center mt-24">
            <p className="text-center text-2xl mt-5 text-gray-400">
              You do not have any restaurants added yet!
            </p>
          </div>
        </div>
      )}
      {!isLoading && ownedRestaurants.length > 0 && (
        <>
          <div className="pb-4 px-6">
            <h2 className="text-2xl my-8">Choose a restaurant</h2>
            <div className="md:flex gap-4  flex-wrap ">
              {ownedRestaurants.map((restaurant) => {
                return (
                  <div
                    onClick={() => navigate(restaurant.id.toString())}
                    key={restaurant.id}
                    className="rounded-xl bg-white lg:mb-0 mb-6 shadow-sm hover:cursor-pointer md:w-[380px] h-full max-h-[150px]"
                  >
                    <div className="flex">
                      <img
                        src={restaurant.image}
                        alt=""
                        className="w-[45%] object-cover max-h-[150px] rounded-l-xl "
                      />

                      <div className="p-3 w-[55%] h-full flex flex-col">
                        <div className=" h-full">
                          <h3 className="text-xl font-medium">
                            {restaurant.name}
                          </h3>
                          <p className="font-light text-sm text-[#6B7280] mt-1">
                            {restaurant.address}
                          </p>
                          <p className="font-light text-sm text-[#6B7280] mt-1">
                            {restaurant.municipality
                              ? enumKeys(Municipality)[
                                  restaurant.municipality - 1
                                ]
                              : enumKeys(City)[restaurant.city - 1]}
                          </p>
                        </div>
                        <button className=" bg-[#046C4E] text-sm text-white py-2 px-4 rounded-xl mt-3">
                          {pageType}
                        </button>
                        <div className="justify-self-end self-center h-full ml-3"></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ChooseRestaurant;
