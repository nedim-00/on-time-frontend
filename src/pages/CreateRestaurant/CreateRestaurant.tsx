import React, { useState } from 'react';
import { Divider } from '../../components/Divider/Divider';
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
import closeButton from '../../assets/images/restaurant/deletetable.png';
import { useNavigate } from 'react-router';
import { ClipLoader } from 'react-spinners';
import { UserState } from '../../features/auth/userSlice';
import {
  MenuItem,
  Restaurant,
  Table,
} from '../../interfaces/IRestaurantDetails';
import enumKeys, { formatStringToEnum } from '../../helpers/key-list';
import { City } from '../../enums/City';
import { Municipality } from '../../enums/Municipality';
import { MenuItemCategory } from '../../enums/MenuItemCategory';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ApiResponse } from '../../interfaces/IApiResponse';

const CreateRestaurant = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [municipality, setMunicipality] = useState<Municipality | null>(
    Municipality.Centar
  );
  const [city, setCity] = useState<City>(City.Sarajevo);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<MenuItemCategory>(
    MenuItemCategory.Beverage
  );
  const [image, setImage] = useState('');
  const [openTime, setOpenTime] = useState<string>('');
  const [closeTime, setCloseTime] = useState<string>('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [itemImage, setItemImage] = useState('');
  const [capacity, setCapacity] = useState<number>(0);
  const [tables, setTables] = useState<Table[]>([]);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);

  const loggedUser: UserState = useSelector((state: RootState) => state.auth);

  const addMenuItem = () => {
    if (itemName === '' || price === '' || itemImage === '') {
      ToastHelper.showToast(
        'Provide all details for menu item.',
        ToastType.ERROR,
        ToastMessageType.CUSTOM
      );
    } else {
      const newItem: MenuItem = {
        name: itemName,
        price: parseInt(price),
        category,
        image: itemImage,
      };

      setMenuItems((menuItems) => [...menuItems, newItem]);
      setItemName('');
      setPrice('');
      setCategory(MenuItemCategory.Beverage);
      setItemImage('');
    }
  };

  const addTable = () => {
    if (capacity === 0) {
      ToastHelper.showToast(
        'Tables cannot have 0 seats.',
        ToastType.ERROR,
        ToastMessageType.CUSTOM
      );
    } else {
      const newTable: Table = {
        capacity,
      };
      setTables((tables) => [...tables, newTable]);
      setCapacity(0);
    }
  };

  const deleteTable = (tableIndex: number) => {
    setTables((tables) =>
      tables.filter((table, index) => index !== tableIndex)
    );
  };

  const navigate = useNavigate();

  const { mutate } = useMutation(
    () =>
      api.fetch<any>('create_restaurant', {
        name,
        description,
        image,
        phoneNumber,
        address,
        city,
        municipality,
        openTime: openTime.concat(':00'),
        closeTime: closeTime.concat(':00'),
        userId: loggedUser.user.id,
        menus: [
          {
            name: `${name}Menu`,
            menuItems: menuItems,
          },
        ],
        tables,
      }),

    {
      onSuccess: (res: any) => {
        ToastHelper.showToast(
          'Restaurant created successfully',
          ToastType.SUCCESS,
          ToastMessageType.CUSTOM
        );
        navigate('/dashboard');
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          ToastHelper.showToast(
            error.message,
            ToastType.ERROR,
            ToastMessageType.CUSTOM
          );
        }
      },
    }
  );

  const deleteMenuItem = (menuIndex: number) => {
    setMenuItems((items) =>
      menuItems.filter((item, index) => index !== menuIndex)
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate();
  };

  const handleSelectMenuItemTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(
      MenuItemCategory[event.target.value as keyof typeof MenuItemCategory]
    );
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

  const restaurantsInfo = useQuery(
    ['get_owned_restaurants'],
    () => api.fetch('get_owned_restaurants', {}),
    {
      onSuccess: (response: ApiResponse<Restaurant[]>) => {
        if (response.data.length > 0) {
          setIsOwner(true);
        }
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
          loading={loading}
          className="mt-28 "
        />
      </div>

      {isOwner && !loading && loggedUser.user.userRole === 2 && (
        <div className="h-full mx-6">
          <div className=" my-8 ">
            <h2 className="text-2xl">Add a restaurant</h2>
          </div>
          <div className="flex flex-col justify-center items-center h-full lg:mt-24 ">
            <p className="text-center text-2xl h-full  lg:mt-5 text-gray-400">
              Your subscription does not allow to have more than one restaurant!
            </p>
          </div>
        </div>
      )}
      {!isOwner && !loading && (
        <div className="flex justify-center sm:justify-start sm:mt-3">
          <form
            className="mx-6 my-5 flex flex-col gap-4 max-w-[500px] w-full"
            onSubmit={handleSubmit}
          >
            <div>
              <h2 className="text-2xl">Add restaurant</h2>
              <p className="hidden md:block text-sm text-gray-500">
                The spotlight is waiting for your restaurant.
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

            <h2 className="text-2xl text-left   text-black">Add tables</h2>

            <Divider />

            {tables.map((item, index) => (
              <div
                key={index}
                className=" flex  gap-3 p-2 border border-solid border-[#d2d2d2] rounded-lg text-left"
              >
                <div className="p-2 w-[90%] bg-white rounded-lg  border border-solid border-gray-300 flex flex-row justify-between">
                  <p>Table {index + 1} capacity: </p>
                  <p>{item.capacity}</p>
                </div>

                <div
                  className="self-center justify-center"
                  onClick={() => deleteTable(index)}
                >
                  <img src={closeButton} className="w-4 h-4" alt="" />
                </div>
              </div>
            ))}

            <div className="flex">
              <InputWithIcon
                name="table"
                type="number"
                value={capacity.toString()}
                onChange={(e) => setCapacity(e.target.valueAsNumber)}
                placeholder="Table capacity"
                inputBaseClasses=" text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                inputErrorClasses="border-red-500"
                inputSuccessClasses="border-green-500"
                labelBaseClasses="text-gray-900"
                labelErrorClasses="text-red-500"
                labelSuccessClasses="text-green-500"
                inputSizing="py-4 px-4"
              />

              <TwButton
                variation="primary"
                color="#046C4E"
                onClick={addTable}
                type="button"
                className="w-[60%] ml-2 whitespace-nowrap"
              >
                Add table
              </TwButton>
            </div>

            <Divider />

            <h2 className="text-2xl text-left  text-black">Create menu</h2>

            <Divider />

            <div className="flex flex-col gap-3">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className=" flex flex-col gap-3 p-2 border border-solid border-[#d2d2d2] rounded-lg text-left"
                >
                  <div className="p-2 bg-white rounded-lg  border border-solid border-gray-300">
                    <p>{item.name}</p>
                  </div>
                  <div className="p-2 bg-white rounded-lg  border border-solid border-gray-300 flex flex-row justify-between">
                    <p>{item.price}</p>
                    <p>KM</p>
                  </div>
                  <div className="p-2 bg-white rounded-lg  border border-solid border-gray-300">
                    <p>{enumKeys(MenuItemCategory)[item.category - 1]}</p>
                  </div>
                  <div className=" flex justify-between items-center">
                    <img
                      src={item.image}
                      alt="menu item url"
                      className="rounded-lg w-[80px] h-[80px] object-fill"
                    />

                    <div onClick={() => deleteMenuItem(index)}>
                      <img className="w-10 h-10 " src={closeButton} alt="" />
                    </div>
                  </div>
                </div>
              ))}
              <InputWithIcon
                name="Name"
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Name"
                inputBaseClasses=" text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                inputErrorClasses="border-red-500"
                inputSuccessClasses="border-green-500"
                labelBaseClasses="text-gray-900"
                labelErrorClasses="text-red-500"
                labelSuccessClasses="text-green-500"
                inputSizing="py-4 px-4"
              />

              <InputWithIcon
                name="price"
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                inputBaseClasses=" text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                inputErrorClasses="border-red-500"
                inputSuccessClasses="border-green-500"
                labelBaseClasses="text-gray-900"
                labelErrorClasses="text-red-500"
                labelSuccessClasses="text-green-500"
                inputSizing="py-4 px-4"
              />
              <Select
                label="Select item category"
                options={enumKeys(MenuItemCategory).map((enumKey) => {
                  return { value: enumKey, label: enumKey };
                })}
                value={enumKeys(MenuItemCategory)[category - 1]}
                onChange={handleSelectMenuItemTypeChange}
              />

              <div className=" flex justify-between items-center">
                <div className="w-[70%]">
                  <InputWithIcon
                    name="itemimage"
                    type="text"
                    value={itemImage}
                    onChange={(e) => setItemImage(e.target.value)}
                    placeholder="Item image url"
                    inputBaseClasses=" text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                    inputErrorClasses="border-red-500"
                    inputSuccessClasses="border-green-500"
                    labelBaseClasses="text-gray-900"
                    labelErrorClasses="text-red-500"
                    labelSuccessClasses="text-green-500"
                    inputSizing="py-4 px-4"
                  />
                </div>

                <TwButton
                  variation="primary"
                  color="#046C4E"
                  onClick={addMenuItem}
                  type="button"
                  className="w-32"
                >
                  Add item
                </TwButton>
              </div>
            </div>

            <Divider />
            <TwButton variation="primary" color="#046C4E" type="submit">
              Save restaurant
            </TwButton>
          </form>
        </div>
      )}
    </>
  );
};

export default CreateRestaurant;
