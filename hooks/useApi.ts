import {useEffect, useState} from 'react';

import Meta from '@webshop/models/Meta';


type UseApi = <T,>(props: {fetcher: (props?: {params?: Object, meta?: Meta}) => Promise<T>, prefetch?: T}) => {
  data?: T;
  get: VoidFunction;
  refetch: (props?: {params?: Object; meta?: Meta}) => void;
  mutate: (data: T) => void;
  loading: boolean;
  refetching: boolean;
  error?: string;
};

const useApi: UseApi = ({fetcher, prefetch = undefined}) => {

  const [loading, setLoading] = useState<boolean>(prefetch ? false : true);

  const [refetching, setRefetching] = useState<boolean>(false);

  const [data, setData] = useState<any | undefined>(prefetch);

  const [error, setError] = useState<string | undefined>();

  const getHandler = async (props?: {params?: Object, meta?: Meta}): Promise<void> => {
    try {
      const response = await fetcher(props);

      setData(
        (prev: any[]) => {
          if (!Array.isArray(response) || data === undefined) return response;

          return [
            ...prev,
            ...response,
          ];
        },
      );
    } catch (error: any) {
      setError(error.message);
    }
  };

  const refetchHandler = async (props?: {meta?: Meta, params?: Object}): Promise<void> => {
    setRefetching(true);

    await getHandler(props);

    setRefetching(false);
  };

  const mutateHandler = (data: any) => setData(data);

  const initHandler = async (): Promise<void> => {
    setLoading(true);
    
    await getHandler();

    setLoading(false);
  };

  useEffect(
    (): void => {
      if (prefetch) return;
      initHandler();
    },
    [],
  );

  return {
    data,
    get: getHandler,
    refetch: refetchHandler,
    mutate: mutateHandler,
    loading,
    refetching,
    error,
  };
};

export default useApi;
