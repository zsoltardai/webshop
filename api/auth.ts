import client from './client';


const endpoint: string = 'auth';

export const login = (params: any) => {
  return client.post(
    `${endpoint}/login`,
    params,
  );
};

export const register = (params: any)  => {
  return client.post(
    `${endpoint}/register`,
    params,
  );
};
