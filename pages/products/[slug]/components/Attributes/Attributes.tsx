import React from 'react';

import {Flex, Text} from '@webshop/components';


type Props = {
  attributes?: {[key: string]: string};
};

const Attributes: React.FC<Props> = (props) => {
  const {attributes} = props;
  return (
    <Flex flexDirection='column'>
      {attributes && Object.entries(attributes).map(
        (entry: string[], index: number): JSX.Element => (
          <Flex key={index} justifyContent='space-between' marginBottom={12}>
            <Text>{entry[0]}:</Text>
            <Text>{entry[1]}</Text>
          </Flex>
        ),
      )}
  </Flex>
  );
};

export default Attributes;
