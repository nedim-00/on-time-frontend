import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../helpers/api/api.factory';
import { useQuery } from 'react-query';
import { ClipLoader } from 'react-spinners';
import calendarAsset from '../../assets/images/calendar.svg';
import arrow from '../../assets/images/arrow.png';
import { ReservationStatus } from '../../enums/Reservation';
import { PaginatedResponse } from '../../interfaces/IPaginatedResponse';
import { format, parseISO } from 'date-fns';
import { Reservation } from '../../interfaces/IReservation';
import { Municipality } from '../../enums/Municipality';
import enumKeys from '../../helpers/key-list';
import Pagination from '../../components/Pagination/Pagination';
import { City } from '../../enums/City';
import { ApiResponse } from '../../interfaces/IApiResponse';

const UserReservations = () => {
  const [myReservations, setMyReservations] = useState<Reservation[]>();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [nextPage, setNextPage] = useState(true);
  const [previousPage, setPreviousPage] = useState(false);
  const [totalReservations, setTotalReservations] = useState(0);
  const pageSize = 9;

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

  const query = {
    pageSize,
    pageNumber,
  };

  const navigate = useNavigate();

  const { refetch } = useQuery(
    ['get_user_reservations'],
    () => api.fetch('get_user_reservations', query),
    {
      onSuccess: (response: ApiResponse<PaginatedResponse<Reservation>>) => {
        setMyReservations(response.data.items);
        setNextPage(response.data.hasNextPage);
        setPreviousPage(response.data.hasPreviousPage);
        setTotalReservations(response.data.totalCount);

        setLoading(false);
      },
      onError: (err) => {
        setLoading(false);
      },
    }
  );

  useEffect(() => {
    refetch();
  }, [pageNumber, refetch]);

  return (
    <>
      <div className="flex justify-center">
        <ClipLoader
          size={120}
          color={'green'}
          aria-label="Loading Spinner"
          loading={loading}
          className="mt-28 "
        />
      </div>
      {}
      {!loading && !notFound && (
        <>
          <div className="pb-4 px-6 ">
            <div className="mb-4 md:mb-6 my-8">
              <h2 className="text-2xl">My reservations</h2>
              <p className="hidden md:block text-sm text-gray-500">
                Explore and manage all your reservations in one place.
              </p>
            </div>
            <div className="md:flex flex-1 gap-4 mb-4 md:mb-0 flex-wrap  ">
              {myReservations?.length === 0 && (
                <div className="flex flex-col w-full justify-center mt-16">
                  <img src={calendarAsset} alt="" className="h-44 opacity-30" />
                  <p className="text-center text-2xl mt-5  text-gray-400">
                    No reservations yet
                  </p>
                </div>
              )}
              {myReservations?.map((reservation) => (
                <div
                  className="flex-1 mb-4 md:mb-0 min-w-full md:min-w-[390px] max-w-[390px] bg-white px-4 py-3 rounded-xl shadow-sm hover:cursor-pointer"
                  key={reservation.id}
                  onClick={() => {
                    navigate('/my-reservations/' + reservation.id);
                  }}
                >
                  <div className="flex justify-between items-center">
                    <div className="w-40 md:w-52">
                      <h2 className="font-normal text-xl">
                        {reservation.restaurant.name}
                      </h2>
                      <p className="text-[#9D9D9D] text-xs ml-2 mb-3">
                        {reservation.restaurant.address},{' '}
                        {reservation.restaurant.municipality
                          ? enumKeys(Municipality)[
                              reservation.restaurant.municipality - 1
                            ]
                          : enumKeys(City)[reservation.restaurant.city - 1]}
                      </p>
                    </div>

                    {reservation.reservationStatus ===
                      ReservationStatus.Cancelled && (
                      <div className="text-center cursor:pointer mb-2 font-normal text-xs  bg-[#FF605C] text-white rounded-lg px-2 py-1 self-center">
                        Cancelled
                      </div>
                    )}

                    <div className="justify-self-end self-center h-full ">
                      <div className="bg-[#64B880] bg-opacity-[85%]  rounded-full w-9 h-9 flex justify-center mr-1 mb-2 items-center hover:transition-all hover:scale-95">
                        <img src={arrow} alt="" className="rotate-180 w-5" />
                      </div>
                    </div>
                  </div>

                  <hr />

                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="font-normal text-lg">For:</h3>
                      <p className="text-[#9D9D9D] text-xs ml-2 mb-3">
                        {reservation.numberOfGuests} people
                      </p>
                    </div>

                    <div>
                      <h3 className="font-normal text-lg">Date:</h3>
                      <p className="text-[#9D9D9D] text-xs ml-2 mb-3">
                        {format(
                          parseISO(reservation.date.toString().slice(0, 10)),
                          'dd-MM-yyyy'
                        )}
                        , {reservation.startTime.slice(0, 5)}
                      </p>
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
            </div>
            {totalReservations > pageSize && (
              <Pagination
                increasePageNumber={increasePageNumber}
                decreasePageNumber={decreasePageNumber}
                nextPage={nextPage}
                previousPage={previousPage}
                justify="start"
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default UserReservations;
