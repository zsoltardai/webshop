import {getMultiple, getSingle} from './client';


const endpoint: string = 'variants';

export const getVariant = async (id: string): Promise<any> => getSingle(endpoint, id);

export const getVariants = async (): Promise<any> => getMultiple(endpoint);

