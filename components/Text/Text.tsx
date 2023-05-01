import React, { CSSProperties } from 'react';

import styles from './Text.module.css';


type Props = Partial<CSSProperties> & {
  children: any;
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'small';
  color?: string;
  uppercase?: boolean;
};

const Text: React.FC<Props> = (props) => {
  const {children, variant = 'body', color = 'var(--text)', uppercase, ...style} = props;
  return (
    <span
      className={`${styles.text} ${styles[variant]}`}
      style={{
        color,
        textTransform: uppercase ? 'uppercase' : 'none',
        ...style,
      }}
    >
      {children}
    </span>
  );
};

export default Text;
