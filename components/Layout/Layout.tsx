import React, { useState } from 'react';
import type {AppProps} from 'next/app';
import {useRouter} from 'next/router';

import {Button, Link, Text} from '@webshop/components'

import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai';

import {useAuth, useWindow} from '@webshop/hooks';

import colors from '@webshop/constants/colors';

import styles from './Layout.module.css';


const Layout: React.FC<AppProps> = (props) => {
  const {Component, pageProps} = props;
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <Component {...pageProps} />
      </div>
    </div>
  );
};

export default Layout;


const Header: React.FC = () => {
  const {token, logout} = useAuth();

  const {isMobile} = useWindow();

  const {push, events} = useRouter();

  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const toggleDropdown = (): void => setDropdownOpen(!isDropdownOpen);

  events.on('routeChangeStart', () => setDropdownOpen(false))

  const onClick = (): void => {
    if (!!token) return logout();
    push('/login');
  };

  return (
   <div className={styles['header-container']}>
      <Warning />
      <div className={styles.header}>
          {isMobile && (
            <div className={styles['header-mobile']}>
              <Text variant='h3' color={colors.primary}>Webshop</Text>
              {!isDropdownOpen ? <AiOutlineMenu size={24} onClick={toggleDropdown} /> : <AiOutlineClose size={24} onClick={toggleDropdown} />}
            </div>
          )}

        <div
          className={styles['header-content-container']} 
          style={{
            display: (isMobile && !isDropdownOpen) ? 'none' : 'flex',
          }}
        >
          <div className={styles['header-content']} >
            <Link uppercase title='Kezdőlap' href="/" />
            <Link uppercase title='Termékek' href="/products" />
            <Link uppercase title='Kosár' href="/cart" />
          </div>

          <div className={styles['header-content']} style={{justifySelf: 'flex-end'}}>
            {!!token && <Link uppercase title='Profil' href="/profile" />}
            <Button title={token ? 'Kijelentkezés' : 'Bejelentkezés'} width='100%' onClick={onClick} />
          </div>
        </div>
      </div>
   </div>
  );
};

const Warning: React.FC = () => {
  return (
    <div className={styles.warning}>
      <Text variant='small' color="#FFFFFF" uppercase>
        Ez csak egy példa projekt, nem egy éles webshop!
      </Text>
    </div>
  );
};
