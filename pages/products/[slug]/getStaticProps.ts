import type {GetStaticProps} from 'next/types';

import {prefetchProduct} from '@webshop/pages/api/products/[slug]';

import type {Params} from './Product';



const getStaticProps: GetStaticProps = async ({params}) => {

  const {slug} = params as Params;

  const product = await prefetchProduct(slug);

  return {props: {product}};
};

export default getStaticProps;
