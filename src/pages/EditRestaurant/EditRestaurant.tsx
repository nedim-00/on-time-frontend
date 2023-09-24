import React, { useState } from 'react';
import { InputWithIcon } from '../../components/InputWithIcon/InputWithIcon';
import api from '../../helpers/api/api.factory';
import { useMutation, useQuery } from 'react-query';
import {
  ToastHelper,
  ToastMessageType,
  ToastType,
} from '../../helpers/ToastHelper';
import axios from 'axios';
import Select from '../../components/Select/Select';
import { Label } from '../../components/Label/Label';
import { TwButton } from '../../components/TwButton/TwButton';
import { useNavigate, useParams } from 'react-router';
import { ClipLoader } from 'react-spinners';
import { UserState } from '../../features/auth/userSlice';

import enumKeys, { formatStringToEnum } from '../../helpers/key-list';
import { City } from '../../enums/City';
import { Municipality } from '../../enums/Municipality';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Divider } from '../../components/Divider/Divider';
import { Restaurant } from '../../interfaces/IRestaurantDetails';
import { ApiResponse } from '../../interfaces/IApiResponse';

const EditRestaurant = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [municipality, setMunicipality] = useState<Municipality | null>(
    Municipality.Centar
  );
  const [city, setCity] = useState<City>(City.Sarajevo);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [openTime, setOpenTime] = useState<string>('');
  const [closeTime, setCloseTime] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const loggedUser: UserState = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();
  const params = useParams();

  const { mutate } = useMutation(
    () =>
      api.fetch<any>('edit_restaurant', {
        id: params.id,
        name,
        address,
        city,
        municipality,
        phoneNumber,
        description,
        image,
        openTime: openTime.concat(':00'),
        closeTime: closeTime.concat(':00'),
        userId: loggedUser.user.id,
      }),

    {
      onSuccess: (res: any) => {
        ToastHelper.showToast(
          'Restaurant edited successfully',
          ToastType.SUCCESS,
          ToastMessageType.CUSTOM
        );
        navigate('/edit-restaurant');
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

  const restaurantsInfo = useQuery(
    ['get_restaurant'],
    () => api.fetch('get_restaurant', { id: params.id }),
    {
      onSuccess: (response: ApiResponse<Restaurant>) => {
        setName(response.data.name);
        setAddress(response.data.address);
        setPhoneNumber(response.data.phoneNumber);
        setDescription(response.data.description);
        setImage(response.data.image);
        setOpenTime(response.data.openTime.slice(0, 5));
        setCloseTime(response.data.closeTime.slice(0, 5));
        setCity(response.data.city);
        setMunicipality(response.data.municipality);

        setLoading(false);
      },
      onError: (err) => {
        setLoading(false);
      },
    }
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate();
  };

  const handleSelectCity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'Sarajevo') {
      setCity(
        City[formatStringToEnum(event.target.value) as keyof typeof City]
      );
      setMunicipality(Municipality.Centar);
    } else {
      setMunicipality(null);
      setCity(
        City[formatStringToEnum(event.target.value) as keyof typeof City]
      );
    }
  };

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

      {!loading && (
        <div className="flex justify-center sm:justify-start sm:mt-3">
          <form
            className="mx-6 my-5 flex flex-col gap-4 max-w-[500px] w-full"
            onSubmit={handleSubmit}
          >
            <div>
              <h2 className="text-2xl">Edit restaurant</h2>
              <p className="hidden md:block text-sm text-gray-500">
                Enhance your restaurant details to capture more attention.
              </p>
            </div>

            <Divider />
            <div className="flex flex-col gap-5">
              <InputWithIcon
                type="text"
                name="name"
                placeholder="Name"
                className="block w-full p-4 "
                required
                value={name}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setName(event.target.value)
                }
                inputBaseClasses="text-gray-900 border-gray-300 bg-gray-50  text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                inputErrorClasses="border-red-500"
                inputSuccessClasses="border-green-500"
                labelBaseClasses="text-gray-900"
                labelErrorClasses="text-red-500"
                labelSuccessClasses="text-green-500"
                inputSizing="py-4 px-4"
              />
              <InputWithIcon
                type="text"
                name="Address"
                placeholder="Address"
                className="block w-full p-4"
                required
                value={address}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setAddress(event.target.value)
                }
                inputBaseClasses="text-gray-900 border-gray-300 bg-gray-50  text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                inputErrorClasses="border-red-500"
                inputSuccessClasses="border-green-500"
                labelBaseClasses="text-gray-900"
                labelErrorClasses="text-red-500"
                labelSuccessClasses="text-green-500"
                inputSizing="py-4 px-4"
              />
              <InputWithIcon
                type="number"
                name="Phone number"
                placeholder="Phone number"
                className="block w-full p-4 "
                required
                value={phoneNumber}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setPhoneNumber(event.target.value)
                }
                inputBaseClasses="text-gray-900 border-gray-300 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                inputErrorClasses="border-red-500"
                inputSuccessClasses="border-green-500"
                labelBaseClasses="text-gray-900"
                labelErrorClasses="text-red-500"
                labelSuccessClasses="text-green-500"
                inputSizing="py-4 px-4"
              />
              <textarea
                name="description"
                placeholder="Description"
                className=" py-4 px-3 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                required
                value={description}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setDescription(event.target.value)
                }
                rows={5}
              />
              <Select
                label="Select city"
                options={enumKeys(City).map((enumKey) => {
                  return { value: enumKey, label: enumKey };
                })}
                value={enumKeys(City)[city - 1]}
                onChange={(event) => handleSelectCity(event)}
              />

              {city === City.Sarajevo && municipality && (
                <Select
                  label="Select a municipality"
                  options={enumKeys(Municipality).map((enumKey) => {
                    return {
                      value: enumKey,
                      label: enumKey,
                    };
                  })}
                  value={enumKeys(Municipality)[municipality - 1]}
                  onChange={(event) =>
                    setMunicipality(
                      Municipality[
                        formatStringToEnum(
                          event.target.value
                        ) as keyof typeof Municipality
                      ]
                    )
                  }
                />
              )}
            </div>

            <Divider />

            <div>
              <h2 className="text-2xl text-left pb-0 text-black">Work hours</h2>
              <p className=" text-sm text-gray-500">
                Restaurant works on regular days.
              </p>
            </div>

            <Divider />

            <div className="flex justify-between">
              <div className="w-[45%]">
                <Label htmlFor="openTime" className="" text="From:" />
                <InputWithIcon
                  name="openTime"
                  placeholder="Work days from"
                  className="block w-full p-4 "
                  required
                  value={openTime}
                  type="time"
                  id="openTime"
                  inputBaseClasses=" text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  inputErrorClasses="border-red-500"
                  inputSuccessClasses="border-green-500"
                  labelBaseClasses="text-gray-900"
                  labelErrorClasses="text-red-500"
                  labelSuccessClasses="text-green-500"
                  inputSizing="py-4 px-4"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setOpenTime(event.target.value)
                  }
                />
              </div>

              <div className="w-[45%]">
                <Label htmlFor="closeTime" text="To:" />
                <InputWithIcon
                  name="closeTime"
                  placeholder="Work days from"
                  className="block w-full p-4 "
                  required
                  value={closeTime}
                  type="time"
                  id="closeTime"
                  inputBaseClasses=" text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  inputErrorClasses="border-red-500"
                  inputSuccessClasses="border-green-500"
                  labelBaseClasses="text-gray-900"
                  labelErrorClasses="text-red-500"
                  labelSuccessClasses="text-green-500"
                  inputSizing="py-4 px-4"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setCloseTime(event.target.value)
                  }
                />
              </div>
            </div>

            <Divider />

            <h2 className="text-2xl text-left  text-black">Restaurant image</h2>

            <Divider />

            <div>
              <InputWithIcon
                type="text"
                name="image"
                placeholder="Image url"
                className="block w-full p-4 "
                required
                value={image}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setImage(event.target.value)
                }
                inputBaseClasses=" text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                inputErrorClasses="border-red-500"
                inputSuccessClasses="border-green-500"
                labelBaseClasses="text-gray-900"
                labelErrorClasses="text-red-500"
                labelSuccessClasses="text-green-500"
                inputSizing="py-4 px-4"
              />
            </div>

            <Divider />

            <TwButton variation="primary" color="#046C4E" type="submit">
              Save changes
            </TwButton>
          </form>
        </div>
      )}
    </>
  );
};

export default EditRestaurant;
