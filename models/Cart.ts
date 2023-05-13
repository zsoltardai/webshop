import Variant from './Variant';


export type CartItem = {
  id: number;
  variant: Variant;
  quantity: number;
};

export type AddCartItemParams = {
  variantId: number;
  quantity: number;
};

export type UpdateCartItemParams = {
  id: number;
  quantity: number;
};
