import {getProduct} from '@webshop/api/products';
import useApi from './useApi';


type UseProduct = (slug: string, init?: boolean) => {
  product?: any;
  loading: boolean;
  getProduct: VoidFunction;
  error: any;
};

const useProduct: UseProduct = (slug, init = false) => {

  const fetcher = async (): Promise<any> => getProduct(slug);

  const {data: product, loading, error, get: getHandler} = useApi<any>(fetcher, init);

  return {
    product,
    loading,
    error,
    getProduct: getHandler,
  };
};

export default useProduct;
