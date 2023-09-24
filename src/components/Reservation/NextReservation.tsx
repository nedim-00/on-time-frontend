import { useQuery } from 'react-query';
import api from '../../helpers/api/api.factory';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { ApiResponse } from '../../interfaces/IApiResponse';
import { Reservation } from '../../interfaces/IReservation';

interface NextReservationProp {
  handleComponentLoad: () => void;
}

const NextReservation = ({ handleComponentLoad }: NextReservationProp) => {
  const [nextReservation, setNextReservation] = useState<Reservation>();
  const navigate = useNavigate();

  const nextReservationInfo = useQuery(
    ['get_next_reservation'],
    () => api.fetch('get_next_reservation'),
    {
      onSuccess: (response: ApiResponse<Reservation>) => {
        setNextReservation(response.data);
        handleComponentLoad();
      },
      onError: (err) => {
        handleComponentLoad();
      },
    }
  );

  return (
    <div className="hidden md:block bg-[#fcfbfe] mt-8  w-full h-[200px] rounded-lg py-4 px-6 text-lg">
      <div>
        <div className="flex items-center">
          <div className="h-8 w-4 bg-[#00cc9c] rounded-md"></div>
          <div className="text-base font-medium ml-3">Upcoming Reservation</div>
        </div>
        <div className="flex gap-4 mt-6 items-center">
          <div className="w-12 h-12 bg-[#E4FAE4] rounded-full flex justify-center items-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#008364"
              className="w-6 h-6"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M3 9H21M7 3V5M17 3V5M6 13H8M6 17H8M11 13H13M11 17H13M16 13H18M16 17H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"
                  stroke="#008364"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>
          </div>

          {nextReservation ? (
            <div className="text-sm w-[70%] ">
              Your next reservation is scheduled for{' '}
              <b>
                {format(
                  parseISO(nextReservation.date.toString().slice(0, 10)),
                  'dd.MM.yyyy.'
                )}
              </b>
            </div>
          ) : (
            <div className="text-sm w-[70%] ">
              You do not have any reservations.
            </div>
          )}
        </div>
        <div className="mt-4">
          <button className="border-solid border-gray-300 border-[1px] w-full cursor-pointer rounded-lg text-sm font-semibold py-[6px]">
            {nextReservation ? (
              <div
                onClick={() =>
                  navigate(`/my-reservations/${nextReservation.id}`)
                }
              >
                See reservation
              </div>
            ) : (
              <div onClick={() => navigate('/my-reservations')}>
                Check previous ones
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NextReservation;
