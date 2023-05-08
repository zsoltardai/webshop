import {getUser, updateUser} from '@webshop/api-logic/user';

import type {User} from '@webshop/models';

import useApi from './useApi';


type UseUser = () => {
  user?: User;
  update: (user: Partial<User>) => Promise<boolean>;
  loading: boolean;
  error?: string;
};

const useUser: UseUser = () => {

  const fetcher = async (): Promise<User> => getUser();

  const {data: user, mutate, loading, error} = useApi<User>({fetcher});

  const updateHandler = async (body: Partial<User>): Promise<boolean> => {

    try {

      const updatedUser = await updateUser(body);

      mutate(updatedUser);

      return true;
    } catch (error: any) {
      /* need to display error somehow 🤷🏽‍♂️ */
      return false;
    }
  };

  return {
    user,
    update: updateHandler,
    loading,
    error,
  };
};

export default useUser;
