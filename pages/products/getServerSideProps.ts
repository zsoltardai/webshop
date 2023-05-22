import type {GetServerSidePropsResult} from 'next';

import {getProducts, productsQuery} from '@webshop/pages/api/products';

import {client} from '@webshop/prisma/client'

import {client as redis} from '@webshop/redis';

import type {Product} from '@webshop/models';

import hash from '@webshop/utils/hash';


type Props = {products: Product[]; hasMore: boolean};

export default async (): Promise<GetServerSidePropsResult<Props>> => {

  let response;

  const key: string = await hash(JSON.stringify({path: '/products', prefetch: true}));

  const cache: string | null = await redis.get(key);

  if (cache) response = JSON.parse(cache);

  if (!cache) {
    try {
      const products = await client.product.findMany({take: 4, ...productsQuery});
  
      const count = await client.product.count();

      response = {
        products: getProducts(products),
        hasMore: products.length < count,
      };

      await redis.set(key, JSON.stringify(response), 'EX', 600000);

    } catch(error: any) {
      return {
        props: {
          products: [],
          hasMore: false,
        },
      };
    }
  }

  return {props: response};
};
