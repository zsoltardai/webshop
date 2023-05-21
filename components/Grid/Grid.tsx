import React, {createRef, useEffect, useRef, useState} from 'react';

import styles from './Grid.module.css';


type Props = {children?: JSX.Element[] | JSX.Element; column: number;};

const Grid: React.FC<Props> = (props) => {
  const {children, column} = props;

  const [columns, setColumns] = useState<number>(1);

  const [container, setContainer] = useState<number>(1);

  const initLoadingRef = useRef<boolean>(true);

  const ref = createRef<HTMLDivElement>();

  useEffect(
    () => {
      const element = ref?.current;

      if (!element) return;

      const observer = new ResizeObserver(
        (entries) => {
          setColumns(
            (): number => {
              if (initLoadingRef.current) initLoadingRef.current = false;
              const containerWith: number = entries[0].contentRect.width;
              setContainer(containerWith);
              return Math.floor(containerWith / column);
            },
          );
        },
      );

      observer.observe(element);
      return () => {
        observer.disconnect();
      };
    },
    [
      ref,
      column,
    ],
  );

  if (!children) return <></>;

  return (
    <div
      ref={ref}
      className={styles.grid}
      style={{gridTemplateColumns: `${columns === 1 ? container : column}px `.repeat(columns)}}
    >
      {Array.isArray(children) ? !initLoadingRef.current && children.map(
        (child: JSX.Element, index: number): JSX.Element => (
          <div key={index} className={styles['grid-item']}>
            {child}
          </div>
        ),
      ): (
        <div className={styles['grid-item']}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Grid;
