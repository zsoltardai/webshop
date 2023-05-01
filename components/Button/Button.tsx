import React, {CSSProperties, MouseEventHandler} from 'react';
import Link from 'next/link';

import styles from './Button.module.css';


type Props = CSSProperties & {
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  title: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  loading?: boolean;
};

const Button: React.FC<Props> = (props) => {
  const {href, title, variant = 'primary', onClick, disabled, loading, ...style} = props;

  if (href) return (
    <Link
      className={`${styles.button} ${!href && styles['no-hover']} ${styles[variant]}`}
      style={{...style}}
      href={href}
    >
      {title}
    </Link>
  );

  return (
    <button
      className={`${styles.button} ${!onClick && styles['no-hover']} ${styles[variant]}`}
      style={{...style}}
      onClick={onClick}
      disabled={loading || disabled || !onClick}
    >
      {title}
    </button>
  );
};

export default Button;
