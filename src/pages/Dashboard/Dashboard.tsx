import { useState, useEffect } from 'react';
import SearchInput from '../../components/Navbar/SearchInput';
import Slider from '../../components/Restaurant/Popular';
import { useQuery } from 'react-query';
import ClipLoader from 'react-spinners/ClipLoader';
import { UserState, setUser } from '../../features/auth/userSlice';
import api from '../../helpers/api/api.factory';
import { useDispatch } from 'react-redux';
import { Restaurants } from '../../components/Restaurant/Restaurants';
import searchAsset from '../../assets/images/search.svg';
import { Restaurant } from '../../interfaces/IRestaurantDetails';
import DropDown from '../../components/Navbar/Dropdown';
import NextReservation from '../../components/Reservation/NextReservation';
import Pagination from '../../components/Pagination/Pagination';
import { PaginatedResponse } from '../../interfaces/IPaginatedResponse';
import { ApiResponse } from '../../interfaces/IApiResponse';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [componentsLoaded, setComponentsLoaded] = useState(0);
  const [restaurants, setRestaurants] = useState<Restaurant[]>();
  const [logoutModal, setLogoutModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [nextPage, setNextPage] = useState(true);
  const [previousPage, setPreviousPage] = useState(false);
  const pageSize = 6;

  const handleComponentLoad = () => {
    setComponentsLoaded((loaded) => loaded + 1);
  };

  const increasePageNumber = () => {
    if (nextPage) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  };

  const decreasePageNumber = () => {
    if (previousPage) {
      setPageNumber((prevPageNumber) => prevPageNumber - 1);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const query = {
    pageSize,
    pageNumber,
    name: searchQuery,
  };

  const { refetch } = useQuery(
    ['get_searched_restaurants'],
    () => api.fetch('get_searched_restaurants', query),
    {
      onSuccess: (response: ApiResponse<PaginatedResponse<Restaurant>>) => {
        setNextPage(response.data.hasNextPage);
        setPreviousPage(response.data.hasPreviousPage);
        setRestaurants(response.data.items);
      },
      onError: (err) => {},
    }
  );

  useEffect(() => {
    refetch();
  }, [searchQuery, pageNumber, refetch]);

  const handleLogOutModal = () => {
    setLogoutModal((status) => !status);
  };

  const userInfo = useQuery(
    ['get_user_info'],
    () => api.fetch('get_user_info'),
    {
      onSuccess: (response: ApiResponse<UserState>) => {
        dispatch(setUser(response.data));
        handleComponentLoad();
      },
      onError: (err) => {
        handleComponentLoad();
      },
    }
  );

  useEffect(() => {
    if (componentsLoaded === 3) setLoading(false);
  }, [componentsLoaded]);

  return (
    <div className="pb-4 px-4 md:px-6">
      <div className="flex justify-center">
        <ClipLoader
          size={120}
          color={'green'}
          aria-label="Loading Spinner"
          loading={loading}
          className="mt-28 "
        />
      </div>

      {restaurants && (
        <div
          className={
            loading ? 'opacity-0 max-h-40 overflow-scroll' : 'opacity-100 '
          }
        >
          {logoutModal && (
            <div
              className="w-[100%] h-full fixed z-51"
              onClick={() => handleLogOutModal()}
            ></div>
          )}
          <div className="md:grid grid-cols-[minmax(100px,_1fr)_260px] gap-16 md:mt-8">
            <div className="order-2 top-10 ">
              <div className="w-full md:flex justify-between top-0">
                <SearchInput
                  handleSearch={handleSearch}
                  handleLogOutModal={handleLogOutModal}
                />

                <div className="hidden sm:block">
                  <DropDown
                    logoutModal={logoutModal}
                    handleLogOutModal={handleLogOutModal}
                  />
                </div>
              </div>

              <NextReservation handleComponentLoad={handleComponentLoad} />
            </div>

            <div className="order-1 ">
              <Slider handleComponentLoad={handleComponentLoad} />
              <Restaurants restaurants={restaurants} />
              <Pagination
                increasePageNumber={increasePageNumber}
                decreasePageNumber={decreasePageNumber}
                nextPage={nextPage}
                previousPage={previousPage}
                justify="end"
              />
            </div>
          </div>
        </div>
      )}

      {!loading && !restaurants && (
        <>
          <SearchInput
            handleSearch={handleSearch}
            handleLogOutModal={handleLogOutModal}
          />
          <div className="flex flex-col justify-center mt-24">
            <img src={searchAsset} alt="" className="h-44 opacity-50" />
            <p className="text-center text-2xl mt-5 text-gray-400">
              No restaurants available
            </p>
          </div>
        </>
      )}
    </div>
  );
};
export default Dashboard;
