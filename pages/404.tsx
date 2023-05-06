import React from 'react';
import {useRouter} from 'next/router';

import {Text, Flex, Link} from '@webshop/components';

import colors from '@webshop/constants/colors';

import styles from '@webshop/styles/404.module.css';


const NotFound: React.FC = () => {
  const {replace, asPath} = useRouter();

  const redirectHandler = async (): Promise<boolean> => replace('/');

  return (
    <Flex flexDirection='column' alignItems='center'>
      <img className={styles.image} src="/images/empty.png" alt="404" />

      <Text variant='h1' color={colors.primary} marginBottom={12}>404</Text>

      <Text flexWrap='wrap' textAlign='center' marginBottom={12}>
        A kért elérési út <Text color={colors.primary}>{asPath}</Text> nem létezik!
      </Text>

      <Link
        title='Vissza a főoldalra'
        uppercase
        onClick={redirectHandler}
      />
    </Flex>
  );
};

export default NotFound;