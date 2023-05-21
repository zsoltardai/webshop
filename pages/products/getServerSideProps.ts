import {PrismaClient} from '@prisma/client';

import {getProducts, productsQuery} from '../api/products';


const getServerSideProps = async () => {

  const client = new PrismaClient();

  let products; let count;

  try {
    products = await client.product.findMany({
      take: 4,
      ...productsQuery,
    });

    count = await client.product.count();
  } catch(error: any) {
    return {
      props: {
        products: [],
        hasMore: false,
      },
    };
  }

  return {
    props: {
      products: getProducts(products),
      hasMore: products.length < count,
    },
  };
};

export default getServerSideProps;
