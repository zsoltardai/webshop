import type {LoginParams, RegisterParams} from '@webshop/models/Auth';


export const defaultLoginParams: LoginParams = {
  email: 'jhon.doe@email.com',
  password: 'Password123@',
};

export const defaultRegisterParams: RegisterParams = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmation: '',
};