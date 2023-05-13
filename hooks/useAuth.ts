import {useAppSelector, useAppDispatch} from '@webshop/redux/store';
import {logout, login, register} from '@webshop/redux/features/auth'

import type {RegisterParams, LoginParams} from '@webshop/models/Auth';


type UseAuth = () => {
  register: (params: RegisterParams) => Promise<boolean>;
  login: (params: LoginParams) => Promise<boolean>;
  logout: VoidFunction;
  loading: boolean;
  token?: string;
  error?: string;
};

const useAuth: UseAuth = () => {

  const dispatch = useAppDispatch();

  const loading = useAppSelector((state) => state.auth.loading);

  const token = useAppSelector((state) => state.auth.token);

  const error = useAppSelector((state) => state.auth.error);

  const loginHandler = async (params: LoginParams): Promise<boolean> => {
    return dispatch(login(params))
    .unwrap()
    .then(() => true)
    .catch(() => false)
  };

  const registerHandler = async (params: RegisterParams): Promise<boolean> => {
    return dispatch(register(params))
    .unwrap()
    .then(() => true)
    .catch(() => false)
  };

  const logoutHandler = () => dispatch(logout());

  return {
    register: registerHandler,
    login: loginHandler,
    logout: logoutHandler,
    loading,
    token,
    error,
  };
};

export default useAuth;