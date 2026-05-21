import styles from '../styles/Layout.module.scss';

export const DashboardPage = () => {
  return (
    <div className={styles.content}>
      <div className={styles.bentoItem}>
        <h2>System Status</h2>
        <p>Operational. All sensors nominal.</p>
      </div>
      <div className={styles.bentoItem}>
        <h2>Fleet Overview</h2>
        <p>Data streaming... No active anomalies detected.</p>
      </div>
    </div>
  );
};
