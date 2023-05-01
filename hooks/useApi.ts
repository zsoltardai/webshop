import {useEffect, useState} from 'react';


type UseApi = <T,>(fetcher: (params?: Object) => Promise<T>, init?: boolean) => {
  data?: T;
  get: VoidFunction;
  loading: boolean;
  error?: string;
};

const useApi: UseApi = (fetcher, init = true) => {

  const [loading, setLoading] = useState<boolean>(true);

  const [data, setData] = useState<any | undefined>();

  const [error, setError] = useState<string | undefined>();

  const getHandler: VoidFunction = async () => {

    setLoading(true);

    try {

      const response = await fetcher();

      setData(response);

    } catch (error: any) {

      setError(error.message);

    } finally {
      setLoading(false);
    }
  };

  useEffect(
    (): void => {
      if (!init) return;
      getHandler();
    },
    [],
  );

  return {
    data,
    get: getHandler,
    loading,
    error,
  };
};

export default useApi;
