import React, {CSSProperties, MouseEventHandler} from 'react';
import {default as NextLink, LinkProps} from 'next/link';

import colors from '@webshop/constants/colors';

import Text from '../Text';

import styles from './Link.module.css';


type Props = CSSProperties & {
  href?: LinkProps['href'];
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  color?: string;
  title: string;
  uppercase?: boolean;
};

const Link: React.FC<Props> = (props) => {
  const {href, title, color = colors.primary, uppercase, onClick, ...style} = props;

  if (href) {
    return (
      <NextLink className={styles.link} href={href} style={{textDecoration: 'none'}}>
        <Text variant='bold' color={color} uppercase={uppercase} {...style}>
          {title}
        </Text>
      </NextLink>
    );
  }

  return (
    <span className={styles.link} onClick={onClick}>
      <Text color={color} uppercase={uppercase} {...style}>
        {title}
      </Text>
    </span>
  );
};

export default Link;