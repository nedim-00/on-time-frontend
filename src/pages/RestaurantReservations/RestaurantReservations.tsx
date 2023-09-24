import { useEffect, useState } from 'react';
import { RestaurantReservation } from '../../interfaces/IReservation';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import api from '../../helpers/api/api.factory';
import { PaginatedResponse } from '../../interfaces/IPaginatedResponse';
import calendarAsset from '../../assets/images/calendar.svg';
import Pagination from '../../components/Pagination/Pagination';
import { ReservationStatus } from '../../enums/Reservation';
import { format, parseISO } from 'date-fns';
import { ApiResponse } from '../../interfaces/IApiResponse';

const RestaurantReservations = () => {
  const [reservations, setReservations] = useState<RestaurantReservation[]>();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [nextPage, setNextPage] = useState(true);
  const [previousPage, setPreviousPage] = useState(false);
  const [totalReservations, setTotalReservations] = useState(0);
  const params = useParams();
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
    id: params.id,
    pageSize,
    pageNumber,
  };

  const { refetch } = useQuery(
    ['get_restaurant_reservations'],
    () => api.fetch('get_restaurant_reservations', query),
    {
      onSuccess: (
        response: ApiResponse<PaginatedResponse<RestaurantReservation>>
      ) => {
        setReservations(response.data.items);
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
      <div className="  mx-6 my-8 ">
        <div>
          <h2 className="text-2xl">Reservations</h2>
          <p className="hidden md:block text-sm text-gray-500">
            Stay in control of your reservations here.
          </p>
        </div>

        <div className=" ">
          {!loading && !notFound && (
            <>
              {reservations?.length === 0 && (
                <div className="flex flex-col w-full justify-center mt-16">
                  <img src={calendarAsset} alt="" className="h-44 opacity-30" />
                  <p className="text-center text-2xl mt-5  text-gray-400">
                    No reservations yet
                  </p>
                </div>
              )}
              <div className="mt-4 md:flex flex-1 gap-4 flex-wrap">
                {reservations?.map((reservation) => (
                  <div
                    className="flex-1 mb-4 md:mb-0 min-w-full md:min-w-[390px] max-w-[390px] bg-white px-4 py-3 rounded-xl shadow-sm hover:cursor-pointer"
                    key={reservation.id}
                  >
                    <div className="flex justify-between items-center">
                      <div className="w-40 md:w-52">
                        <h2 className="font-normal text-xl">
                          {reservation.user.firstName}{' '}
                          {reservation.user.lastName}
                        </h2>
                        <p className="text-[#9D9D9D] text-xs ml-2 mb-3"></p>
                      </div>

                      {reservation.reservationStatus ===
                        ReservationStatus.Cancelled && (
                        <div className="text-center cursor:pointer mb-2 font-normal text-xs  bg-[#FF605C] text-white rounded-lg px-2 py-1 self-center">
                          Cancelled
                        </div>
                      )}
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
                          , {reservation.startTime.slice(0, 5)} -{' '}
                          {reservation.endTime.slice(0, 5)}
                        </p>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
            </>
          )}
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
  );
};

export default RestaurantReservations;
