import {PrismaClient} from '@prisma/client';

import {getProducts, productsQuery} from '../api/products';


const getServerSideProps = async () => {

  const client = new PrismaClient();

  let products;

  try {
    products = await client.product.findMany({
      take: 4,
      ...productsQuery,
    });
  } catch(error: any) {
    return {
      props: {
        products: [],
      },
    };
  }

  return {
    props: {
      products: getProducts(products),
    },
  };
};

export default getServerSideProps;
