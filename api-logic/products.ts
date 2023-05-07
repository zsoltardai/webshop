import {getMultiple, getSingle} from './client';

import type Meta from '@webshop/models/Meta';
import type {GetProductsResponse} from '@webshop/models/Product';


const endpoint: string = 'products';

export const getProducts = async (meta?: Meta): Promise<GetProductsResponse> => {
  if (!meta) return getMultiple(endpoint);
  const {after, count} = meta;
  const uri: string = `${endpoint}?after=${after}&count=${count}`;
  return getMultiple(uri);
};

export const getProduct = async (slug: string): Promise<any> => getSingle(endpoint, slug);
