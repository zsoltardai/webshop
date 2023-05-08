import type {LoginParams, RegisterParams} from '@webshop/models/Auth';
import type {User} from '@webshop/models';


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

export const defaultEditUser: User = {
  firstName: '',
  lastName: '',
  email: '',
};