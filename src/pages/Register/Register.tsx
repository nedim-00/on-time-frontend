import React, { useState } from 'react';
import {
  ToastHelper,
  ToastMessageType,
  ToastType,
} from '../../helpers/ToastHelper';
import 'react-toastify/dist/ReactToastify.css';
import { InputWithIcon } from '../../components/InputWithIcon/InputWithIcon';
import { TwButton } from '../../components/TwButton/TwButton';
import { NavLink, useNavigate } from 'react-router-dom';
import TOKEN from '../../helpers/api/token';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from 'react-query';
import api from '../../helpers/api/api.factory';
import axios from 'axios';
import { format } from 'date-fns';
import { ClipLoader } from 'react-spinners';
import { UserResponse } from '../../interfaces/IUser';
import { ApiResponse } from '../../interfaces/IApiResponse';

export interface RefetchProp {
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<ApiResponse<UserResponse>, unknown>>;
}

const Register = ({ refetch }: RefetchProp) => {
  const [firstName, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const navigate = useNavigate();

  const notificationError = (message: string) => {
    ToastHelper.showToast(message, ToastType.ERROR, ToastMessageType.CUSTOM);
  };

  const { mutate } = useMutation(
    () =>
      api.fetch<any>('register_user', {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        dateJoined: format(new Date(), 'yyyy-MM-dd'),
      }),
    {
      onSuccess: (res: { data: { token: string } }) => {
        TOKEN.remove();
        TOKEN.set(res.data.token);
        refetch();
        if (TOKEN.get() !== undefined) navigate('/dashboard');
        setIsLoading(false);
        setDisabledButton(false);
      },
      onError: (error: { response: { data: { errors: string[] } } }) => {
        if (axios.isAxiosError(error)) {
          notificationError(error.response.data.errors);
          setIsLoading(false);
          setDisabledButton(false);
        }
      },
    }
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password.length < 8) {
      notificationError('Your password must be at least 8 characters long.');
      return;
    } else if (password !== confirmPassword) {
      notificationError('Passwords do not match.');
      return;
    }

    mutate();
    setIsLoading(true);
    setDisabledButton(true);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-10 lg:py-0">
      <div className="flex flex-col items-center justify-center w-full h-screen px-6 py-8 lg:flex-row">
        <span className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img
            className="h-44 w-44 mb-4 lg:mr-36 lg:h-80 lg:w-80 lg:mb-0"
            src="https://i.ibb.co/g3bhRfQ/logo.png"
            alt="logo"
          />
        </span>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit}
              action="#"
            >
              <div>
                <InputWithIcon
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  required
                  value={firstName}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setName(event.target.value)
                  }
                  inputBaseClasses="text-gray-900 border-gray-300 bg-gray-50"
                  inputErrorClasses="border-red-500"
                  inputSuccessClasses="border-green-500"
                  labelBaseClasses="text-gray-900"
                  labelErrorClasses="text-red-500"
                  labelSuccessClasses="text-green-500"
                  inputSizing="py-4 px-4"
                />
              </div>
              <div>
                <InputWithIcon
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  required
                  value={lastName}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setLastName(event.target.value)
                  }
                  inputBaseClasses="text-gray-900 border-gray-300 bg-gray-50"
                  inputErrorClasses="border-red-500"
                  inputSuccessClasses="border-green-500"
                  labelBaseClasses="text-gray-900"
                  labelErrorClasses="text-red-500"
                  labelSuccessClasses="text-green-500"
                  inputSizing="py-4 px-4"
                />
              </div>
              <div>
                <InputWithIcon
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  required
                  value={email}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(event.target.value)
                  }
                  inputBaseClasses="text-gray-900 border-gray-300 bg-gray-50"
                  inputErrorClasses="border-red-500"
                  inputSuccessClasses="border-green-500"
                  labelBaseClasses="text-gray-900"
                  labelErrorClasses="text-red-500"
                  labelSuccessClasses="text-green-500"
                  inputSizing="py-4 px-4"
                />
              </div>
              <div>
                <InputWithIcon
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  required
                  value={password}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(event.target.value)
                  }
                  inputBaseClasses="text-gray-900 border-gray-300 bg-gray-50"
                  inputErrorClasses="border-red-500"
                  inputSuccessClasses="border-green-500"
                  labelBaseClasses="text-gray-900"
                  labelErrorClasses="text-red-500"
                  labelSuccessClasses="text-green-500"
                  inputSizing="py-4 px-4"
                />
              </div>
              <div>
                <InputWithIcon
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setConfirmPassword(event.target.value)
                  }
                  inputBaseClasses="text-gray-900 border-gray-300 bg-gray-50"
                  inputErrorClasses="border-red-500"
                  inputSuccessClasses="border-green-500"
                  labelBaseClasses="text-gray-900"
                  labelErrorClasses="text-red-500"
                  labelSuccessClasses="text-green-500"
                  inputSizing="py-4 px-4"
                />
              </div>
              <TwButton
                type="submit"
                variation="primary"
                className="w-full disabled:bg-stone-400"
                color="#147234"
                disabled={disabledButton}
              >
                Sign up
                <ClipLoader size={22} color={'white'} loading={isLoading} />
              </TwButton>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Have an account?{' '}
                <span className="font-medium text-green-600 hover:underline dark:text-green-500 hover:cursor-pointer">
                  <NavLink to="/login">Log in here</NavLink>
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
