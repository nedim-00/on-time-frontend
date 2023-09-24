import { useSelector } from 'react-redux';
import { UserState } from '../../features/auth/userSlice';
import { RootState } from '../../store';
import { InputWithIcon } from '../../components/InputWithIcon/InputWithIcon';
import { useState } from 'react';
import { TwButton } from '../../components/TwButton/TwButton';
import {
  ToastHelper,
  ToastMessageType,
  ToastType,
} from '../../helpers/ToastHelper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import api from '../../helpers/api/api.factory';
import { Divider } from '../../components/Divider/Divider';

const Profile = () => {
  const loggedUser: UserState = useSelector((state: RootState) => state.auth);
  const [firstName, setFirstName] = useState(loggedUser.user.firstName);
  const [lastName, setLastName] = useState(loggedUser.user.lastName);
  const email = loggedUser.user.email;
  const [image, setImage] = useState(loggedUser.user.image || '');
  const [phoneNumber, setPhoneNumber] = useState(
    loggedUser.user.phoneNumber || ''
  );

  const navigate = useNavigate();

  const { mutate } = useMutation(
    () =>
      api.fetch<any>('update_user', {
        id: loggedUser.user.id,
        firstName,
        lastName,
        image: image === '' ? null : image,
        phoneNumber: phoneNumber === '' ? null : phoneNumber,
      }),

    {
      onSuccess: (res: any) => {
        ToastHelper.showToast(
          'Information updated successfully',
          ToastType.SUCCESS,
          ToastMessageType.CUSTOM
        );
        navigate('/dashboard');
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate();
  };

  return (
    <>
      <div className="pb-4 px-6 ">
        <div className="mb-4 md:mb-6 my-8">
          <h2 className="text-2xl">Profile</h2>
          <p className="hidden md:block text-sm text-gray-500">
            Easily view and edit your information.
          </p>
        </div>

        <div className="bg-[#fcfbfe] flex py-4 rounded-2xl w-full md:w-[500px] pl-6">
          <div className="">
            {loggedUser.user.image !== null ? (
              <img
                src={loggedUser.user.image}
                alt=""
                className="h-20 w-20 rounded-lg md:shadow-sm object-cover "
              />
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className=" bg-white rounded-lg h-20 w-20  md:shadow-sm "
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6 8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8C18 11.3137 15.3137 14 12 14C8.68629 14 6 11.3137 6 8Z"
                    fill="#00cc9c"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.43094 16.9025C7.05587 16.2213 9.2233 16 12 16C14.771 16 16.9351 16.2204 18.5586 16.8981C20.3012 17.6255 21.3708 18.8613 21.941 20.6587C22.1528 21.3267 21.6518 22 20.9592 22H3.03459C2.34482 22 1.84679 21.3297 2.0569 20.6654C2.62537 18.8681 3.69119 17.6318 5.43094 16.9025Z"
                    fill="#00cc9c"
                  ></path>
                </g>
              </svg>
            )}
          </div>

          <div className="flex justify-center flex-col ml-4">
            <div className="text-2xl font-medium ">
              {loggedUser.user.firstName} {loggedUser.user.lastName}
            </div>
            <div className="text-gray-500 text-sm">{loggedUser.user.email}</div>
          </div>
        </div>

        <form
          className="bg-[#fcfbfe] rounded-2xl w-full md:w-[500px] mt-4 px-6 py-4"
          onSubmit={handleSubmit}
        >
          <div className="text-xl font-medium mb-3 mt-1">
            Update your information
          </div>
          <Divider />

          <div className="py-3">
            <div className="flex w-full justify-between">
              <div className="w-[48%]">
                <h4 className="text-gray-500 text-sm pb-1">First Name</h4>
                <InputWithIcon
                  type="text"
                  name="first name"
                  placeholder="First Name"
                  className="block w-10 p-4 "
                  required
                  value={firstName}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setFirstName(event.target.value)
                  }
                  inputBaseClasses="text-gray-900 border-gray-300 bg-gray-50  text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  inputErrorClasses="border-red-500"
                  inputSuccessClasses="border-gray-300"
                  labelBaseClasses="text-gray-300"
                  labelErrorClasses="text-red-500"
                  labelSuccessClasses="text-gray-500"
                  inputSizing="py-4 px-4"
                />
              </div>
              <div className="w-[48%]">
                <h4 className="text-gray-500 text-sm pb-1">Last Name</h4>
                <InputWithIcon
                  type="text"
                  name="last name"
                  placeholder="Last Name"
                  className="block p-4 "
                  required
                  value={lastName}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setLastName(event.target.value)
                  }
                  inputBaseClasses="text-gray-900 border-gray-300 bg-gray-50  text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  inputErrorClasses="border-red-500"
                  inputSuccessClasses="border-gray-300"
                  labelBaseClasses="text-gray-300"
                  labelErrorClasses="text-red-500"
                  labelSuccessClasses="text-gray-500"
                  inputSizing="py-4 px-4"
                />
              </div>
            </div>

            <h4 className="text-gray-500 text-sm pb-1 mt-2">Email</h4>
            <InputWithIcon
              type="email"
              name="email"
              placeholder="Email"
              className="block p-4 disabled:bg-gray-white"
              required
              value={email}
              disabled={true}
              inputBaseClasses="text-gray-900 border-gray-300 bg-gray-50  text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              inputErrorClasses="border-red-500"
              inputSuccessClasses="border-gray-300"
              labelBaseClasses="text-gray-300"
              labelErrorClasses="text-red-500"
              labelSuccessClasses="text-gray-500"
              inputSizing="py-4 px-4"
            />

            <h4 className="text-gray-500 text-sm pb-1 mt-2">Phone number</h4>
            <InputWithIcon
              type="number"
              name="phone number"
              placeholder="Phone number"
              className="block p-4 "
              value={phoneNumber}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setPhoneNumber(event.target.value)
              }
              inputBaseClasses="text-gray-900 border-gray-300 bg-gray-50  text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              inputErrorClasses="border-red-500"
              inputSuccessClasses="border-gray-500"
              labelBaseClasses="text-gray-900"
              labelErrorClasses="text-red-500"
              labelSuccessClasses="text-gray-500"
              inputSizing="py-4 px-4"
            />

            <h4 className="text-gray-500 text-sm pb-1 mt-2">Profile image</h4>
            <InputWithIcon
              type="text"
              name="profile image"
              placeholder="Image Url"
              className="block p-4 "
              value={image}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setImage(event.target.value)
              }
              inputBaseClasses="text-gray-900 border-gray-300 bg-gray-50  text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              inputErrorClasses="border-red-500"
              inputSuccessClasses="border-gray-500"
              labelBaseClasses="text-gray-900"
              labelErrorClasses="text-red-500"
              labelSuccessClasses="text-gray-500"
              inputSizing="py-4 px-4"
            />

            <TwButton
              variation="primary"
              color="#046C4E"
              className="mt-4"
              type="submit"
            >
              Save changes
            </TwButton>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
