import React, {useState} from 'react';

import {useAuth} from '@webshop/hooks';

import {Card, Text, Flex, Button, If} from '@webshop/components';

import Attributes from './components/Attributes';
import Variants from './components/Variants';

import currencyFormatter from '@webshop/helpers/currencyFormatter';

import type {Variant, Product as ProductType} from '@webshop/models';
import type {ParsedUrlQuery} from 'querystring';

import colors from '@webshop/constants/colors';

import styles from './Product.module.css';


export interface Params extends ParsedUrlQuery {slug: string};

export type Props = {product: ProductType};

const Product: React.FC<Props> = ({product}) => {

  const {token} = useAuth();

  const [variant, setVariant] = useState<Variant | undefined>(product.variants?.[0]);

  const onClickAddCart: VoidFunction = () => {throw new Error('Not implemented error');};

  const onSelect = (variant: Variant) => setVariant(variant);

  return (
    <div className={styles.container}>
      <Card objectFit='contain'>
        <img className={styles.image} src={variant?.images?.[0]} alt="" />
        {/*
          <Card width={80}>
            <img src="/images/empty.png" alt="" />
          </Card>
        */}
      </Card>

      <Card marginBottom={24}>
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

        <Variants variants={product.variants} current={variant} onSelect={onSelect} />

        <Attributes attributes={variant?.attributes} />
      </Card>
    </div>
  );
};

export default Product;
