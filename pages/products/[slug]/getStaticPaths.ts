import {client} from '@webshop/prisma/client';

import type {GetStaticPaths} from 'next/types';

import type {Params} from './Product';


const getProductSlugs = async (): Promise<Params[]> => {
  try {
    const slugs = await client.product.findMany({select: {slug: true}});

    if (!slugs) return [];

    return slugs;
    
  } catch (error: any) {

    return [];
  }
};

const getStaticPaths: GetStaticPaths = async () => {

  const productSlugs = await getProductSlugs();

  const paths: {params: Params}[] = productSlugs.map(({slug}) => ({params: {slug}}));

  return {fallback: true, paths};
};

export default getStaticPaths;
