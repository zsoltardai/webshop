import {useState} from 'react';

import {getProducts} from '@webshop/api-logic/products';
import useApi from './useApi';

import type {Product} from '@webshop/models';


type UseProducts = (props: {prefetch?: Product[], count?: number}) => {
  products?: Product[];
  loading: boolean;
  getProducts: VoidFunction;
  refetch: VoidFunction;
  hasMore?: boolean;
  error?: string;
  refetching: boolean;
};

const useProducts: UseProducts = ({prefetch, count}) => {
  
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetcher = async (): Promise<Product[]> => {
    if (!count) return (await getProducts()).products;

    const {products: _products, meta} = await getProducts({after: products?.length || 0, count});

    const {max} = meta;

    setHasMore(
      (): boolean => {
        if (!max) return false;
        const length: number = products?.length || 0;
        return max <= length;
      },
    );

    return _products;
  };

  const {data: products, loading, refetching, error, get: getHandler, refetch} = useApi<Product[]>({fetcher, prefetch});

  return {
    products,
    loading,
    error,
    getProducts: getHandler,
    hasMore,
    refetch,
    refetching,
  };
};

export default useProducts;
