import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

import {useProduct, useAuth} from '@webshop/hooks';

import {Card, Text, Flex, Button, ActivityIndicator, If} from '@webshop/components';

import {Attributes, Variants} from './components';

import currencyFormatter from '@webshop/helpers/currencyFormatter';

import type {Variant} from '@webshop/models';

import colors from '@webshop/constants/colors';

import styles from '@webshop/styles/Product.module.css';


const Product: React.FC = () => {

  const router = useRouter();

  const {token} = useAuth();

  const {product, loading, getProduct} = useProduct(router.query.slug as string, false);

  const [variant, setVariant] = useState<Variant | undefined>();

  const onClickVariant = (variant: Variant): void => setVariant(variant);

  const fetchProduct = (): void => {
    if (!router.isReady) return;
    getProduct();
  };

  useEffect(fetchProduct, [router.isReady]);

  useEffect(
    () => {
      setVariant(product?.variants[0]);
    },
    [
      product,
    ],
  );

  const onClickAddCart: VoidFunction = () => {throw new Error('Not implemented error');};

  if (loading) return <ActivityIndicator />;

  return (
    <div className={styles.container}>
      <Card objectFit='contain'>
        <img className={styles.image} src={variant?.images?.[0]} alt="" />
        <Card width={80}>
          <img src="/images/empty.png" alt="" />
        </Card>
      </Card>

      <Card>
        <Text variant='h1' marginBottom={12}>{variant?.name}</Text>

        <Text marginBottom={24}>{product.description}</Text>

        <Flex alignItems='center' gap={24} marginBottom={12}>
          <Text variant='h3' uppercase>Ár: </Text>
          <Text variant='h3' color={colors.primary}>
            {currencyFormatter(variant?.price)}
          </Text>
        </Flex>

        <Button title="Kosárba" disabled={!token} onClick={onClickAddCart} marginBottom={24}/>

        <If condition={!token}>
          <Text variant='small' color={colors.error}>
            Be kell jelentkezz a termék kosárhoz adásához!
          </Text>
        </If>

        <Variants variants={product.variants} current={variant} onSelect={onClickVariant} />

        <Attributes attributes={variant?.attributes} />
      </Card>
    </div>
  );
};

export default Product;
