import {useAppDispatch, useAppSelector} from '@webshop/redux/store';

import {update, get} from '@webshop/redux/features/user';

import type {User} from '@webshop/models';


type UseUser = () => {
  user?: User;
  update: (user: Partial<User>) => Promise<boolean>;
  loading: boolean;
  error?: string;
  refetch: VoidFunction;
};

const useUser: UseUser = () => {

  const dispatch = useAppDispatch();

  const user: User | undefined = useAppSelector(state => state.user.user);

  const loading: boolean = useAppSelector(state => state.user.loading);

  const error: string | undefined = useAppSelector(state => state.user.error);

  const getHandler = async () => dispatch(get());

  const updateHandler = async (user: Partial<User>) => {
    return dispatch(update(user))
    .unwrap()
    .then(() => true)
    .catch(() => false);
  };

  return {
    user,
    loading,
    error,
    update: updateHandler,
    refetch: getHandler,
  };
};

export default useUser;
