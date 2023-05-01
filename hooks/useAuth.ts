import {useRouter} from 'next/router';

import {RootState, useAppDispatch} from '@webshop/redux/store';
import {logout, login, register} from '@webshop/redux/features/auth'

import {useSelector} from 'react-redux';

import type {RegisterParams, LoginParams} from '@webshop/models/Auth';


type UseAuth = () => {
  register: (params: RegisterParams) => Promise<boolean>;
  login: (params: LoginParams) => Promise<boolean>;
  logout: VoidFunction;
  loading: boolean;
  token?: string;
  error?: string;
  requireAuth: (require: boolean) => void;
};

const useAuth: UseAuth = () => {

  const {replace} = useRouter();

  const dispatch = useAppDispatch();

  const loading = useSelector((state: RootState) => state.auth.loading);

  const token = useSelector((state: RootState) => state.auth.token);

  const error = useSelector((state: RootState) => state.auth.error);

  const loginHandler = async (params: LoginParams): Promise<boolean> => {
    return dispatch(login(params))
    .unwrap()
    .then((result) => true)
    .catch((error) => false)
  };

  const registerHandler = async (params: RegisterParams): Promise<boolean> => {
    return dispatch(register(params))
    .unwrap()
    .then((result) => true)
    .catch((error) => false)
  };

  const logoutHandler = () => dispatch(logout());

  const requireAuthHandler = (require: boolean = false): void => {
    if ((require && !token) || (!require && token)) replace('/');
  };

  return {
    register: registerHandler,
    login: loginHandler,
    logout: logoutHandler,
    loading,
    token,
    error,
    requireAuth: requireAuthHandler,
  };
};

export default useAuth;