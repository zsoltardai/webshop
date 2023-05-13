import React, { MouseEventHandler } from 'react';

import {Card, Flex, Text} from '@webshop/components';

import {useWindow} from '@webshop/hooks';

import currencyFormatter from '@webshop/helpers/currencyFormatter';

import colors from '@webshop/constants/colors';

import type {CartItem} from '@webshop/models/Cart';
import Image from 'next/image';

import styles from './CartItemCard.module.css';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

type Props = {
  item: CartItem;
  onClickMinus: MouseEventHandler<SVGAElement>;
  onClickPlus: MouseEventHandler<SVGAElement>;
};

const CartItemCard: React.FC<Props> = (props) => {

  const {
    onClickPlus,
    onClickMinus,
    item: {
      quantity,
      variant: {
        name,
        price,
        images,
      },
    },
  } = props;

  const {isMobile} = useWindow();

  return (
    <Card flexDirection='row' marginBottom={12}>
      <Image className={styles.image} alt={name} src={images?.[0] || '/images/empty.png'} width={150} height={100} />
      <Flex flexDirection={isMobile ? 'column' : 'row'} gap={20} flex={1}>
        <Flex flexDirection='column' flex={1}>
          <Text variant='bold' marginBottom={6}>{name}</Text>
          <Text variant='small' color={colors.primary}>
            {currencyFormatter(price)}
          </Text>
        </Flex>
        <Flex justifyContent="center" alignItems="center" flexDirection={isMobile ? 'row' : 'column'}>
          <AiOutlineMinus
            className={styles.button}
            onClick={onClickMinus}
          />

          <Text variant="bold">
            {quantity}
          </Text>

          <AiOutlinePlus
            className={styles.button}
            onClick={onClickPlus}
          />
        </Flex>
      </Flex>
    </Card>
  );
};

export default CartItemCard;
