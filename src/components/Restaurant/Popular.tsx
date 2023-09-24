import { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { useNavigate } from 'react-router-dom';
import { Restaurant } from '../../interfaces/IRestaurantDetails';
import { City } from '../../enums/City';
import enumKeys from '../../helpers/key-list';
import { useQuery } from 'react-query';
import api from '../../helpers/api/api.factory';
import { useState } from 'react';
import { ApiResponse } from '../../interfaces/IApiResponse';

interface SliderProp {
  handleComponentLoad: () => void;
}

const Slider = ({ handleComponentLoad }: SliderProp) => {
  const navigate = useNavigate();
  const [popularRestaurants, setPopularRestaurants] = useState<Restaurant[]>();

  const getPopularRestaurants = useQuery(
    ['get_popular_restaurants'],

    () => api.fetch('get_popular_restaurants'),
    {
      onSuccess: (response: ApiResponse<Restaurant[]>) => {
        setPopularRestaurants(response.data);
        handleComponentLoad();
      },
      onError: (err) => {
        handleComponentLoad();
      },
    }
  );

  return (
    <>
      <div className="mb-4 md:mb-6">
        <h2 className="text-2xl">Popular picks</h2>
        <p className="hidden md:block text-sm text-gray-500">
          Can't decide where to dine? Check out popular restaurants.
        </p>
      </div>
      {popularRestaurants && (
        <Swiper
          className="rounded-xl hover:cursor-pointer"
          modules={[Pagination, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          {popularRestaurants.map((restaurant) => {
            return (
              <SwiperSlide
                className="black-overlay-effect"
                key={restaurant.id}
                onClick={() =>
                  navigate('/dashboard/restaurant/' + restaurant.id)
                }
              >
                <div className="static ">
                  <img
                    src={restaurant.image}
                    alt=""
                    className="w-full h-52 object-cover md:h-72 "
                  />

                  <div className="absolute top-0 left-0 text-gray-100 flex flex-col justify-center h-full ml-7 sm:ml-12 ">
                    <h2 className="text-sm sm:text-base font-medium">
                      {enumKeys(City)[restaurant.city - 1]}
                    </h2>

                    <h1 className="mt-2 text-[24px] sm:text-[30px] font-medium opacity-100 ">
                      {restaurant.name}
                    </h1>

                    <button className="h-8 w-32 sm:h-10 sm:w-36 bg-[#209479] rounded-lg mt-3 sm:mt-6  ">
                      Check it out
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </>
  );
};

export default Slider;
