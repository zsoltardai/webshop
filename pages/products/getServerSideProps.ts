import {PrismaClient} from '@prisma/client';

import {getProducts, productsQuery} from '../api/products';

import {client as redis} from '@webshop/redis';

import hash from '@webshop/utils/hash';


const getServerSideProps = async () => {

  const client = new PrismaClient();

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

export default getServerSideProps;
