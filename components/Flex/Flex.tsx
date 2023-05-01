import React, {CSSProperties} from 'react';


type Props = CSSProperties & {
  children: any;
  flexDirection?: CSSProperties['flexDirection'];
  justifyContent?: CSSProperties['justifyContent'];
  className?: HTMLDivElement['className'];
};

const Flex: React.FC<Props> = (props) => {
  const {children, className, flexDirection = 'row', justifyContent = 'flex-start', ...style} = props;
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection,
        justifyContent,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Flex;
