import React from 'react';


type Props = {condition: boolean; children: JSX.Element | JSX.Element[]};

const If: React.FC<Props> = (props) => {
  const {condition, children} = props;
  if (!condition) return <></>;
  return <div>{children}</div>;
};

export default If;
