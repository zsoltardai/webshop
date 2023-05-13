import type {GetServerSidePropsContext} from 'next/types';

import {verifyServerSide} from './jwt';

export const requireAuth = async ({req, res}: GetServerSidePropsContext) => {
  if (!(await verifyServerSide(req))) {
    res.setHeader('location', '/');
    res.statusCode = 302;
    res.end();
    return;
  }
};
