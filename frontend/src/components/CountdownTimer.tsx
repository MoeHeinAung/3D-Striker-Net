import React from 'react';
import styles from '../styles/Dashboard.module.scss';

export const CountdownTimer: React.FC = () => {
  return (
    <div className={styles.countdownTimer}>
      <span style={{ color: 'white' }}>00:00:00</span>
    </div>
  );
};
