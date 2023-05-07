import React from 'react';
import {useRouter} from 'next/router';

import {ActivityIndicator, Button, Flex, Grid, If} from '@webshop/components';

import {useProducts} from '@webshop/hooks';

import ProductCard from './components/ProductCard';

import type {Product} from '@webshop/models';

type Props = {products: Product[]};

const Products: React.FC<Props> = ({products: prefetch}) => {

  const {push} = useRouter();

  const {products, loading, refetch, refetching, hasMore} =  useProducts({count: 4, prefetch});

  const onClickHandler = (product: Product): Promise<boolean> => push(`/products/${product.slug}`);

  if (loading) return <ActivityIndicator />

  return (
    <>
      <Grid column={250}>
        {products?.map(
          (product: Product, index: number): JSX.Element => {
            return (
              <ProductCard
                key={index}
                onClick={onClickHandler.bind(this, product)}
                product={product}
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
