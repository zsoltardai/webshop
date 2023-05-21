import client from './client';

import type {User} from '@webshop/models';


const endpoint: string = 'user';

const get = async (token?: string): Promise<User> => {

  if (token) client.setHeader('Authorization', `Bearer ${token}`);

  const response = await client.get(endpoint);

  if (!response.ok) throw new Error(response.data as string);

  return response.data as User;
};


const update = async (body: Partial<User>): Promise<User> => {
  const response = await client.put(endpoint, body);

  if (!response.ok) throw new Error(response.data as string);

  return response.data as User;
};


export default {get, update};
