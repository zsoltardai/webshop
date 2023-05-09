import type {GetServerSideProps, GetServerSidePropsContext} from 'next/types';

import {authToken} from '@webshop/constants/cookies';


const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const {req: {cookies}} = context;

  if (cookies[authToken]) return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };

  return {props: {}};
};

export default getServerSideProps;
