import React from 'react';
import {useRouter} from 'next/router';

import {ActivityIndicator, Grid, Text} from '@webshop/components';

import {useVariants} from '@webshop/hooks';

import ProductCard from './components/ProductCard';

import type {Variant} from '@webshop/models';


const Products: React.FC = () => {

  const {push} = useRouter();

  const {variants, loading} =  useVariants();

  const onClickHandler = (variant: Variant): Promise<boolean> => push(`/products/${variant.slug}`);

  if (loading) return <ActivityIndicator />;

  return (
    <Grid column={250}>
      {variants?.map(
        (variant: Variant, index: number): JSX.Element => {
          return (
            <ProductCard
              key={index}
              onClick={onClickHandler.bind(this, variant)}
              variant={variant}
            />
          );
        },
      )}
    </Grid>
  );
};

export default Products;
