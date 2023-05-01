import {create, ApisauceInstance} from 'apisauce';


const client: ApisauceInstance = create({
  baseURL: '/api/',
  timeout: 3000,
  headers: {
    Accept: 'application/json',
  },
});

export const getSingle = async (endpoint: string, id: string): Promise<any> => {
  const response = await client.get(`${endpoint}/${id}`);
  if (!response.ok) throw new Error(response.data as string);
  return response.data;
};

export const getMultiple = async (endpoint: string): Promise<any> => {
  const response = await client.get(endpoint);
  if (!response.ok) throw new Error(response.data as string);
  return response.data;
};

export default client;
