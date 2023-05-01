import {getVariants} from '@webshop/api/variants';
import useApi from './useApi';


type UseVariants = () => {
  variants?: any;
  loading: boolean;
  error?: string;
  getVariants: VoidFunction;
};

const useVariants: UseVariants = () => {

  const fetcher = async (): Promise<any> => getVariants();

  const {data: variants, loading, error, get: getHandler} = useApi<any>(fetcher);

  return {
    variants,
    loading,
    error,
    getVariants: getHandler,
  };
};

export default useVariants;
