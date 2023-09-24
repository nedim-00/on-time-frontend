import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../helpers/api/api.factory';
import { useMutation, useQuery } from 'react-query';
import { ClipLoader } from 'react-spinners';
import search from '../../assets/images/search.svg';
import {
  ToastHelper,
  ToastMessageType,
  ToastType,
} from '../../helpers/ToastHelper';
import axios from 'axios';
import { ReservationStatus } from '../../enums/Reservation';
import { Reservation } from '../../interfaces/IReservation';
import { format, parseISO } from 'date-fns';
import { ModalGeneric } from '../../components/ModalGeneric/ModalGeneric';
import { ApiResponse } from '../../interfaces/IApiResponse';

const ReservationDetails = () => {
  const [reservation, setReservation] = useState<Reservation>();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const handleCancelModal = () => {
    setCancelModal((prevState) => !prevState);
  };

  const { mutate } = useMutation(
    () => api.fetch<any>('cancel_reservation', { id: params.id, status: 2 }),

    {
      onSuccess: (res: any) => {
        ToastHelper.showToast(
          'Reservation cancelled successfully',
          ToastType.SUCCESS,
          ToastMessageType.CUSTOM
        );
        navigate('/my-reservations');
      },
      onError: (error: { response: { data: { errors: string[] } } }) => {
        if (axios.isAxiosError(error)) {
          ToastHelper.showToast(
            error.response.data.errors,
            ToastType.ERROR,
            ToastMessageType.CUSTOM
          );
        }
      },
    }
  );

  const reservationDetailsInfo = useQuery(
    ['get_reservation_details'],
    () => api.fetch('get_reservation_details', { id: params.id }),
    {
      onSuccess: (response: ApiResponse<Reservation>) => {
        setReservation(response.data);
        setLoading(false);
      },
      onError: (error: { response: { data: { errors: string[] } } }) => {
        setNotFound(true);
        setLoading(false);
      },
    }
  );

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

      <ModalGeneric
        size="md"
        isOpen={cancelModal}
        onClose={handleCancelModal}
        position="center"
        modalHeaderClassName="text-center"
        modalFooterClassName="justify-center"
        title="Cancel reservation"
      >
        <div className="text-center">
          <h2>Are you sure you want to cancel reservation?</h2>

          <div className="flex justify-end gap-2 mt-4">
            <button
              className="border-[1px] border-[#D3D3D3] w-20 h-10 text-[#929292] rounded-lg"
              onClick={handleCancelModal}
            >
              Cancel
            </button>
            <button
              className="w-20 h-10 bg-[#FF605C] text-white rounded-lg"
              onClick={() => mutate()}
            >
              Confirm
            </button>
          </div>
        </div>
      </ModalGeneric>
      {notFound && (
        <div className="flex flex-col justify-center mt-24">
          <img src={search} alt="" className="h-44 opacity-50" />
          <p className="text-center text-2xl mt-5 text-gray-400">
            No result found
          </p>
        </div>
      )}
      {!loading && !notFound && (
        <div className="mx-6">
          {' '}
          <div className="mb-4 md:mb-6 my-8 hidden md:block">
            <h2 className="text-2xl">
              {reservation?.restaurant.name} reservation
            </h2>
            <p className="hidden md:block text-sm text-gray-500">
              Check reservation details for {reservation?.restaurant.name}{' '}
              place.
            </p>
          </div>
          <div className="text-left bg-white  lg:flex rounded-b-lg  lg:rounded-xl">
            <div className="h-44 sm:h-64 xl:h-80 lg:h-[300px] lg:order-2 lg:w-[60%] ">
              <img
                src={reservation!.restaurant!.image}
                alt=""
                className="object-cover w-full h-full lg:rounded-r-xl lg:rounded-l-none rounded-b-lg "
              />
            </div>

            <div className="mx-5 mt-3 lg:w-[40%] ">
              <div className="flex justify-between items-center mb-2">
                <div className="title">
                  <div className="title">
                    <h2 className="text-xl">{reservation!.restaurant!.name}</h2>
                  </div>
                  <div className="text-xs pl-2 mb-2 font-normal text-[#9D9D9D]">
                    {reservation!.restaurant!.address},{' '}
                    {reservation!.restaurant!.municipality}
                  </div>
                </div>

                {reservation?.reservationStatus ===
                  ReservationStatus.Cancelled && (
                  <div>
                    <button className="cursor:pointer font-normal  bg-[#FF605C] text-white rounded-lg px-3 text-sm py-2">
                      Cancelled
                    </button>
                  </div>
                )}
              </div>

              <hr />

              <div className="mt-4 flex justify-between lg:justify-start">
                <div>
                  <h3 className="font-normal text-lg">For:</h3>
                  <p className="text-[#9D9D9D] text-xs ml-2 mb-3">
                    {reservation!.numberOfGuests} people
                  </p>
                </div>

                <div className="lg:ml-40">
                  <h3 className="font-normal text-lg ">Date:</h3>
                  <p className="text-[#9D9D9D] text-xs ml-2 mb-3">
                    {format(
                      parseISO(reservation!.date.toString().slice(0, 10)),
                      'dd-MM-yyyy'
                    )}
                    , {reservation!.startTime.slice(0, 5)}
                  </p>
                </div>
              </div>

              <hr />

              <div>
                <h3 className="font-normal text-lg mt-2 pb-2">
                  Special request:
                </h3>

                <p className="text-[#9D9D9D] text-base ml-2 mb-2 pb-4">
                  {reservation?.specialComment !== '' ? (
                    reservation?.specialComment
                  ) : (
                    <span className="mb-4">No special requests</span>
                  )}
                </p>
              </div>

              {reservation?.reservationStatus === ReservationStatus.Active && (
                <>
                  <hr />
                  <div className="flex justify-end items-center mt-2 lg:mt-5">
                    <button
                      onClick={handleCancelModal}
                      className="cursor:pointer font-normal text-lg bg-[#FF605C] mb-3 text-white rounded-lg px-4 py-2"
                    >
                      Cancel reservation
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReservationDetails;
