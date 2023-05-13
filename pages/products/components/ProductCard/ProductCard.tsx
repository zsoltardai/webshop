import React, {MouseEventHandler} from 'react';

import {Card, Text, Button, If, Flex} from '@webshop/components';

import type {Product} from '@webshop/models';

import {useAuth, useWindow} from '@webshop/hooks';

import currencyFormatter from '@webshop/helpers/currencyFormatter';
import textShortener from '@webshop/helpers/textShortener';

import colors from '@webshop/constants/colors';

import styles from './ProductCard.module.css';


type Props = {
  product: Product,
  onClick?: MouseEventHandler<HTMLDivElement>;
  onButtonClick?: MouseEventHandler<HTMLButtonElement>;
};

const ProductCard: React.FC<Props> = (props) => {
  const {
    onClick,
    onButtonClick,
    product: {
      name,
      description,
      price,
      images
    },
  } = props;

  const {token} = useAuth();

  const {isMobile} = useWindow();

  return (
    <Card className={styles.container} margin={10} flex={1}>

      <Flex flexDirection='column' onClick={onClick}>
        <img style={{objectFit: 'cover', borderRadius: 5, marginBottom: 12, width: "100%", height: 200}} src={images?.[0]} alt="" />
        <Text variant='h3' height={isMobile ? 30 : 50} marginBottom={12}>
          {textShortener(name, 30)}
        </Text>
        <Text marginBottom={12} height={isMobile ? 50 : 80}>
          {textShortener(description)}
        </Text>
        <Text marginBottom={12} color={colors.primary}>
          {currencyFormatter(price)}
        </Text>
      </Flex>

      <Button
        variant='primary'
        title="Kosárba"
        onClick={onButtonClick}
        disabled={!token}
        marginBottom={12}
      />

      <If condition={!token}>
        <Flex>
          <Text variant='small' textAlign='center' width="100%" color={colors.error}>
            Be kell jelentkezz a termék kosárhoz adásához!
          </Text>
        </Flex>
      </If>
    </Card>
  );
};

export default ProductCard;
