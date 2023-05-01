import {getMultiple, getSingle} from './client';


const endpoint: string = 'categories';

export const getCategories = async (): Promise<any> => getMultiple(endpoint);

export const getCategory = async (id: string): Promise<any> => getSingle(endpoint, id);
