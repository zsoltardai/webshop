import {getCategories} from '@webshop/api/categories';
import useApi from './useApi';


type UseCategory = () => {
  categories?: any;
  loading: boolean;
  error?: string;
  getCategory: VoidFunction;
};

const useCategories: UseCategory = () => {

  const fetcher = async (): Promise<any> => getCategories();

  const {data: categories, loading, error, get: getHandler} = useApi<any>(fetcher);

  return {
    categories,
    loading,
    error,
    getCategory: getHandler,
  };
};

export default useCategories;
