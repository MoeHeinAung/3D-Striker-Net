import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout, ConfigProvider, theme } from 'antd';
import { Navbar } from '../components/Navbar.js';
import { DashboardPage } from '../pages/Dashboard.js';
import { DrawsPage } from '../pages/Draws.js';
import { NetworkPage } from '../pages/Network.js';
import { SalePage } from '../pages/Sale.js';
import { RiskPage } from '../pages/Risk.js';
import { ReportPage } from '../pages/Report.js';
import { SettingsPage } from '../pages/Settings.js';
import styles from '../styles/Layout.module.scss';

const { Content } = Layout;

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#00F0FF',
          colorBgBase: '#0A0B0E',
          colorSurface: '#14161C',
          borderRadius: 2,
          fontFamily: 'Inter, sans-serif',
        },
      }}
    >
      <Router>
        <Layout className={styles.layout}>
          <Navbar />
          <Content className={styles.content}>
            <Routes>
              <Route path="/" element={<div className={styles.bentoItem}><DashboardPage /></div>} />
              <Route path="/draws" element={<div className={styles.bentoItem}><DrawsPage /></div>} />
              <Route path="/network" element={<div className={styles.bentoItem}><NetworkPage /></div>} />
              <Route path="/sale" element={<div className={styles.bentoItem}><SalePage /></div>} />
              <Route path="/risk" element={<div className={styles.bentoItem}><RiskPage /></div>} />
              <Route path="/report" element={<div className={styles.bentoItem}><ReportPage /></div>} />
              <Route path="/settings" element={<div className={styles.bentoItem}><SettingsPage /></div>} />
            </Routes>
          </Content>
        </Layout>
      </Router>
    </ConfigProvider>
  );
}

export default App;
