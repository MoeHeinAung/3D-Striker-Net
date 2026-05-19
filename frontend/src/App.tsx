import { useHealth } from './queries/useHealth';
import styles from './styles/App.module.scss';
import { Spin, Alert } from 'antd';

function App() {
  const { data, isLoading, isError, error } = useHealth();

  return (
    <div className={styles.container}>
      <div className={styles.dashboard}>
        <header className={styles.header}>
          <h1>3D-Striker-Net // Foundation</h1>
        </header>

        <main>
          <section className={styles.card}>
            <h2>System Connectivity Status</h2>
            {isLoading && <Spin description="Establishing uplink..." />}
            {isError && (
              <Alert
                message="Uplink Failure"
                description={error.message}
                type="error"
                showIcon
              />
            )}
            {data && (
              <div className={styles.statusGrid}>
                <div className={styles.statusItem}>
                  <label>SYS_STATUS</label>
                  <span>{data.data.status}</span>
                </div>
                <div className={styles.statusItem}>
                  <label>SYS_VERSION</label>
                  <span>{data.data.version}</span>
                </div>
                <div className={styles.statusItem}>
                  <label>DB_LINK</label>
                  <span>{data.data.database}</span>
                </div>
              </div>
            )}
          </section>

          <section className={styles.card}>
            <h2>Operational Logs</h2>
            <p style={{ color: '#8A2BE2', fontFamily: 'JetBrains Mono', fontSize: '0.9rem' }}>
              [INFO] Foundation established. 5-layer architecture active.
              <br />
              [INFO] Frontend-Backend bridge verified via TanStack Query.
            </p>
          </section>
        </main>

        <footer style={{ marginTop: '2rem', textAlign: 'right', fontSize: '0.7rem', color: '#2D323E' }}>
          CONTEXT: FOUNDATION_PHASE // AUTH: STRIKER_NET
        </footer>
      </div>
    </div>
  );
}

export default App;
