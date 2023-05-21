import React, {useState} from 'react';
import Head from 'next/head';
import Image from 'next/image';

import {useAuth, useCart} from '@webshop/hooks';

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

  const {add} = useCart();

  const [variant, setVariant] = useState<Variant | undefined>(product.variants?.[0]);

  const onClickAddCart = async (variant?: Variant): Promise<boolean> => variant ? add(variant, 1) : false;

  const onSelect = (variant: Variant) => setVariant(variant);

  const image: string = variant?.images?.[0] || product.images[0];

  return (
    <Flex className={styles.container}>

      <Head>
        <title>Webshop - {product.name}</title>
        <meta name="description" content={product.description} />
      </Head>

      <Card>
        <div className={styles['image-container']}>
          <Image
            className={styles.image}
            alt={product.name}
            src={image}
            priority
            fill
          />
        </div>
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

        <Button title="Kosárba" disabled={!token} onClick={onClickAddCart.bind(this, variant)} marginBottom={24}/>

        <If condition={!token}>
          <Text variant='small' color={colors.error}>
            Be kell jelentkezz a termék kosárhoz adásához!
          </Text>
        </If>

        <Variants variants={product.variants} current={variant} onSelect={onSelect} />

        <Attributes attributes={variant?.attributes} />
      </Card>
    </Flex>
  );
};

export default Product;
