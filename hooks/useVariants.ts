import {getVariants} from '@webshop/api/variants';
import useApi from './useApi';

import type {Variant} from '@webshop/models';

type UseVariants = () => {
  variants?: Variant[];
  loading: boolean;
  error?: string;
  getVariants: VoidFunction;
};

const useVariants: UseVariants = () => {

  const fetcher = async (): Promise<Variant[]> => getVariants();

  const {data: variants, loading, error, get: getHandler} = useApi<Variant[]>(fetcher);

  return {
    variants,
    loading,
    error,
    getVariants: getHandler,
  };
};

export default useVariants;
