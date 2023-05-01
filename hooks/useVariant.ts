import {getVariant} from '@webshop/api/variants';
import useApi from './useApi';

import type {ProductVariant} from '@webshop/models';


type UseVariant = (id: string) => {
  variant?: ProductVariant;
  loading: boolean;
  error?: string;
  getVariant: VoidFunction;
};

const useVariant: UseVariant = (id) => {

  const fetcher = async (): Promise<ProductVariant> => getVariant(id);

  const {data: variant, loading, error, get: getHandler} = useApi<ProductVariant>(fetcher);

  return {
    variant,
    loading,
    error,
    getVariant: getHandler,
  };
};

export default useVariant;
