import type {GetServerSidePropsContext} from 'next/types';

import jwt from 'jsonwebtoken';


import {authToken} from '@webshop/constants/cookies';


const SECRET: string = process.env.SECRET as string;

export const sign = (data: Object): string => jwt.sign(data, SECRET);

export const verify = async (text: string): Promise<Object> => {
  try {
    if (!text) return {};

    const [_, token] = text.split(' ');

    return await jwt.verify(token, SECRET);

  } catch (error: any) {
    return {};
  }
};

export const verifyServerSide = async (req: GetServerSidePropsContext['req']): Promise<boolean> => {
  const {cookies} = req;

  const token: string | undefined = cookies[authToken];

  if (!token || !(await verify(token))) return false;

  return true;
};
