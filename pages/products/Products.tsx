import React from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';

import {ActivityIndicator, Button, Flex, Grid, If} from '@webshop/components';

import {useProducts, useCart} from '@webshop/hooks';

import ProductCard from './components/ProductCard';

import type {Product} from '@webshop/models';

type Props = {products: Product[], hasMore: boolean};

const Products: React.FC<Props> = ({products: prefetch, hasMore: more}) => {

  const {push} = useRouter();

  const {add} = useCart();

  const {products, loading, refetch, refetching, hasMore} =  useProducts({count: 4, prefetch, more});

  const onClickHandler = (product: Product): Promise<boolean> => push(`/products/${product.slug}`);

  const onClickAddCart = (product: Product): Promise<boolean> => add(product, 1);

  if (loading) return <ActivityIndicator />

  return (
    <>
      <Head>
        <title>Webshop - Termékek</title>
      </Head>
      <Grid column={250}>
        {products?.map(
          (product: Product, index: number): JSX.Element => {
            return (
              <ProductCard
                key={index}
                onClick={onClickHandler.bind(this, product)}
                product={product}
                onButtonClick={onClickAddCart.bind(this, product)}
              />
            );
          },
        )}
      </Grid>

      <If condition={!!hasMore}>
        <Flex justifyContent='center'>
          <Button
            variant='secondary'
            title='További termékek betöltése'
            onClick={refetch}
            disabled={refetching}
            marginTop={24}
          />
        </Flex>
      </If>
    </>
  );
};

export default Products;
