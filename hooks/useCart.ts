import {useAppDispatch, useAppSelector} from '@webshop/redux/store';

import type {CartItem} from '@webshop/models/Cart';
import type {Product, Variant} from '@webshop/models';

import {add, clear, remove, update} from '@webshop/redux/features/cart';


type UseCart = () => {
  items: CartItem[];
  loading: boolean;
  error?: any;
  add: (variant: Variant, quantity: number) => Promise<boolean>;
  remove: (item: CartItem) => Promise<boolean>;
  clear: () => Promise<boolean>;
};

const useCart: UseCart = () => {

  const dispatch = useAppDispatch();

  const items = useAppSelector(state => state.cart.items);

  const loading = useAppSelector(state => state.cart.loading);

  const error = useAppSelector(state => state.cart.error);
  
  const addHandler = async (variant: Variant | Product, quantity: number): Promise<boolean> => {
    const {id: variantId} = variant;

    const item = items.find(item => item.variant.id === variantId);

    if (!item) {
      return dispatch(add({variantId, quantity}))
      .unwrap()
      .then(() => true)
      .catch(() => false);
    }

    return dispatch(update({id: item.id, quantity: item.quantity + quantity}))
      .unwrap()
      .then(() => true)
      .catch(() => false);
  };  

  const removeHandler = async (item: CartItem): Promise<boolean> => {
    return dispatch(remove(item.id))
    .unwrap()
    .then(() => true)
    .catch(() => false);
  };

  const clearHandler = async (): Promise<boolean> => {
    return dispatch(clear())
    .unwrap()
    .then(() => true)
    .catch(() => false);
  };

  return {
    items,
    loading,
    error,
    add: addHandler,
    remove: removeHandler,
    clear: clearHandler,
  };
};

export default useCart;
