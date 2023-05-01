import {getCategory} from '@webshop/api/categories';
import useApi from './useApi';


type UseCategory = (id: string) => {
  category?: any;
  loading: boolean;
  error?: string;
  getCategory: VoidFunction;
};

const useCategory: UseCategory = (id) => {

  const fetcher = async (): Promise<any> => getCategory(id);

  const {data: category, loading, error, get: getHandler} = useApi<any>(fetcher);

  return {
    category,
    loading,
    error,
    getCategory: getHandler,
  };
};

export default useCategory;
