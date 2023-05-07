import client from './client';

import type {User} from '@webshop/models';


const endpoint: string = 'user';

export const getUser = async (): Promise<User> => {

  const response = await client.get(endpoint);

  if (!response.ok) throw new Error(response.data as string);

  return response.data as User;
};


export const updateUser = async (body: Partial<User>): Promise<User> => {
  const response = await client.put(endpoint, body);

  if (!response.ok) throw new Error(response.data as string);

  return response.data as User;
};
