import React from 'react';

import {Card, Flex} from '@webshop/components';

import type {Variant} from '@webshop/models';

import styles from './Variants.module.css';


type Props = {
  variants?: Variant[];
  onSelect: (variant: Variant) => void;
  current?: Variant;
};

const Variants: React.FC<Props> = (props) => {
  const {variants, onSelect, current} = props;
  return (
    <Flex className={styles.container} marginBottom={12}>
      {variants?.map(
        (productVariant: Variant, index: number): JSX.Element => {
          const image: string = productVariant.images?.[0] || '/images/empty.png';
          const isSelected: boolean = productVariant.id === current?.id;
          return (
            <Card
              key={index}
              width={80}
              marginLeft={index === 0 ? 0 : 10}
              marginRight={index === variants.length - 1 ? 0 : 10}
              padding={2}
              onClick={onSelect.bind(this, productVariant)}
              selected={isSelected}
            >
              <img
                className={styles.image}
                style={{borderRadius: 5}}
                src={image} 
              />
            </Card>
          );
        },
      )}
    </Flex>
  );
};

export default Variants;