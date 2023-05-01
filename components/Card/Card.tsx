import React, {CSSProperties, MouseEventHandler} from 'react';

import styles from './Card.module.css';


type Props = CSSProperties & {
  children: any;
  className?: HTMLDivElement['className'];
  onClick?: MouseEventHandler<HTMLDivElement>;
  selected?: boolean;
};

const Card: React.FC<Props> = (props) => {
  const {children, className, onClick, selected, ...style} = props;
  return (
    <div
      className={`${styles.container} ${selected && styles.selected} ${onClick && styles.hover} ${className}`}
      style={{...style}}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
