import client from './client';

import type {LoginParams, RegisterParams} from '@webshop/models/Auth';


const endpoint: string = 'auth';

const login = async (params: LoginParams): Promise<any> => {
  const response = await client.post<string>(`${endpoint}/login`, params);

  if (!response.ok) throw new Error(response.data as string);

  const token: string = `Bearer ${response.data as string}`;

  client.setHeader('Authorization', token);

  return response.data;
};

const register = async (params: RegisterParams)  => {
  const response = await client.post(`${endpoint}/register`, params);
  
  if (!response.ok) throw new Error(response.data as string);
  
  return response.data;
};

export default {login, register};
