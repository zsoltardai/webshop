import client from './client';

import {store} from '@webshop/redux/store';


const endpoint: string = 'user';

export const getUser = async (): Promise<any> => {
  const token: string | undefined = store.getState().auth.token;
  client.setHeader('authorization', `Bearer ${token}`);
  const response = await client.get(endpoint);
  if (!response.ok) throw new Error(response.data as string);
  return response.data;
};
