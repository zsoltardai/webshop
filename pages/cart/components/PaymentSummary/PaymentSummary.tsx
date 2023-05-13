import React, { useMemo } from 'react';

import {Card, Text, Flex} from '@webshop/components';

import currencyFormatter from '@webshop/helpers/currencyFormatter';

import type {CartItem} from '@webshop/models/Cart';
import colors from '@webshop/constants/colors';

import styles from './PaymentSummary.module.css';


type Props = {items: CartItem[]; children: JSX.Element};

const PaymentSummary: React.FC<Props> = (props) => {

  const {items, children} = props;

  const subtotal: number = useMemo(
    (): number => {
      return items.reduce(
        (sum: number, item: CartItem): number => {
          return sum + item.variant.price * item.quantity;
        },
        0,
      );
    },
    [
      items
    ],
  );

  const shipping: number = 1800;

  const total: number = subtotal + shipping;

  return (
    <Flex flexDirection='column' flex={1}>
      <Card marginBottom={12}>
        <Flex className={styles.row}>
          <Text variant='small' uppercase>
            Részösszeg:
          </Text>
          <Text>{currencyFormatter(subtotal)}</Text>
        </Flex>
        <Flex className={styles.row}>
          <Text variant='small' uppercase>
            Szállítás:
          </Text>
          <Text>{currencyFormatter(shipping)}</Text>
        </Flex>
        <Flex className={styles.row} marginBottom={0}>
          <Text variant='small' uppercase>
            Összesen:
          </Text>
          <Text variant='bold' color={colors.primary}>
            {currencyFormatter(total)}
          </Text>
        </Flex>
      </Card>
      {children}
    </Flex>
  );
};

export default PaymentSummary;
