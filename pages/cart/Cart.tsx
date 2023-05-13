import React from 'react';

import {Flex, Button} from '@webshop/components';

import {CartItemCard, Header, PaymentSummary} from './components';

import {useCart, useWindow} from '@webshop/hooks';

import type {CartItem} from '@webshop/models/Cart';


const Cart: React.FC = () => {

  const {items, clear, add, remove} = useCart();

  const {isMobile} = useWindow();

  const onClickClear = async (): Promise<boolean> => clear();

  const onClickPlus = async (item: CartItem): Promise<boolean> => add(item.variant, 1);

  const onClickMinus = async (item: CartItem): Promise<boolean> => {
    if (item.quantity == 1) return remove(item);
    return add(item.variant, -1)
  };

  return (
    <Flex flexDirection='column' alignSelf='center' width="100%">
    
      <Header showClearButton={items.length > 0} onClickClear={onClickClear} />

      <Flex flexDirection={isMobile ? 'column' : 'row'} gap="10%">
        <Flex flexDirection='column' minWidth="45%">
          {items.map((item: CartItem, index: number): JSX.Element => (
            <CartItemCard
              key={index}
              item={item}
              onClickMinus={() => onClickMinus(item)}
              onClickPlus={() => onClickPlus(item)}
            />
          ))}
        </Flex>
        <PaymentSummary items={items}>
          <Button title='Fizetés' />
        </PaymentSummary>
      </Flex>
    </Flex>
  );
};

export default Cart;