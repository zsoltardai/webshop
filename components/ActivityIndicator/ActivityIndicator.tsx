import React from 'react';

import styles from './ActivityIndicator.module.css';


const ActivityIndicator: React.FC = () => {
  return (
		<div className={styles.container}>
			<span></span>
			<span></span>
			<span></span>
		</div>
	);
};

export default ActivityIndicator;
