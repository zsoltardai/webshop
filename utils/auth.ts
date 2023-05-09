import type {GetServerSidePropsContext} from 'next/types';

import {verifyServerSide} from './jwt';

export const requireAuth = async ({req}: GetServerSidePropsContext) => {
  if (!await verifyServerSide(req)) return {
    redirect: {
      destination: '/',
      permanent: false,
    }
  };
};
