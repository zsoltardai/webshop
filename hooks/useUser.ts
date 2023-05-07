import {getUser} from '@webshop/api-logic/user';

import type {User} from '@webshop/models';

import useApi from './useApi';


type UseUser = () => {
  user?: User;
  loading: boolean;
  error?: string;
};

const useUser: UseUser = () => {

  const fetcher = async (): Promise<User> => getUser();

  const {data: user, loading, error} = useApi<User>({fetcher});

  return {
    user,
    loading,
    error,
  };
};

export default useUser;
