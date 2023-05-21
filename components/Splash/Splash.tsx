import React from 'react';

import ActivityIndicator from '@webshop/components/ActivityIndicator';

import styles from './Splash.module.css';


const Splash: React.FC = () => {
  return (
    <div className={styles.container}>
      <ActivityIndicator />
    </div>
  );
};

export default Splash;
