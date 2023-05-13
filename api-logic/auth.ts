import client from './client';

import type {LoginParams, RegisterParams} from '@webshop/models/Auth';


const endpoint: string = 'auth';

const login = async (params: LoginParams): Promise<string> => {
  const response = await client.post<string>(`${endpoint}/login`, params);

  if (!response.ok) throw new Error(response.data as string);

  const token: string = `Bearer ${response.data as string}`;

  client.setHeader('Authorization', token);

  return response.data as string;
};

const register = async (params: RegisterParams): Promise<boolean>  => {
  const response = await client.post(`${endpoint}/register`, params);
  
  if (!response.ok) throw new Error(response.data as string);
  
  return true;
};

export default {login, register};
