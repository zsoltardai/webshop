import client from './client';

import type {AddCartItemParams, CartItem, UpdateCartItemParams} from '@webshop/models/Cart';


const endpoint: string = 'cart';


const getAll = async (token: string): Promise<CartItem[]> => {

  client.setHeader('Authorization', `Bearer ${token}`);

  const response = await client.get(endpoint);

  if (!response.ok) throw new Error(response.data as string);

  return response.data as CartItem[];
};

const add = async (params: AddCartItemParams): Promise<CartItem> => {

  const response = await client.post(endpoint, params);

  if (!response.ok) throw new Error(response.data as string);

  return response.data as CartItem;
};

const clear = async (): Promise<boolean> => {

  const response = await client.delete(endpoint);

  if (!response.ok) throw new Error(response.data as string);

  return true;
};

const remove = async (id: number): Promise<number> => {

  const response = await client.delete(`${endpoint}/${id}`);

  if (!response.ok) throw new Error(response.data as string);

  return id;
};

const update = async (params: UpdateCartItemParams): Promise<CartItem> => {

  const {id, quantity} = params;

  const response = await client.put(`${endpoint}/${id}`, {quantity});

  if (!response.ok) throw new Error(response.data as string);

  return response.data as CartItem;
};

export default {getAll, add, clear, remove, update};
