import React, { useEffect, useState } from 'react';
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
import { useMutation } from 'react-query';
import api from '../../helpers/api/api.factory';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { RefetchProp } from '../Register/Register';
import Welcome from '../../components/Welcome/Welcome';

const Login = ({ refetch }: RefetchProp) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleSignIn = () => {
    setIsLoading(true);
    setDisabledButton(true);
  };

  const { mutate } = useMutation(
    () =>
      api.fetch<any>('login_user', {
        email,
        password,
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
          setIsLoading(false);
          setDisabledButton(false);
          return loginError(error.response.data.errors);
        }
      },
    }
  );

  const modalState = (state: boolean) => {
    setModalOpen(state);
  };

  const loginError = (message: string) => {
    ToastHelper.showToast(message, ToastType.ERROR, ToastMessageType.CUSTOM);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSignIn();
    mutate();
  };

  useEffect(() => {
    if (TOKEN.get() !== undefined) {
      navigate('/dashboard');
    }
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div>
        <Welcome modalOpen={modalOpen} modalState={modalState} />
      </div>
      <div className="flex flex-col items-center justify-center w-full h-screen px-6 py-8">
        <span className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img
            className="h-60 w-60 mb-4"
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
                  type="email"
                  name="email"
                  placeholder="Your email"
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
              <TwButton
                type="submit"
                variation="primary"
                className="w-full disabled:bg-stone-400"
                color="#147234"
                disabled={disabledButton}
              >
                Sign in
                <ClipLoader size={22} color={'white'} loading={isLoading} />
              </TwButton>
              <div className="text-sm font-light text-gray-500 dark:text-gray-400 flex justify-between items-center">
                <div>
                  Don’t have an account?{' '}
                  <span className="font-medium text-green-600 hover:underline dark:text-green-500">
                    <NavLink to="/register">Sign up here</NavLink>
                  </span>
                </div>
                <div
                  className="bg-gray-200 px-2 py-1 rounded-lg cursor-pointer"
                  onClick={() => modalState(true)}
                >
                  💡
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
