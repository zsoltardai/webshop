import {getProducts} from '@webshop/api/products';
import useApi from './useApi';

import type {Product} from '@webshop/models';

type UseProducts = () => {
  products?: any;
  loading: boolean;
  getProducts: VoidFunction;
  error?: string;
};

const useProducts: UseProducts = () => {

  const fetcher = async (): Promise<Product> => await getProducts();

  const {data: products, loading, error, get: getHandler} = useApi<Product>(fetcher);

  return {
    products,
    loading,
    error,
    getProducts: getHandler,
  };
};

export default useProducts;
