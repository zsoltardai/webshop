import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import {useRouter} from 'next/router';

import {Text, Flex, Link} from '@webshop/components';

import colors from '@webshop/constants/colors';

import styles from './404.module.css';


const NotFound: React.FC = () => {
  const {replace, asPath} = useRouter();

  const redirectHandler = async (): Promise<boolean> => replace('/');

  return (
    <Flex flexDirection='column' alignItems='center'>

      <Head>
        <title>Webshop - 404</title>
      </Head>

      <div className={styles['image-container']}>
        <Image
          style={{objectFit: 'contain'}}
          src="/images/empty.png"
          alt="404"
          fill
        />
      </div>

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