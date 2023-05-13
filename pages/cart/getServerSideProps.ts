import type {GetServerSideProps} from 'next/types';

import {requireAuth} from '@webshop/utils/auth';


const getServerSideProps: GetServerSideProps = async (context) => {

  await requireAuth(context);

  return {props: {}};
};

export default getServerSideProps;
