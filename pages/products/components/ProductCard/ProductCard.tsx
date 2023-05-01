import React, {MouseEventHandler} from 'react';

import {Card, Text, Button, If, Flex} from '@webshop/components';

import type {Variant} from '@webshop/models';

import {useAuth} from '@webshop/hooks';

import currencyFormatter from '@webshop/helpers/currencyFormatter';
import textShortener from '@webshop/helpers/textShortener';

import colors from '@webshop/constants/colors';

import styles from './ProductCard.module.css';


type Props = {
  variant: Variant,
  onClick?: MouseEventHandler<HTMLDivElement>;
  onButtonClick?: MouseEventHandler<HTMLButtonElement>;
};

const ProductCard: React.FC<Props> = (props) => {
  const {
    onClick,
    onButtonClick,
    variant: {
      name,
      description,
      price,
      images
    },
  } = props;

  const {token} = useAuth();

  return (
    <Card className={styles.container} margin={10} onClick={onClick} flex={1}>
      <img style={{objectFit: 'contain', borderRadius: 5, marginBottom: 12}} src={images?.[0]} alt="" />
      <Text variant='h3' marginBottom={12}>
        {textShortener(name, 6)}
      </Text>
      <Text marginBottom={12}>
        {textShortener(description)}
      </Text>
      <Text marginBottom={12} color={colors.primary}>
        {currencyFormatter(price)}
      </Text>
      <Button
        variant='primary'
        title="Kosárba"
        onClick={onButtonClick}
        disabled={!token}
        marginBottom={12}
      />

      <If condition={!token}>
        <Flex>
          <Text variant='small' textAlign='center' color={colors.error}>
            Be kell jelentkezz a termék kosárhoz adásához!
          </Text>
        </Flex>
      </If>
    </Card>
  );
};

export default ProductCard;
