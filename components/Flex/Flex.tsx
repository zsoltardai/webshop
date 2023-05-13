import React, {CSSProperties, MouseEventHandler} from 'react';


type Props = CSSProperties & {
  children: any;
  className?: HTMLDivElement['className'];
  onClick?: MouseEventHandler<HTMLDivElement>;
};

const Flex: React.FC<Props> = (props) => {
  const {children, className, onClick, ...style} = props;
  return (
    <div
      className={className}
      onClick={onClick}
      style={{display: 'flex', ...style}}
    >
      {children}
    </div>
  );
};

export default Flex;
