import {getVariant} from '@webshop/api/variants';
import useApi from './useApi';

import type {Variant} from '@webshop/models';


type UseVariant = (id: string) => {
  variant?: Variant;
  loading: boolean;
  error?: string;
  getVariant: VoidFunction;
};

const useVariant: UseVariant = (id) => {

  const fetcher = async (): Promise<Variant> => getVariant(id);

  const {data: variant, loading, error, get: getHandler} = useApi<Variant>(fetcher);

  return {
    variant,
    loading,
    error,
    getVariant: getHandler,
  };
};

export default useVariant;
