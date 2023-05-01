import {getMultiple, getSingle} from './client';


const endpoint: string = 'products';

export const getProducts = async (): Promise<any> => getMultiple(endpoint);

export const getProduct = async (slug: string): Promise<any> => getSingle(endpoint, slug);
